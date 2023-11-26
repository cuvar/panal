import { linkIcon } from "~/utils/icons";

type Props = {
  text: string;
  href: string;
  tab?: "new" | "same";
};

export default function LinkWidget(props: Props) {
  return (
    <>
      <a
        href={props.href}
        target={props.tab === "same" ? "_self" : "_blank"}
        rel={props.tab === "same" ? "" : "noopener noreferrer"}
        className="flex h-14 w-14 items-center justify-center rounded-md bg-teal-200 p-5 text-black hover:bg-teal-300"
      >
        {linkIcon}
      </a>
      <span className="h-10 w-full whitespace-pre-wrap text-center text-sm">
        {props.text}
      </span>
    </>
  );
}
