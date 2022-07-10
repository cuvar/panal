<script lang="ts">
  import Navbar from './Navbar.svelte';
  import Footer from './Footer.svelte';

  const title: string = 'panal';
  const website: string = 'cuvar.dev';
</script>

<div class="w-screen min-h-screen flex flex-col items-center bg-pdarkgreen text-pwhite">
  <Navbar {title} />
  <div class="w-full my-8 sm:my-16 lg:my-16 px-4 sm:px-24 md:px-10 lg:px-20 xl:px-36 flex flex-col flex-auto">
    <slot />
  </div>
  <Footer title={website} />
</div>
