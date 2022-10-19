<script>
	import Navbar from 'comp/Navbar.svelte';
	import Footer from 'comp/Footer.svelte';
	import '../app.css';
</script>

<div class="min-h-screen h-screen flex flex-col justify-between text-gray-100 ">
	<Navbar />
	<main class="bg-panal-500 h-full px-5 flex flex-col items-center">
		<slot />
	</main>
	<Footer />
</div>
