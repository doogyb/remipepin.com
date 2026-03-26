<script lang="ts">
  import Header from './lib/Header.svelte';
  import Tile from './lib/Tile.svelte';
  import Carousel from './lib/Carousel.svelte';
  import type { TileItem } from './types';
  import type { Article } from './types';
  import { getArticles } from './lib/blog/articles';
  import BlogHome from './lib/blog/BlogHome.svelte';
  import BlogArticle from './lib/blog/BlogArticle.svelte';

  const cms = 'https://www.remipepin.com/cms';

  let tiles: TileItem[] = [];
  let selectedTile: TileItem | null = null;
  let carouselVisible = false;
  let innerWidth = 0;
  let safeTiles: TileItem[] = [];
  let pathname = window.location.pathname;
  let blogArticles: Article[] = [];
  let blogCurrent: Article | null = null;
  let blogLoaded = false;
  let blogLoading = false;

  $: columns = getColumns(innerWidth);
  $: route = getRoute(pathname);
  $: safeTiles = tiles.filter(
    (tile) =>
      tile &&
      tile.id &&
      tile.attributes &&
      tile.attributes.publisher &&
      tile.attributes.square &&
      tile.attributes.square.data &&
      tile.attributes.square.data.attributes &&
      tile.attributes.square.data.attributes.url &&
      tile.attributes.cover &&
      tile.attributes.cover.data &&
      tile.attributes.cover.data.attributes &&
      tile.attributes.cover.data.attributes.url
  );
  $: void syncBlogRoute(route);

  function getColumns(width: number): number {
    if (width <= 576) return 1;
    if (width <= 768) return 2;
    if (width <= 992) return 3;
    if (width <= 1200) return 4;
    return 5;
  }

  function getRoute(path: string): { name: 'portfolio' | 'blog-home' | 'blog-article'; slug?: string } {
    if (path === '/blog' || path === '/blog/') return { name: 'blog-home' };
    const match = path.match(/^\/blog\/([^/]+)\/?$/);
    if (match) return { name: 'blog-article', slug: decodeURIComponent(match[1]) };
    return { name: 'portfolio' };
  }

  function sortTiles(arr: TileItem[]): TileItem[] {
    const seen: Record<string, boolean> = {};
    let result: TileItem[] = [];
    for (const tile of arr) {
      let curr = { ...tile };
      const chain = [];
      while (!seen[String(curr.id)]) {
        seen[String(curr.id)] = true;
        chain.unshift(curr);
        if (!curr.attributes.left.data) break;
        const leftId = curr.attributes.left.data.id;
        const next = arr.find((candidate) => candidate.id === leftId);
        if (!next) break;
        curr = { ...next };
      }
      result = result.concat(chain);
    }
    return result;
  }

  async function loadTiles(): Promise<void> {
    const response = await fetch(`${cms}/api/tiles?populate=*&pagination[pageSize]=100`);
    const data = (await response.json()) as { data?: TileItem[] };
    tiles = sortTiles(data.data || []);
  }

  function handleTileSelect(event: CustomEvent<TileItem>): void {
    selectedTile = event.detail ?? null;
    carouselVisible = true;
    window.scrollTo(0, 0);
  }

  function hideCarousel(): void {
    carouselVisible = false;
  }

  async function ensureBlogArticles(): Promise<void> {
    if (blogLoaded || blogLoading) return;
    blogLoading = true;
    try {
      blogArticles = await getArticles();
      blogLoaded = true;
    } finally {
      blogLoading = false;
    }
  }

  async function syncBlogRoute(currentRoute: { name: 'portfolio' | 'blog-home' | 'blog-article'; slug?: string }): Promise<void> {
    if (currentRoute.name === 'portfolio') return;
    await ensureBlogArticles();
    if (currentRoute.name === 'blog-home') {
      blogCurrent = blogArticles.find((a) => a.main) ?? blogArticles[0] ?? null;
      return;
    }
    blogCurrent = blogArticles.find((a) => a.slug === currentRoute.slug) ?? blogArticles[0] ?? null;
  }

  function navigate(path: string): void {
    if (window.location.pathname === path) return;
    history.pushState({}, '', path);
    pathname = path;
  }

  function onPopState(): void {
    pathname = window.location.pathname;
  }

  loadTiles();
</script>

<svelte:window bind:innerWidth on:popstate={onPopState} />

{#if route.name === 'portfolio'}
  <Header on:hideCarousel={hideCarousel} />

  <Carousel
    tiles={safeTiles}
    {selectedTile}
    visible={carouselVisible}
    on:close={hideCarousel}
    {cms}
  />

  <main class="grid" style={`--cols: ${columns}`}>
    {#each safeTiles as tile (tile.id)}
      <Tile {tile} {cms} on:select={handleTileSelect} />
    {/each}
  </main>
{:else}
  <Header on:hideCarousel={() => navigate('/')} />
  <main class="blog">
    <div class="breadcrumbs">
      <a href="/" on:click|preventDefault={() => navigate('/')}>HOME/</a>
      <a href="/blog" on:click|preventDefault={() => navigate('/blog')} class:current={route.name === 'blog-home'}>BLOG</a>
      {#if route.name === 'blog-article' && blogCurrent}
        <span>/</span>
        <span class="current">{blogCurrent.title.toUpperCase()}</span>
      {/if}
    </div>
    {#if route.name === 'blog-home'}
      <BlogHome articles={blogArticles} on:navigate={(e) => navigate(e.detail)} />
    {:else}
      <BlogArticle article={blogCurrent} />
    {/if}
  </main>
{/if}

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
    gap: 0;
  }
  .blog {
    width: min(1000px, 100%);
    margin: 0 auto;
    padding: 0 1.5rem 1rem;
  }
  .breadcrumbs {
    display: flex;
    gap: 0.2rem;
    padding-top: 1rem;
    font-family: 'GothamHTF-Medium', sans-serif;
  }
  .breadcrumbs a {
    color: inherit;
    text-decoration: none;
  }
  .current {
    color: #d92d2b;
  }
</style>
