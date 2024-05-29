import type { ChangeEvent } from "react";
import { useDetectMobile } from "~/lib/ui/hooks";

type Props = {
  value: string;
  changeHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  maxCols?: number;
};
export default function Textarea(props: Props) {
  const isMobile = useDetectMobile();

  return (
    <textarea
      name=""
      id=""
      rows={isMobile ? 20 : props.maxCols ?? 30}
      className="w-full max-w-3xl overflow-x-scroll whitespace-nowrap rounded-lg bg-background px-2 py-2 font-mono text-foreground"
      value={props.value}
      onChange={props.changeHandler}
    ></textarea>
  );
}
