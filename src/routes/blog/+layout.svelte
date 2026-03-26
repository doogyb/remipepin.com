<script lang="ts">
  import Banner from '../../lib/blog/Banner.svelte';
  import BreadCrumbs from '../../lib/blog/BreadCrumbs.svelte';
  import '../../fonts.css';

  export let data;
</script>

<Banner />
<BreadCrumbs current={data.currentArticle} />

<main class="blog-layout w-full lg:max-w-[1000px] px-6 mx-auto md:pt-12 mb-4 min-h-screen bg-white text-black">
  <slot />
</main>

<style>
  :global(body) {
    background: #ffffff !important;
    color: #111111 !important;
  }

  .blog-layout :global(h1) {
    font-family: Tungsten;
    font-size: 4rem;
    line-height: 1;
    word-spacing: 4px;
  }
  .blog-layout :global(h2) {
    font-family: Tungsten-Light;
    font-weight: 100;
    font-size: 1.5rem;
  }
  .blog-layout :global(h3) {
    font-family: Tungsten-Light;
    font-weight: 100;
    font-size: 1rem;
  }
  .blog-layout :global(p) {
    font-family: Gotham-Book;
  }
</style>
