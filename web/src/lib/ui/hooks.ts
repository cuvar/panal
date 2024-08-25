import { useIsClient, useWindowSize } from "@uidotdev/usehooks";
import { useAtom } from "jotai";
import { useContext, useEffect, useState } from "react";
import filterWidgetLayoutByRgl from "~/application/layout/filterWidgetLayoutByLayout.service";
import getHidingClasses from "~/application/layout/getHidingClasses.service";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import { type DisplayedWidgets } from "~/server/domain/layout/displayedWidgets";
import { type RGLayout } from "~/server/domain/layout/layout";
import { type ScreenSize } from "~/server/domain/other/screenSize";
import { api } from "../api/api";
import { BREAKPOINTS } from "../basic/const";
import Log from "../log/log";
import type { ToastType } from "../types/types";
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
  const isClient = useIsClient();

  const [rgLayout, setRGLayout] = useState<RGLayout>({});
  const [awLayout, setAWLayout] = useState<AdjustedWidgetLayout[]>([]);

  useEffect(() => {
    const layout = editMode ? editedWidgetLayout : widgetLayout;
    const filteredAWLayout = isClient
      ? filterWidgetLayoutByRgl(initialAWLayout, layout, currentScreenSize)
      : [];
    const allExceptHidden = filteredAWLayout.filter(
      (widget) => !getHidingClasses(widget.layout).includes(currentScreenSize),
    );

    const visibleApparentWidgets = useBoundStore
      .getState()
      .apparentWidgets.filter((w) => w.visible);

    const notShownVisibleApparentWidgets = visibleApparentWidgets.filter(
      (w) => {
        return !allExceptHidden.some((e) => e.id === w.widget.id);
      },
    );

    const widgetsToAdd = notShownVisibleApparentWidgets.map((w) => w.widget);

    allExceptHidden.push(...widgetsToAdd);

    Log("useDisplayedWidgets: rgLayout", "log", layout);

    setRGLayout(layout);
    setAWLayout(allExceptHidden);
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

/**
 * Hook for initializing the application on load
 */
export default function useInit() {
  const [isInit, setIsInit] = useState(false);

  const commandManager = useCommandManager();
  const currentScreenSize = useDetectScreenSize();

  const getAllHiddenQuery = api.layout.getAllHidden.useQuery(
    {
      screenSize: currentScreenSize,
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    if (isInit) return;

    if (getAllHiddenQuery.status == "success") {
      Log("getAllHidden", "log", getAllHiddenQuery.data);
      getAllHiddenQuery.data.forEach((widget) => {
        commandManager.hideWidget(widget, currentScreenSize);
      });
      setIsInit(true);
    } else if (getAllHiddenQuery.status == "error") {
      Log("getAllHidden", "error", getAllHiddenQuery.error);
      setIsInit(true);
    }
  }, [
    commandManager,
    currentScreenSize,
    getAllHiddenQuery.data,
    getAllHiddenQuery.error,
    getAllHiddenQuery.status,
    isInit,
  ]);
}
