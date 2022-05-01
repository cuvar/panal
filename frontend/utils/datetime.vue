<script lang="ts">
import { padNumber } from "./string.vue";

function getCurrentDateHumanReadable(): string {
  const date: Date = new Date();
  const year: number = date.getFullYear();
  //@ts-ignore
  const month: string = padNumber(date.getMonth() + 1);
  const day: string = padNumber(date.getDate());
  return `${day}.${month}.${year}`;
}

export { getCurrentDateHumanReadable };
</script>
