import { forwardRef } from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

const GhostButton = forwardRef(function GhostButton(
  props: Props,
  ref: unknown,
) {
  return (
    <button
      onClick={props.onClick}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={ref}
      className={`rounded-md p-1 hover:bg-neutral-200 hover:bg-opacity-20 active:bg-opacity-40 ${props.className}`}
    >
      {props.children}
    </button>
  );
});
export default GhostButton;
