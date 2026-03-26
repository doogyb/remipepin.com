<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import type { TileItem } from '../types';

  type VibrantPalette = {
    DarkVibrant?: { hex: string };
  };

  export let tile: TileItem;
  export let cms: string;

  const dispatch = createEventDispatcher();
  let background = '#3d3d3d';
  let mobileFlipped = false;

  $: squareUrl = tile?.attributes?.square?.data?.attributes?.url || '';
  $: imageUrl = squareUrl ? `${cms}${squareUrl}` : '';
  $: publisher = tile?.attributes?.publisher || '';

  function selectTile(): void {
    dispatch('select', tile);
  }

  function observeFlip(node: HTMLElement) {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (window.innerWidth > 576) return;
        mobileFlipped = entry.isIntersecting;
      },
      { rootMargin: '-25% 0% -75% 0%' }
    );

    observer.observe(node);
    return {
      destroy() {
        observer.disconnect();
      }
    };
  }

  onMount(() => {
    const Vibrant = (window as Window & { Vibrant?: any }).Vibrant;
    if (Vibrant && imageUrl) {
      Vibrant.from(imageUrl, { quality: 5 }).getPalette((err: unknown, palette: VibrantPalette) => {
        if (!err && palette && palette.DarkVibrant) {
          background = palette.DarkVibrant.hex;
        }
      });
    }
  });
</script>

<a href="#carousel" on:click|preventDefault={selectTile}>
  <div class="flip-card" use:observeFlip>
    <div class="flip-card-inner" class:mobile-in={mobileFlipped}>
      <div class="flip-card-front">
        <img src={imageUrl} alt={publisher} />
      </div>
      <div class="flip-card-back" style={`background: ${background};`}>
        <div class="flip-card-info">
          <h1>{publisher}</h1>
          <p><u>View</u></p>
        </div>
      </div>
    </div>
  </div>
</a>

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

  a {
    display: block;
  }

  .flip-card {
    width: 100%;
    background-color: transparent;
    perspective: 1000px;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    aspect-ratio: 1 / 1;
  }

  .flip-card-front,
  .flip-card-back {
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }

  .flip-card-front {
    background-color: #bbb;
    color: black;
  }

  .flip-card-back {
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    color: white;
    transform: rotateY(180deg);
  }

  @media (max-width: 576px) {
    .mobile-in {
      transform: rotateY(180deg);
    }

    .mobile-in img {
      opacity: 0.2;
    }
  }

  .flip-card-info {
    font-family: 'Tungsten Bold', sans-serif;
  }

  .flip-card-info h1 {
    font-size: 3rem;
  }

  .flip-card-info p {
    font-size: 2rem;
  }

  @media (min-width: 576px) {
    .flip-card:hover .flip-card-inner {
      transform: rotateY(180deg);
    }

    .flip-card-info h1 {
      font-size: 5.5vw;
    }

    .flip-card-info p {
      font-size: 3vw;
    }
  }

  @media (min-width: 768px) {
    .flip-card-info h1 {
      font-size: 3.5vw;
    }

    .flip-card-info p {
      font-size: 2.5vw;
    }
  }

  @media (min-width: 992px) {
    .flip-card-info h1 {
      font-size: 2.8vw;
    }

    .flip-card-info p {
      font-size: 1.6vw;
    }
  }

  @media (min-width: 1200px) {
    .flip-card-info h1 {
      font-size: 2vw;
    }

    .flip-card-info p {
      font-size: 1vw;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
