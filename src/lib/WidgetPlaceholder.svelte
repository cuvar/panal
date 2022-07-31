<script lang="ts">
  export let rowStart: number;
  export let colStart: number;
  const rowSpan = 1;
  const colSpan = 1;

  const gridClasses: string = `col-start-${colStart} ` + `row-start-${rowStart} ` + `col-span-${colSpan} ` + `row-span-${rowSpan}`;

  function onDragOver(oEvent: any) {
    oEvent.dataTransfer.dropEffect = 'move';
    console.log('drag over');
  }

  function onDrop(oEvent: DragEvent) {
    console.log('drop');

    // const innerHTML = oEvent.dataTransfer?.getData('text/html');
    // if (innerHTML) {
    //   //@ts-ignore
    //   oEvent.target.innerHTML = innerHTML;
    // }
  }
</script>

<div class={'h-full bg-transparent w-full' + ' ' + gridClasses} on:drop|preventDefault={onDrop} on:dragover|preventDefault={onDragOver} />
