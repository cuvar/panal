import { linkIcon } from "~/lib/ui/icons";

type Props = {
  text: string;
  href: string;
  tab?: "new" | "same";
};

export default function LinkItem(props: Props) {
  return (
    <>
      <a
        href={props.href}
        target={props.tab === "same" ? "_self" : "_blank"}
        rel={props.tab === "same" ? "" : "noopener noreferrer"}
        className="flex h-14 w-14 items-center justify-center rounded-md bg-primary p-5 text-foreground hover:opacity-80"
      >
        {linkIcon}
      </a>
      <span className="h-10 w-full whitespace-pre-wrap text-center text-sm">
        {props.text}
      </span>
    </>
  );
}
