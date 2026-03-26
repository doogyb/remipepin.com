<script lang="ts">
  import header from '../../assets/Header.svg';
</script>

<div class="flex w-full justify-between bg-[#d92d2b] h-[200px] pt-[50px] pl-[20px] pb-[25px]">
  <div class="flex items-end flex-1 min-w-0">
    <img class="h-[100px]" src={header} alt="header" />
    <div class="text-white sub-header font-medium text-xl">
      <a href="mailto:remipepinot@gmail.com"><span>CONTACT / </span></a>
      <a href="https://www.instagram.com/remipepino/" target="_blank" aria-label="Link to Instagram">
        <span class="fa-brands fa-instagram fa-w-14"></span>
      </a>
    </div>
  </div>
  <div class="hidden md:flex items-end flex-shrink-0 pr-6">
    <span class="text-white z-10 subline">SOUS LES COUVERTURES</span>
  </div>
</div>

<style>
  .sub-header {
    font-family: 'Gotham-Medium';
    margin-left: 10px;
    margin-bottom: -4px;
  }
  .fa-instagram {
    font-size: 18px;
    margin-left: 2px;
  }
  .subline {
    font-family: 'Gotham-Medium';
    font-size: 0.9rem;
    white-space: nowrap;
  }
</style>
