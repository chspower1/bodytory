import { useEffect, useState } from "react";

const useIO = (hasLastPage: boolean, cb: () => void) => {
  const [target, setTarget] = useState<Element | null>(null);

  useEffect(() => {
    if (!target) return;

    const io: IntersectionObserver = new IntersectionObserver(
      (entries, observer) => {
        if (hasLastPage) return io.unobserve(entries[0].target);
        if (entries[0].isIntersecting) {
          cb();
        }
      },
      { root: null, threshold: 1, rootMargin: "0px" },
    );
    io.observe(target);

    return () => io.disconnect();
  }, [target, cb]);

  return { setTarget };
};

export default useIO;
