type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;
export default function Button(props: Props) {
  return (
    <button
      onClick={props.onClick}
      className={`hover:bg-panal-100 active:bg-panal-200 rounded-md border border-foreground px-4 py-2 text-foreground hover:border-transparent ${props.className}`}
    >
      {props.children}
    </button>
  );
}
