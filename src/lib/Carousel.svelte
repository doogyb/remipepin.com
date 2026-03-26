<script lang="ts">
  import { createEventDispatcher, tick } from 'svelte';
  import { fly } from 'svelte/transition';
  import type { TileItem } from '../types';

  export let tiles: TileItem[] = [];
  export let selectedTile: TileItem | null = null;
  export let visible = false;
  export let cms: string;

  const dispatch = createEventDispatcher();
  let touchStartX = 0;
  let currentIndex = 0;
  let direction = 1;
  let stageWidth = 0;
  let transitionDuration = 600;

  $: if (tiles.length && selectedTile) {
    const selectedIndex = tiles.findIndex((tile) => tile.id === selectedTile.id);
    if (selectedIndex >= 0) currentIndex = selectedIndex;
  }

  function prev(): void {
    direction = -1;
    currentIndex = currentIndex === 0 ? tiles.length - 1 : currentIndex - 1;
  }

  function next(): void {
    direction = 1;
    currentIndex = currentIndex === tiles.length - 1 ? 0 : currentIndex + 1;
  }

  function goTo(index: number): void {
    if (index === currentIndex) return;
    direction = index > currentIndex ? 1 : -1;
    currentIndex = index;
  }

  async function close(): Promise<void> {
    transitionDuration = 0;
    await tick();
    dispatch('close');
  }

  function onTouchStart(event: TouchEvent): void {
    touchStartX = event.changedTouches[0].screenX;
  }

  function onTouchEnd(event: TouchEvent): void {
    const distance = event.changedTouches[0].screenX - touchStartX;
    if (Math.abs(distance) < 30) return;
    if (distance < 0) next();
    else prev();
  }
</script>

{#if tiles.length && selectedTile && visible}
  <section
    id="carousel"
    class="carousel-container"
    aria-label="Image carousel"
    on:touchstart={onTouchStart}
    on:touchend={onTouchEnd}
  >
    <div class="slide-stage" bind:clientWidth={stageWidth}>
      {#key currentIndex}
        <div
          class="slide"
          in:fly={{ x: direction * stageWidth, duration: transitionDuration, opacity: 1 }}
          out:fly={{ x: direction * -stageWidth, duration: transitionDuration, opacity: 1 }}
        >
          <div class="img-wrapper">
            <img
              src={`${cms}${tiles[currentIndex].attributes.cover.data.attributes.url}`}
              alt={tiles[currentIndex].attributes.publisher}
            />
          </div>
        </div>
      {/key}
    </div>

    {#key `caption-${currentIndex}`}
      <div class="carousel-caption">
        <h3>{tiles[currentIndex].attributes.publisher}</h3>
      </div>
    {/key}
    <div class="indicators" role="tablist" aria-label="Slide indicators">
      {#each tiles as tile, index (tile.id)}
        <button
          class="indicator"
          class:active={index === currentIndex}
          on:click={() => goTo(index)}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === currentIndex ? 'true' : 'false'}
        ></button>
      {/each}
    </div>
    <button class="nav prev" on:click={prev} aria-label="Previous slide">
      <span class="chevron chevron-left" aria-hidden="true"></span>
    </button>
    <button class="nav next" on:click={next} aria-label="Next slide">
      <span class="chevron chevron-right" aria-hidden="true"></span>
    </button>
    <div class="close-row">
      <button id="hide" on:click={close} aria-label="Close carousel">×</button>
    </div>
  </section>
{/if}

<style>
  @font-face {
    font-family: 'Tungsten Bold';
    src: url('//db.onlinewebfonts.com/t/561f38b1f4570de0fb8a39d691ab058c.eot');
    src:
      url('//db.onlinewebfonts.com/t/561f38b1f4570de0fb8a39d691ab058c.eot?#iefix') format('embedded-opentype'),
      url('//db.onlinewebfonts.com/t/561f38b1f4570de0fb8a39d691ab058c.woff2') format('woff2'),
      url('//db.onlinewebfonts.com/t/561f38b1f4570de0fb8a39d691ab058c.woff') format('woff'),
      url('//db.onlinewebfonts.com/t/561f38b1f4570de0fb8a39d691ab058c.ttf') format('truetype'),
      url('//db.onlinewebfonts.com/t/561f38b1f4570de0fb8a39d691ab058c.svg#Tungsten Bold') format('svg');
  }

  .carousel-container {
    text-align: center;
    touch-action: pan-y;
    padding-bottom: 10px;
    position: relative;
    --stage-height: 50vh;
  }

  .slide-stage {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 50vh;
    z-index: 1;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  @media (min-width: 576px) {
    .carousel-container {
      --stage-height: 60vh;
    }

    .slide-stage {
      height: 60vh;
    }
  }

  .img-wrapper {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  img {
    height: 100%;
    max-width: 60vh;
    object-fit: contain;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .carousel-caption {
    position: relative;
    z-index: 2;
    font-family: 'Tungsten Bold', sans-serif;
    padding: 20px 0 30px;
    color: white;
  }

  .slide {
    position: absolute;
    inset: 0;
    display: block;
    will-change: transform, opacity;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .nav {
    position: absolute;
    top: calc(var(--stage-height) / 2);
    transform: translateY(-50%);
    height: 60px;
    width: 60px;
    border: 0;
    border-radius: 0;
    background: transparent;
    color: white;
    cursor: pointer;
    z-index: 30;
    opacity: 0.5;
    transition: opacity 150ms ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }

  .nav:hover {
    opacity: 0.9;
  }

  .indicators {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin: 4px 0 10px;
    position: relative;
    z-index: 25;
  }

  .indicator {
    width: 18px;
    height: 6px;
    border-radius: 999px;
    border: 0;
    background: rgba(255, 255, 255, 0.35);
    cursor: pointer;
    transition: background-color 150ms ease;
    padding: 0;
  }

  .indicator.active {
    background: rgba(255, 255, 255, 0.95);
  }

  .prev {
    left: calc(50% - min(30vh, 45vw) - 44px);
  }

  .next {
    right: calc(50% - min(30vh, 45vw) - 44px);
  }

  .chevron {
    width: 20px;
    height: 20px;
    display: block;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100% 100%;
  }

  .chevron-left {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3e%3cpath d='M5.25 0 4.5.75 1.25 4l3.25 3.25.75.75L6.75 6.5 4.25 4l2.5-2.5z'/%3e%3c/svg%3e");
  }

  .chevron-right {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3e%3cpath d='M2.75 0 1.25 1.5 3.75 4l-2.5 2.5 1.5 1.5L6 4 2.75 0z'/%3e%3c/svg%3e");
  }

  #hide {
    position: relative;
    z-index: 40;
    border: 0;
    background: transparent;
    color: white;
    font-size: 48px;
    cursor: pointer;
    line-height: 1;
  }

  .close-row {
    display: flex;
    justify-content: center;
    margin-top: 4px;
  }
</style>
