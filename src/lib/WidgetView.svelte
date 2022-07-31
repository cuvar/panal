<script lang="ts">
  import WidgetContainer from '$lib/WidgetContainer.svelte';
  import WidgetPlaceholder from '$lib/WidgetPlaceholder.svelte';
  import DateTimeWidget from '$lib/widgets/DateTime.svelte';
  import LinkStoreWidget from '$lib/widgets/LinkStore.svelte';
  import { getGridColConfig } from '../utils/config/load';
  import { getCurrentScreenSize } from '../utils/screen';

  export let widgetData: IWidgetData[] = [];

  const { gridRowClass, gridColClass } = getGridClasses();

  function getGridClasses() {
    const gridRowClass: string = 'grid-rows-auto-4 sm:grid-rows-auto-4 md:grid-rows-auto-6 lg:grid-rows-auto-8';

    const defaultColAmount = getGridColConfig();

    const xsClass = `grid-cols-${defaultColAmount.xs}`;
    const smClass = `sm:grid-cols-${defaultColAmount.sm}`;
    const mdClass = `md:grid-cols-${defaultColAmount.md}`;
    const lgClass = `lg:grid-cols-${defaultColAmount.lg}`;
    const xlClass = `xl:grid-cols-${defaultColAmount.xl}`;

    const gridColClass: string = `${xsClass} ${smClass} ${mdClass} ${lgClass} ${xlClass}`;

    return {
      gridRowClass,
      gridColClass,
    };
  }

  function onMoveWidget(oEvent: MoveWidgetEvent) {
    const { rowStart, colStart } = oEvent.detail;
    const currentScreenSize = getCurrentScreenSize();

    const widgetToMove = widgetData.find((widget) => widget[currentScreenSize].rowStart === rowStart && widget[currentScreenSize].colStart === colStart);
    console.log(widgetToMove);
    // todo: remove this widget
    // todo: fill all other with placeholders
  }
</script>

<div class={'h-full w-full max-w-screen-2xl grid gap-x-4 sm:gap-x-8 gap-y-4 sm:gap-y-8' + ' ' + gridRowClass + ' ' + gridColClass}>
  {#each widgetData as widget}
    <WidgetContainer rowSpan={widget.lg.rowSpan} colSpan={widget.lg.colSpan} rowStart={widget.lg.rowStart} colStart={widget.lg.colStart} on:movewidget={onMoveWidget}>
      {#if widget.config.type == 'datetime'}
        <DateTimeWidget widgetConfig={widget.config} />
      {:else if widget.config.type == 'link'}
        <LinkStoreWidget widgetConfig={widget.config}>Google Calendar</LinkStoreWidget>
      {:else if widget.config.type == 'gcalendar'}
        <div>Google Calendar</div>
      {:else}
        <div>Unknown widget</div>
      {/if}
    </WidgetContainer>
  {/each}
  <WidgetPlaceholder colStart={1} rowStart={2} />
</div>
