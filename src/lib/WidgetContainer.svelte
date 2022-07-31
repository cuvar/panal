<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import WidgetPlaceholder from '$lib/WidgetPlaceholder.svelte';

  export let rowSpan: number;
  export let colSpan: number;
  export let rowStart: number;
  export let colStart: number;

  const gridClasses: string = `col-start-${colStart} ` + `row-start-${rowStart} ` + `col-span-${colSpan} ` + `row-span-${rowSpan}`;

  const dispatch = createEventDispatcher();
  function fireMoveWidget() {
    dispatch('movewidget', {
      rowStart,
      colStart,
    });
  }

  function onDragStart(oEvent: any) {
    console.log('drag start');
    oEvent.dataTransfer.setData('text/html', oEvent.target.innerHTML);
    oEvent.dataTransfer.dropEffect = 'move';
  }

  function onDragEnd(oEvent: DragEvent) {
    if (oEvent.dataTransfer?.dropEffect == 'move') {
      console.log('dragend');
      fireMoveWidget();
    }
  }
</script>

<div class={'h-full bg-plightgreen text-pdarkgreen flex justify-center items-center rounded-md w-full' + ' ' + gridClasses} draggable="true" on:dragstart={onDragStart} on:dragend|preventDefault={onDragEnd}>
  <slot />
</div>
