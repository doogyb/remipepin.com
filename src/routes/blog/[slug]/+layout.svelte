<script lang="ts">
  import type { LayoutProps } from "./$types";

  let { data, children }: LayoutProps = $props();

  let currentArticle = $derived(data.currentArticle);
  let sideArticles = $derived(
    data.articles.filter((article) => article.slug !== currentArticle.slug)
  );
</script>

<div class="flex flex-col px-12 md:px-0">
  <div class="flex flex-col lg:flex-row justify-items-start">
    <!-- article content -->
    <main class="lg:w-2/3 lg:border-r md:pr-8">
      {@render children()}
    </main>

    <!-- side articles -->
    <div
      class="flex flex-col items-center border-t mt-10 md:mt-0 pt-10 md:pt-0 md:border-none lg:w-1/3 md:pl-8"
    >
      {#each sideArticles as article, index}
        <div
          class={`pb-5 ${index !== 0 && "pt-5"} ${index !== sideArticles.length - 1 && "border-b"}`}
        >
          <a href={`/blog/${article.slug}`}>
            <img
              class="w-full aspect-3/2 object-cover"
              src={article.hero}
              alt="side"
            />
          </a>
          <div class="flex flex-col">
            <a href={`/blog/${article.slug}`}>
              <h2 class="text-[#d22027]">{article.title.toUpperCase()}</h2>
            </a>
            <p class="caption">{article.blurb}</p>
          </div>  
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  h2 {
    font-family: Tungsten;
    font-size: 2rem;
  }
  .caption {
    line-height: 1.25;
  }
</style>
