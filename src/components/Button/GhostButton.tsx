import type { MutableRefObject } from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  ref?: MutableRefObject<HTMLButtonElement | null>;
};

export default function GhostButton(props: Props) {
  return (
    <button
      onClick={props.onClick}
      ref={props.ref}
      className={`rounded-md p-1 hover:bg-neutral-200 hover:bg-opacity-20 active:bg-opacity-40 ${props.className}`}
    >
      {props.children}
    </button>
  );
}
