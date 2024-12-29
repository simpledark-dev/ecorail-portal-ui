import { useWindowSize } from "react-use";

const useDevice = () => {
  const { width } = useWindowSize();

  const isMobile = width < 768;
  const isIpad = width >= 768 && width <= 1024;
  const isDesktop = width > 1024;
  const isLargeDesktop = width > 1280;

  return {
    isMobile,
    isIpad,
    isDesktop,
    isLargeDesktop,
  };
};

export default useDevice;
