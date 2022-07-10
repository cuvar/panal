<script lang="ts">
  export let rowSpan: number;
  export let colSpan: number;
  export let rowStart: number;
  export let colStart: number;

  const gridClasses: string = `col-start-${colStart} ` + `row-start-${rowStart} ` + `col-span-${colSpan} ` + `row-span-${rowSpan}`;
</script>

<div class={'h-full bg-plightgreen text-pdarkgreen flex justify-center items-center py-10 px-2 rounded-md w-full' + ' ' + gridClasses}>
  <slot />
</div>
