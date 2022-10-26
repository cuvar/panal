interface IProps {
  handler: () => void;
  className?: string;
  children: React.ReactNode;
}
export default function Button(props: IProps) {
  return (
    <button
      onClick={props.handler}
      className={`py-2 px-4 text-white border border-white hover:border-transparent hover:bg-panal-100 active:bg-panal-200 rounded-md ${props.className}`}
    >
      {props.children}
    </button>
  );
}
