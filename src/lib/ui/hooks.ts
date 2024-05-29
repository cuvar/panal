import { useEffect, useState } from "react";
import type { ScreenSize } from "../../utils/types/types";
import { BREAKPOINTS } from "../basic/const";

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
  const [screenSize, setScreenSize] = useState<ScreenSize>("xs");
  const size = Object.entries(BREAKPOINTS).findLast(([_key, value]) => {
    return window.innerWidth >= value;
  })?.[0] as ScreenSize;

  useEffect(() => {
    setScreenSize(size);
  }, [size]);

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
