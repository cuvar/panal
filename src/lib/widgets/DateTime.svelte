<script lang="ts">
  import { getHumanReadableDate, getHumanReadableTime } from '../../utils/datetime';
  export let widgetConfig: IDateTimeWidgetConfig;

  function getDateTimeContent(config: IDateTimeWidgetConfig): string {
    let time: string = config.time ? getHumanReadableTime(config.timemode ?? null) : '';
    let date: string = config.date ? getHumanReadableDate(config.datemode ?? null) : '';

    const dateTime: string = time + date === '' ? `${getHumanReadableDate(config.datemode ?? null)}` : `${date}\n${time} `;
    return dateTime;
  }
</script>

<div class="flex justify-center items-center text-center">{getDateTimeContent(widgetConfig)}</div>
