<script lang="ts">
  import BlogArticle from '../../../lib/blog/BlogArticle.svelte';
  export let data;
</script>

<BlogArticle article={data.currentArticle} />
