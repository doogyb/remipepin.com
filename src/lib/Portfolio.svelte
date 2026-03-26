<script lang="ts">
  import Tile from './Tile.svelte';
  import Carousel from './Carousel.svelte';
  import type { TileItem } from '../types';

  export let cms = 'https://www.remipepin.com/cms';

  let tiles: TileItem[] = [];
  let selectedTile: TileItem | null = null;
  let carouselVisible = false;
  let innerWidth = 0;
  let safeTiles: TileItem[] = [];

  $: columns = getColumns(innerWidth);
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

  function getColumns(width: number): number {
    if (width <= 576) return 1;
    if (width <= 768) return 2;
    if (width <= 992) return 3;
    if (width <= 1200) return 4;
    return 5;
  }

  function sortTiles(arr: TileItem[]): TileItem[] {
    const seen: Record<string, boolean> = {};
    let result: TileItem[] = [];
    for (const tile of arr) {
      let curr = { ...tile };
      const chain: TileItem[] = [];
      while (!seen[String(curr.id)]) {
        seen[String(curr.id)] = true;
        chain.unshift(curr);
        if (!curr.attributes.left?.data) break;
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

  loadTiles();
</script>

<svelte:window bind:innerWidth />

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

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
    gap: 0;
  }
</style>
