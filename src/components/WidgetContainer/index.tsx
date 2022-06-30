interface IProps {
  children: React.ReactNode;
  rowSpan: number;
  colSpan: number;
  rowStart: number;
  colStart: number;
  className?: string;
}
function WidgetContainer(props: IProps) {
  const gridClasses: string = `col-start-${props.colStart} ` + `row-start-${props.rowStart} ` + `col-span-${props.colSpan} ` + `row-span-${props.rowSpan}`;

  return <div className={'h-full bg-plightgreen text-pdarkgreen flex justify-center items-center py-10 px-2 rounded-md' + ' ' + gridClasses}>{props.children}</div>;
}

export default WidgetContainer;
