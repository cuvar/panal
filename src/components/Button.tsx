type Props = {
  handler: () => void;
  className?: string;
  children: React.ReactNode;
};
export default function Button(props: Props) {
  return (
    <button
      onClick={props.handler}
      className={`rounded-md border border-white px-4 py-2 text-white hover:border-transparent hover:bg-panal-100 active:bg-panal-200 ${props.className}`}
    >
      {props.children}
    </button>
  );
}
