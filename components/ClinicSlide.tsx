import React, { createRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const ClinicSlide = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerContainerRef = useRef<HTMLUListElement>(null);
  const slideItemRefs = Array.from({ length: 8 }, x => useRef<HTMLLIElement>(null));
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const slideContainer = containerRef.current;
  const slideInnerContainer = innerContainerRef.current;
  const slideItem = slideItemRefs[0].current;
  const [slidePositions, setSlidePositions] = useState<number[]>([]);
  const slideLength = slideItemRefs.length;
  const prevButton = prevButtonRef.current;
  const nextButton = nextButtonRef.current;

  const [innerContainerMargin, setInnerContainerMargin] = useState<number>(0);
  const [innerContainerWidth, setInnerContainerWidth] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [mouseStart, setMouseStart] = useState<number>(0);
  const [mouseEnd, setMouseEnd] = useState<number>(0);
  const [dragStart, setDragStart] = useState<number>(0);
  const [dragEnd, setDragEnd] = useState<number>(0);
  const [drag, setDrag] = useState<number>(0);
  let ITEM_MARGIN = 58;
  let timeOut: string | number | NodeJS.Timeout | undefined;

  const [currentIdx, setCurrentIdx] = useState(0);
  // console.log((windowWidth! - (slideItem.offsetWidth + (ITEM_MARGIN * 2))) / 2);

  const setItemMarginFn = () => {
    setWindowWidth(window.innerWidth);
    if (slideInnerContainer && slideItem) {
      // margin-left 공식 ex) 1920 일때 1920 - (아이템 width 값 + 양쪽 margin 값) / 2
      setInnerContainerMargin((windowWidth - (slideItem.offsetWidth + ITEM_MARGIN * 2)) / 2);
      setInnerContainerWidth((slideItem.offsetWidth + ITEM_MARGIN * 2) * slideLength);

      const t = innerContainerWidth / (slideItem.offsetWidth + ITEM_MARGIN * 2);
      console.log("t", -t);
    }
  };

  const handleClickPrevFn = () => {
    if (currentIdx > 0) {
      /* if(prevButton){
        prevButton.disabled = true */
      setCurrentIdx(prev => prev - 1);
      /* setTimeout(()=>{
          prevButton.disabled = false
        },1000)
      } */
    }
  };
  const handleClickNextFn = () => {
    if (currentIdx < 7) {
      /* if(nextButton){
        nextButton.disabled = true */
      setCurrentIdx(prev => prev + 1);
      /* setTimeout(()=>{
          nextButton.disabled = false
        },1000)
      } */
    }
  };

  const mainSlideFn = () => {
    if (slideInnerContainer && slideItem) {
      slideInnerContainer.style.transition = `left .5s`;
      slideInnerContainer.style.left = `-${currentIdx * (slideItem.offsetWidth + ITEM_MARGIN * 2)}px`;
      setTimeout(() => {
        slideInnerContainer.style.transition = `0s`;
      }, 500);
    }
  };

  const handleMouseDown = (e: any) => {
    if (slideInnerContainer && slideContainer && slideItem) {
      setMouseDown(true);
      setMouseStart(e.clientX);
      setDragStart(
        e.clientX -
          slideInnerContainer.offsetLeft +
          (slideItem.offsetWidth + ITEM_MARGIN * 2 - innerContainerMargin) +
          (innerContainerMargin - (slideItem.offsetWidth + ITEM_MARGIN * 2 - innerContainerMargin)),
      );
    }
  };

  const handleMouseUp = (e: any) => {
    if (slideInnerContainer && slideContainer && slideItem) {
      setMouseDown(false);
      setMouseEnd(e.clientX);
      // if(mouseEnd < mouseStart) handleClickNextFn()
      // if(mouseEnd > mouseStart) handleClickPrevFn()
      setTimeout(() => {
        mainSlideFn();
      }, 100);
    }
  };

  const handleMouseMove = (e: any) => {
    if (slideInnerContainer && slideContainer && slideItem) {
      if (!mouseDown) return;
      setDragEnd(e.clientX);
      setDrag(dragEnd - dragStart);
      slideInnerContainer.style.left = `${drag}px`;
      const selectIdx = -Math.round(drag / (slideItem.offsetWidth + ITEM_MARGIN * 2));
      if (selectIdx <= 0) {
        setCurrentIdx(0);
      } else if (selectIdx >= slideItemRefs.length - 1) {
        setCurrentIdx(slideItemRefs.length - 1);
      } else {
        setCurrentIdx(selectIdx);
      }

      // console.log('zs', -Math.round(drag /  ((slideItem.offsetWidth) + (ITEM_MARGIN * 2))));
    }
  };
  const handleMouseLeave = (e: any) => {
    if (slideInnerContainer && slideContainer) {
      if (!mouseDown) return;
      setMouseDown(false);
      setMouseEnd(e.clientX);
    }
  };

  useEffect(() => {
    if (slideInnerContainer) {
      slideInnerContainer.style.margin = `0 ${innerContainerMargin}px`;
      slideInnerContainer.style.width = `${innerContainerWidth}px`;
    }
  }, [innerContainerMargin, innerContainerWidth, slideInnerContainer]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setItemMarginFn();
    });
    return () => {
      window.removeEventListener("resize", () => {
        setItemMarginFn();
      });
    };
  });

  useEffect(() => {
    if (slideInnerContainer && slideContainer && slideItem) {
      setItemMarginFn();
    }
    setWindowWidth(window.innerWidth);
  }, [slideInnerContainer, slideContainer, slideItem]);
  /*   useEffect(()=>{
    mainSlideFn()
  },[currentIdx]) */

  /*   useEffect(()=>{
    currentItemPositionFn();
  },[]) */

  return (
    <SlideWrap>
      <SlideContainer
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <SlideInnerContainer ref={innerContainerRef}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((ele, idx) => (
            <SlideItem key={ele} margin={ITEM_MARGIN} ref={slideItemRefs[idx]}>
              <SlideItemInnerBox className={currentIdx === idx ? "active" : ""}>
                <ClinicItemName>{ele} 정형외과</ClinicItemName>
                <ClinicListBox>{ele}</ClinicListBox>
              </SlideItemInnerBox>
            </SlideItem>
          ))}
        </SlideInnerContainer>
        {/* <ButtonBox>
          <Button onClick={handleClickPrevFn} ref={prevButtonRef}>이전</Button>
          <Button onClick={handleClickNextFn} ref={nextButtonRef}>다음</Button>
        </ButtonBox> */}
      </SlideContainer>
    </SlideWrap>
  );
};

