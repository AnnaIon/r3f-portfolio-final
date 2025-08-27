import { useEffect, useState } from "react";

export const useIsSmallDevice = () => {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsSmall(window.innerWidth < 640); // sm breakpoint
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isSmall;
};
