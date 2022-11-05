interface IProps {
  children: React.ReactNode;
  colspan?: number;
  rowspan?: number;
  colstart?: number;
  rowstart?: number;
}

export default function WidgetContainer(props: IProps) {
  const col = props.colspan ?? 1;
  const row = props.rowspan ?? 1;

  const colStart = props.colstart ?? 1;
  const rowStart = props.rowstart ?? 1;

  let gridClasses = `col-span-${col} row-span-${row}`;
  if (colStart > 1) {
    gridClasses += ` col-start-${colStart}`;
  }
  if (rowStart > 1) {
    gridClasses += ` row-start-${rowStart}`;
  }

  return (
    <div
      className={`flex justify-center items-center ${gridClasses} bg-red-300`}
    >
      {props.children}
    </div>
  );
}