export default ClinicSlide;

const ButtonBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  width: 60%;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 50px;
  height: 50px;
  background: #000;
  color: #fff;
`;

const SlideWrap = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const SlideContainer = styled.div`
  position: relative;
  height: 500px;
`;
const SlideInnerContainer = styled.ul`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  width: 100%;
  height: 100%;
  user-select: none;
  // transition: left 1s;
`;
const SlideItem = styled.li<{ margin: number }>`
  flex-shrink: 0;
  width: 664px;
  height: 100%;
  margin: 0 ${({ margin }) => margin}px;
  display: flex;
  user-select: none;
  overflow: hidden;
`;

const SlideItemInnerBox = styled.div`
  width: 80%;
  height: 80%;
  border-radius: 20px;
  margin: auto auto 0;
  transition: height 0.8s, width 0.8s;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  &.active {
    width: 100%;
    height: 100%;
  }
`;

const ClinicItemName = styled.div`
  flex-shrink: 0;
  padding: 30px 50px;
  font-size: 27px;
  background: ${({ theme }) => theme.color.darkBg};
`;
const ClinicListBox = styled.div`
  height: 400px;
  padding: 30px 50px;
  background: ${({ theme }) => theme.color.lightBg};
  overflow-y: scroll;
`;
const ClinicListItem = styled.div``;
