type Props = {
  href: string;
  tab?: "new" | "same";
  children: React.ReactNode;
  className?: string;
};
export default function Link(props: Props) {
  const tab = typeof props.tab === undefined ? "new" : props.tab;

  if (tab === "new") {
    return (
      <a
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`hover:text-gray-400 hover:underline active:text-gray-500 ${props.className}`}
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
