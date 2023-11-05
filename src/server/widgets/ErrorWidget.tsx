type Props = {
  msg: string;
};
export default function ErrorWidget(props: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-md border-2 bg-white text-black">
      {props.msg}
    </div>
  );
}
