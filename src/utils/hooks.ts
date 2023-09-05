import { useEffect, useState } from "react";
import { BREAKPOINTS } from "./const";

export function useDetectMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const SMALL_SCREEN_SIZE = 768;
  useEffect(() => {
    setIsMobile(window.innerWidth < SMALL_SCREEN_SIZE);
  }, []);

  return isMobile;
}

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

export function useForScreenSize<T>(
  values: Record<ScreenSize, T>,
): T | undefined {
  const screenSize = useDetectScreenSize();
  return values[screenSize];
}
