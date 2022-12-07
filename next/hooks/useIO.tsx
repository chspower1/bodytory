import { useEffect, useState } from "react";

const useIO = (hasLastPage: boolean, cb: () => void) => {
  const [target, setTarget] = useState<Element | null>(null);

  useEffect(() => {
    if (!target) return;

    const io: IntersectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (hasLastPage) return io.unobserve(entry.target);
          if (entry.isIntersecting) {
            cb();
          }
        });
      },
      { threshold: 1 },
    );
    io.observe(target);

    return () => io.disconnect();
  }, [target, cb]);

  return { setTarget };
};

export default useIO;
