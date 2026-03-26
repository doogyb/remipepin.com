<script lang="ts">
  import BlogHome from '../../lib/blog/BlogHome.svelte';
  export let data;
</script>

<BlogHome articles={data.articles} />
