<script lang="ts">
  import BreadCrumbs from "../../lib/BreadCrumbs.svelte";
  let { children, data } = $props();
  // import "../app.css";
  // import "../fonts.css";
</script>

<BreadCrumbs current={data.currentArticle} />
<div class="w-full lg:max-w-[1000px] px-6 mx-auto md:pt-12 mb-4">
  {@render children()}
</div>
