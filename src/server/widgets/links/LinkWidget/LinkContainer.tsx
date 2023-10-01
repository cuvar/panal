type Props = {
  children: React.ReactNode;
};
export default function LinkContainer(props: Props) {
  return (
    <div className="flex w-20 flex-col justify-center overflow-hidden text-ellipsis whitespace-nowrap">
      {props.children}
    </div>
  );
}
