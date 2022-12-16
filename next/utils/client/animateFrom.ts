import { gsap } from "gsap";

export function animateFrom(elem:any, direction?:any) {
  direction = direction || 1;
  
  let x: number | undefined = 0,
  y: number | undefined = direction * 100,
  delayTime: number = 0;


  if(elem.classList.contains("gs_reveal_fromLeft")) {
    x = -160;
    y = 0;
  } else if (elem.classList.contains("gs_reveal_fromRight")) {
    x = 160;
    y = 0;
  } else if (elem.classList.contains("gs_reveal_fromTop")) {
    x = 0;
    y = -120;
  } else if (elem.classList.contains("gs_reveal_fromBottom")) {
    x = 0;
    y = 120;
  } 

  // 지연시간
  if (elem.classList.contains("delay200")) {
    delayTime = 0.2;
  } else if (elem.classList.contains("delay400")) {
    delayTime = 0.4;
  } else if (elem.classList.contains("delay600")) {
    delayTime = 0.6;
  } else if (elem.classList.contains("delay800")) {
    delayTime = 0.8;
  } else if (elem.classList.contains("delay1000")) {
    delayTime = 1;
  } else if (elem.classList.contains("delay1200")) {
    delayTime = 1.2;
  }

  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";
  gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
    duration: 1.25, 
    x: 0,
    y: 0, 
    autoAlpha: 1, 
    ease: "expo", 
    overwrite: "auto"
  });
  
}

export function hide(elem: any) {
  gsap.set(elem, {autoAlpha: 0});
}