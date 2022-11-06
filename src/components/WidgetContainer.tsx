interface IProps extends WidgetConfig {
  children: React.ReactNode;
  colspan?: number;
  rowspan?: number;
  colstart?: number;
  rowstart?: number;
}

export default function WidgetContainer(props: IProps) {
  const minimumColSpan = Math.min(props.minColSpan ?? 3, 3);

  const tempColSpan = props.colspan ?? 1;
  const tempRowSpan = props.rowspan ?? 1;

  const col =
    typeof minimumColSpan === "undefined"
      ? tempColSpan
      : Math.max(tempColSpan, minimumColSpan);

  const row =
    typeof props.minRowSpan === "undefined"
      ? tempRowSpan
      : Math.max(tempRowSpan, props.minRowSpan);

  const colStart = props.colstart ?? 1;
  const rowStart = props.rowstart ?? 1;

  let gridClasses = `col-span-${Math.min(
    3,
    col
  )} md:col-span-${col} row-span-${row}`;
  if (colStart > 1) {
    gridClasses += ` col-start-${colStart}`;
  }
  if (rowStart > 1) {
    gridClasses += ` row-start-${rowStart}`;
  }

  return (
    <div className={`flex justify-center items-center ${gridClasses}`}>
      {props.children}
    </div>
  );
}
