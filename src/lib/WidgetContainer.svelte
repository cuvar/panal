<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let rowSpan: number;
  export let colSpan: number;
  export let rowStart: number;
  export let colStart: number;

  const gridClasses: string = `col-start-${colStart} ` + `row-start-${rowStart} ` + `col-span-${colSpan} ` + `row-span-${rowSpan}`;

  const dispatch = createEventDispatcher();
  function triggerRemoveWidget() {
    dispatch('removewidget', {
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
      triggerRemoveWidget();
    }
  }
</script>

<div class={'h-full bg-plightgreen text-pdarkgreen flex justify-center items-center py-10 px-2 rounded-md w-full' + ' ' + gridClasses} draggable="true" on:dragstart={onDragStart} on:dragend|preventDefault={onDragEnd}>
  <slot />
</div>
