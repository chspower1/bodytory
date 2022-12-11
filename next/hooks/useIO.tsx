import { useEffect, useState } from "react";

const useIO = (hasLastPage: boolean, callback: () => void) => {
  const [target, setTarget] = useState<Element | null>(null);

  useEffect(() => {
    if (!target) return;

    const io: IntersectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (hasLastPage) observer.unobserve(entry.target);
          else if (entry.isIntersecting) callback();
        })
      },
      { root: null, threshold: 1, rootMargin: "0px" },
    );
    io.observe(target);

    return () => io.disconnect();
  }, [target, callback]);

  return { setTarget };
};

export default useIO;
