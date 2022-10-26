interface IProps {
  children: React.ReactNode;
}
export default function LinkContainer(props: IProps) {
  return (
    <div className="flex flex-col justify-center w-20 text-ellipsis whitespace-nowrap overflow-hidden">
      {props.children}
    </div>
  );
}
