import { useEffect, useState } from "react";

function useDetectMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const SMALL_SCREEN_SIZE = 768;
  useEffect(() => {
    setIsMobile(window.innerWidth < SMALL_SCREEN_SIZE);
  }, []);

  return isMobile;
}
export { useDetectMobile };
