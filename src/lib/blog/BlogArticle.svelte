<script lang="ts">
  import { marked } from 'marked';
  import type { Article } from '../../types';

  export let article: Article | null = null;
</script>

{#if article}
  <div class="flex items-end mb-6">
    <img class="w-2/3 object-cover" src={article.hero} alt="main" />
    <p class="caption-text">{article.caption}</p>
  </div>
  <h1 class="text-[#d22027]">{article.title.toUpperCase()}</h1>
  <div class="content">
    {@html marked(article.content || '', { breaks: false })}
  </div>
{/if}

<style>
  :global(.content img) {
    max-height: 500px;
    padding-top: 20px;
    padding-bottom: 15px;
    object-fit: cover;
  }
  :global(.content) {
    font-family: Gotham-Book;
  }
  :global(.content .caption) {
    font-size: 0.85em;
    margin-bottom: 15px;
  }
  :global(.content .blurb) {
    font-family: Gotham-Bold;
  }
  :global(.content strong) {
    font-family: Gotham-Bold;
  }
  :global(.content p) {
    text-align: justify;
  }
  .caption-text {
    line-height: 1;
    margin: 0;
    padding: 0;
    margin-left: 1rem;
    font-size: 0.85rem;
  }
</style>
