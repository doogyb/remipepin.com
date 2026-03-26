<script lang="ts">
  import { breakpoints } from "$lib/util/constants.js";

  const { data } = $props();
  const mainArticle = $derived(
    data.articles.find((article) => article.main) ?? data.articles[0]
  );
  const otherArticles = $derived(
    data.articles.filter((article) => article.slug !== mainArticle.slug)
  );

  let innerWidth = $state(0);

  // for tiles in grid
  const borderBottom = (index: number) => {
    if (otherArticles.length <= 2) {
      return "";
    }
    if (index === otherArticles.length - 1) {
      return "";
    }
    if (
      otherArticles.length % 2 === 0 &&
      index === otherArticles.length - 2 &&
      innerWidth > breakpoints.sm
    ) {
      return "";
    }
    return "border-b";
  };
  // padding for tiles in grid
  const padding = (index: number) => {
    if (innerWidth <= breakpoints.sm) {
      return "";
    }
    if (index % 2 === 0) {
      return "pr-4";
    } else {
      return "pl-4";
    }
  };
</script>

<svelte:window bind:innerWidth />

<!-- Hero article -->
<div
  class="flex flex-col md:flex-row items-center md:items-end justify-start mt-2 md:mt-10 pb-8 border-b border-b-black"
>
  <div class="flex flex-col md:pr-12 md:w-1/3">
    <a href={`/blog/${mainArticle.slug}`}>
      <h1 class="text-4xl sm:text-5xl md:mb-2 leading-[60px]">
        {mainArticle.title.toUpperCase()}
      </h1>
    </a>
    <p class="mb-2">{mainArticle.blurb}</p>
  </div>
  <a href={`/blog/${mainArticle.slug}`} class="md:w-2/3">
    <img
      src={mainArticle.hero}
      alt={mainArticle.title}
      class="h-full aspect-4/3 object-cover border-gray-300"
    />
  </a>
</div>


<!-- Other articles -->
<div class="grid grid-cols-1 sm:grid-cols-2">
  {#each otherArticles as article, index (article.id)}
    <div class={`flex flex-col py-8 ${borderBottom(index)} ${padding(index)}`}>
      <a href={`/blog/${article.slug}`}>
        <img
          class="border border-gray-300 aspect-5/3 object-cover"
          src={article.hero}
          alt={article.title}
        />
      </a>
      <div class="flex flex-col pr-12">
        <a href={`/blog/${article.slug}`}>
          <h3>{article.title.toUpperCase()}</h3>
        </a>
        <p class="blurb">{article.blurb}</p>
      </div>
    </div>
  {/each}
</div>

<style>
  h3 {
    font-family: Tungsten;
    font-size: 2.5rem;
  }
  .blurb {
    line-height: 1.25;
  }
</style>
