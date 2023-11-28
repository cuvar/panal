type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;
export default function Button(props: Props) {
  return (
    <button
      onClick={props.onClick}
      className={`rounded-md border border-white px-4 py-2 text-white hover:border-transparent hover:bg-panal-100 active:bg-panal-200 ${props.className}`}
    >
      {props.children}
    </button>
  );
}
