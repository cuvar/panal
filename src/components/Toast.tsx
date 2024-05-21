import { useAtom } from "jotai";
import {
  checkedIcon,
  crossRoundIcon,
  infoIcon,
  warningIcon,
} from "~/utils/icons";
import { toastTextAtom, toastTypeAtom } from "~/utils/store";
import type { ToastColor, ToastType } from "~/utils/types/types";

export default function Toast() {
  const toastMap: Record<ToastType, ToastColor> = {
    error: { bg: "bg-red-600", text: "text-foreground" },
    success: { bg: "bg-green-700", text: "text-foreground" },
    info: { bg: "bg-gray-200", text: "text-inverted" },
    warning: { bg: "bg-yellow-500", text: "text-inverted" },
  };

  const toastIconMap: Record<ToastType, JSX.Element> = {
    error: crossRoundIcon,
    success: checkedIcon,
    info: infoIcon,
    warning: warningIcon,
  };

  const [toastText] = useAtom(toastTextAtom);
  const [toastType] = useAtom(toastTypeAtom);

  const visibleClass = toastText.trim().length > 0 ? "visible" : "invisible";

  return (
    <div
      id=""
      className={`text-inverted fixed bottom-16 my-2 flex items-center space-x-2 rounded-xl bg-gray-200 px-8 py-2 text-lg shadow-xl ${visibleClass} 
      ${toastMap[toastType].bg} ${toastMap[toastType].text}`}
    >
      <span>{toastIconMap[toastType]}</span>
      <span>{toastText}</span>
    </div>
  );
}
