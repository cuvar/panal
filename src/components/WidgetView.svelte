<script lang="ts">
	import SearchWidget from './SearchWidget.svelte';
	import TimeWidget from './TimeWidget.svelte';
	import CalendarWidget from './CalendarWidget.svelte';
	import LinkCollectionWidget from './LinkWidget/LinkCollectionWidget.svelte';

	export let data: WidgetViewData;
</script>

<TimeWidget />
<SearchWidget />
<LinkCollectionWidget />
<CalendarWidget calendarData={data.calendarData} />
