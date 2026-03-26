<script lang="ts">
  import type { Article } from "$lib/types";
  import { page } from '$app/state';

  const { current }: { current?: Article } = $props();
  
  const isRoot = $derived(page.url.pathname === '/');
</script>

<div class="flex pt-4 pl-6">
  <h3><a href="https://remipepin.com">HOME/</a></h3>
  <h3 class={current && !isRoot ? null : "current"}>
    <a href="/">BLOG</a>
  </h3>
  {#if current && !isRoot}
    <h3>/</h3>
    <h3 class="current">{current?.title.toUpperCase()}</h3>
  {/if}
</div>

<style>
  * {
    font-family: "Gotham-Medium";
  }
  .current {
    color: #d92d2b;
  }
</style>
