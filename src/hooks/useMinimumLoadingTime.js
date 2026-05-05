import { useEffect, useRef, useState } from "react";

const DEFAULT_MINIMUM_LOADING_TIME = 400;

export default function useMinimumLoadingTime(
  isLoading,
  minimumTime = DEFAULT_MINIMUM_LOADING_TIME
) {
  const [shouldShowLoader, setShouldShowLoader] = useState(isLoading);
  const loadingStartedAt = useRef(isLoading ? Date.now() : 0);

  useEffect(() => {
    let timeoutId;

    if (isLoading) {
      loadingStartedAt.current = Date.now();
      setShouldShowLoader(true);
      return undefined;
    }

    const elapsedTime = Date.now() - loadingStartedAt.current;
    const remainingTime = Math.max(minimumTime - elapsedTime, 0);

    timeoutId = setTimeout(() => {
      setShouldShowLoader(false);
    }, remainingTime);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLoading, minimumTime]);

  return shouldShowLoader;
}
