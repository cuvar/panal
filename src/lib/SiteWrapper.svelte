<script lang="ts">
  import Navbar from './Navbar.svelte';
  import Footer from './Footer.svelte';

  const title: string = 'panal';
  const website: string = 'cuvar.dev';
</script>

<div class="w-screen min-h-screen flex flex-col items-center bg-pdarkgreen text-pwhite">
  <Navbar {title} />
  <div class="my-8 sm:my-16 lg:my-16 mx-4 sm:mx-24 md:mx-10 lg:mx-20 xl:mx-36 flex flex-col flex-auto">
    <slot />
  </div>
  <Footer title={website} />
</div>
