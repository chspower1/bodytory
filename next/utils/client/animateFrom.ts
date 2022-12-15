import { gsap } from "gsap";

export function animateFrom(elem: any) {
  let x: number | undefined,
    y: number | undefined,
    delayTime: number = 0;

  // 페이드인 방향
  if (elem.classList.contains("gs_reveal_fromTop")) {
    x = 0;
    y = -300;
  } else if (elem.classList.contains("gs_reveal_fromBottom")) {
    x = 0;
    y = 300;
  } else if (elem.classList.contains("gs_reveal_fromLeft")) {
    x = -400;
    y = 0;
  } else if (elem.classList.contains("gs_reveal_fromRight")) {
    x = 400;
    y = 0;
  }

  // 지연시간
  if (elem.classList.contains("delay200")) {
    delayTime = 0.2;
  }

  if (elem.classList.contains("delay400")) {
    delayTime = 0.4;
  }

  if (elem.classList.contains("delay600")) {
    delayTime = 0.6;
  }

  if (elem.classList.contains("delay800")) {
    delayTime = 0.8;
  }

  if (elem.classList.contains("delay1000")) {
    delayTime = 1;
  }

  if (elem.classList.contains("delay1200")) {
    delayTime = 1.2;
  }

  gsap.fromTo(
    elem,
    { x: x, y: y, autoAlpha: 0 },
    {
      duration: 2,
      delay: delayTime,
      x: 0,
      y: 0,
      autoAlpha: 1,
      ease: "expo",
      // overwrite: "auto"
    },
  );
}

export function hide(elem: any) {
  let x, y;

  if (elem.classList.contains("gs_reveal_fromTop")) {
    x = 0;
    y = -40;
  } else if (elem.classList.contains("gs_reveal_fromBottom")) {
    x = 0;
    y = 40;
  } else if (elem.classList.contains("gs_reveal_fromLeft")) {
    x = -60;
    y = 0;
  } else if (elem.classList.contains("gs_reveal_fromRight")) {
    x = 60;
    y = 0;
  }

  gsap.set(elem, { autoAlpha: 0, x: x, y: y });
}
