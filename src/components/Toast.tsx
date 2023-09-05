type Props = {
  text?: string;
  kind?: ToastKind;
};

type ToastKind = "error" | "success" | "info" | "warning" | "normal";
type ToastColor =
  | { bg: "bg-red-600"; text: "text-white" }
  | { bg: "bg-green-700"; text: "text-white" }
  | { bg: "bg-blue-600"; text: "text-white" }
  | { bg: "bg-yellow-500"; text: "text-black" }
  | { bg: "bg-gray-200"; text: "text-black" };

export default function Toast(props: Props) {
  const toastMap: Record<ToastKind, ToastColor> = {
    error: { bg: "bg-red-600", text: "text-white" },
    success: { bg: "bg-green-700", text: "text-white" },
    info: { bg: "bg-blue-600", text: "text-white" },
    warning: { bg: "bg-yellow-500", text: "text-black" },
    normal: { bg: "bg-gray-200", text: "text-black" },
  };

  if (props.kind === undefined) {
    props.kind = "normal";
  }
  if (props.text === undefined) {
    props.text = "An error occured";
  }

  return (
    <div
      id=""
      className={`absolute bottom-16 my-2 rounded-md bg-gray-200 px-6 py-2 text-black ${
        toastMap[props.kind].bg
      } ${toastMap[props.kind].text}`}
    >
      {props.text}
    </div>
  );
}
