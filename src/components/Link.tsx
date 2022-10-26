interface IProps {
  href: string;
  tab?: "new" | "same";
  children: React.ReactNode;
}
export default function Link(props: IProps) {
  let tab = typeof props.tab === undefined ? "new" : props.tab;

  if (tab === "new") {
    return (
      <a
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline hover:text-gray-400 active:text-gray-500"
      >
        {props.children}
      </a>
    );
  } else {
    return (
      <a href={props.href} className="">
        {props.children}
      </a>
    );
  }
}
