import { DependencyList, useCallback, useEffect, useRef, useState } from 'react';

export function useRefetchIncreasedInterval(
  cb: () => Promise<void>,
  baseInterval: number,
  increaseFactor: number,
  deps?: DependencyList,
) {
  const lastTimeoutIdRef = useRef<number>(0);
  const increasedInterval = useRef(baseInterval);
  const [rerun, setRerun] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = useCallback(cb, [...(deps ?? [])]);

  useEffect(() => {
    const id = setTimeout(async () => {
      await callback();
      clearTimeout(lastTimeoutIdRef.current);

      // increase the interval
      increasedInterval.current = increasedInterval.current + increaseFactor;

      // trigger next timeout
      setRerun((prev) => !prev);
    }, increasedInterval.current);

    lastTimeoutIdRef.current = Number(id);
    return () => {
      clearTimeout(lastTimeoutIdRef.current); // does nothing if id not identified
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, increaseFactor, rerun]);
}
