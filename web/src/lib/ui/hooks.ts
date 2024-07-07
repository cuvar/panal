import { useWindowSize } from "@uidotdev/usehooks";
import { useAtom } from "jotai";
import { useContext, useEffect, useState } from "react";
import filterWidgetLayoutByLayout from "~/client/services/filterWidgetLayoutByLayoutService";
import getHidingClasses from "~/client/services/getHidingClassesService";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import { BREAKPOINTS } from "../basic/const";
import Log from "../log/log";
import type {
  DisplayedWidgets,
  RGLayout,
  ScreenSize,
  ToastType,
} from "../types/types";
import { CommandContext } from "./context/command";
import { useBoundStore } from "./state";
import { toastTextAtom, toastTypeAtom } from "./state/atoms";

/**
 * Hook for detecting whether the current screen size is mobile
 * @returns {boolean} Whether the current screen size is mobile
 */
export function useDetectMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const SMALL_SCREEN_SIZE = 768;
  useEffect(() => {
    setIsMobile(window.innerWidth < SMALL_SCREEN_SIZE);
  }, []);

  return isMobile;
}

/**
 * Hook for detecting the current screen size
 * @returns {ScreenSize} The current screen size
 */
export function useDetectScreenSize(): ScreenSize {
  const windowSize = useWindowSize();
  const [screenSize, setScreenSize] = useState<ScreenSize>("xs");

  useEffect(() => {
    if (!windowSize.width) return;

    const size = Object.entries(BREAKPOINTS).findLast(([_key, value]) => {
      return windowSize.width! >= value;
    })?.[0] as ScreenSize;

    setScreenSize(size);
  }, [windowSize]);

  return screenSize;
}

/**
 * Hook for getting the value for the current screen size
 * @param {Record<ScreenSize, T>} values Array of values for all screen sizes
 * @returns The value for the current screen size
 */
export function useForScreenSize<T>(
  values: Record<ScreenSize, T>,
): T | undefined {
  const screenSize = useDetectScreenSize();
  return values[screenSize];
}

/**
 * Hook for displaying a toast if the toast is available on the UI
 * @returns {Function} Function for displaying a toast
 */
export function useToast() {
  const [, setToastText] = useAtom(toastTextAtom);
  const [, setToastType] = useAtom(toastTypeAtom);

  /**
   *
   * @param code
   * @param text
   * @param type
   * @param backendError
   * @param delay
   */
  function showToast(text: string, type: ToastType, delay = 1500) {
    // if backend error has been supplied, check if it actually contains a valid error code
    setToastType(type);
    setToastText(text);
    setTimeout(() => {
      setToastText("");
    }, delay);
  }
  return showToast;
}

/**
 * Hook for getting the command manager instance
 * @returns {CommandManager} The command manager instance
 */
export function useCommandManager() {
  const commandManager = useContext(CommandContext);

  return commandManager;
}

/**
 * Calculates the displayed widgets based on the current layout
 * @param {AdjustedWidgetLayout[]} initialAWLayout Initial AdjustedWidgetLayout
 * @returns {DisplayedWidgets} Displayed widgets
 */
export function useDisplayedWidgets(
  initialAWLayout: AdjustedWidgetLayout[],
): DisplayedWidgets {
  const widgetLayout = useBoundStore((state) => state.widgetLayout);
  const editedWidgetLayout = useBoundStore((state) => state.editedWidgetLayout);
  const editMode = useBoundStore((state) => state.editMode);
  const currentScreenSize = useDetectScreenSize();

  const [rgLayout, setRGLayout] = useState<RGLayout>({});
  const [awLayout, setAWLayout] = useState<AdjustedWidgetLayout[]>([]);

  useEffect(() => {
    const layout = editMode ? editedWidgetLayout : widgetLayout;
    const filteredAWLayout = filterWidgetLayoutByLayout(
      initialAWLayout,
      layout,
      currentScreenSize,
    );
    const exceptHding = filteredAWLayout.filter(
      (widget) => !getHidingClasses(widget.layout).includes(currentScreenSize),
    );

    Log("useDisplayedWidgets", "log", exceptHding);

    setRGLayout(layout);
    setAWLayout(exceptHding);
  }, [
    currentScreenSize,
    editMode,
    editedWidgetLayout,
    initialAWLayout,
    widgetLayout,
  ]);

  return {
    rgLayout: rgLayout,
    awLayout: awLayout,
  };
}
