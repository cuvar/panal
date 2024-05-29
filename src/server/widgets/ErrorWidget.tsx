type Props = {
  msg: string;
};
export default function ErrorWidget(props: Props) {
  return (
    <div className="text-inverted flex h-full w-full items-center justify-center rounded-md border-2 bg-foreground">
      {props.msg}
    </div>
  );
}
