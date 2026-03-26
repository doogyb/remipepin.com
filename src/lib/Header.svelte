<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import headerBanner from '../assets/Header.svg';
  import blogLinkImage from '../assets/Blog-Link.png';

  const dispatch = createEventDispatcher();

  function hideCarousel(): void {
    dispatch('hideCarousel');
  }
</script>

<header>
  <div class="container">
    <button type="button" on:click={hideCarousel} class="brand">
      <img src={headerBanner} id="header" alt="Remi Pepin" />
    </button>
    <span class="links">
      <a id="contact" href="mailto:remi@les-collegues.net">CONTACT /</a>
      <a
        href="https://www.instagram.com/remipepino/"
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
      >
        <svg
          class="instagram-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm9.75 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
          />
        </svg>
      </a>
    </span>
  </div>
  <a href="/blog/" class="blog-link" aria-label="Go to blog">
    <img src={blogLinkImage} alt="Sous les couvertures blog" />
  </a>
</header>

<style>
  @font-face {
    font-family: 'GothamHTF-Medium';
    src: url('//db.onlinewebfonts.com/t/7660bb62fdc3548ba51b96d0fba2705b.eot');
    src:
      url('//db.onlinewebfonts.com/t/7660bb62fdc3548ba51b96d0fba2705b.eot?#iefix') format('embedded-opentype'),
      url('//db.onlinewebfonts.com/t/7660bb62fdc3548ba51b96d0fba2705b.woff2') format('woff2'),
      url('//db.onlinewebfonts.com/t/7660bb62fdc3548ba51b96d0fba2705b.woff') format('woff'),
      url('//db.onlinewebfonts.com/t/7660bb62fdc3548ba51b96d0fba2705b.ttf') format('truetype'),
      url('//db.onlinewebfonts.com/t/7660bb62fdc3548ba51b96d0fba2705b.svg#GothamHTF-Medium') format('svg');
  }

  header {
    background: #d92d2b;
    padding: 50px 0 8px 20px;
    position: relative;
    min-height: 220px;
    box-sizing: border-box;
  }

  .container {
    color: white;
    display: inline-flex;
    align-items: flex-end;
    gap: 10px;
  }

  .brand {
    background: transparent;
    border: 0;
    padding: 0;
    cursor: pointer;
    display: block;
    line-height: 0;
    align-items: center;
  }

  #header {
    height: 100px;
    width: auto;
    display: block;
  }

  .links {
    font-size: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
  }

  .links a {
    font-family: 'GothamHTF-Medium', sans-serif;
    color: white;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
  }

  .instagram-icon {
    width: 18px;
    height: 18px;
    display: block;
  }

  .blog-link {
    position: absolute;
    right: 0;
    top: 0;
    padding-top: 8px;
    line-height: 0;
    display: block;
  }

  .blog-link img {
    width: 310px;
    height: auto;
    display: block;
  }

  @media (max-width: 900px) {
    header {
      min-height: auto;
    }

    .blog-link {
      display: none;
    }
  }
</style>
