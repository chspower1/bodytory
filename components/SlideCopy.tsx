


import React, { createRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const SlideCopy = () => {
  const containerRef= useRef<HTMLDivElement>(null);
  const innerContainerRef= useRef<HTMLUListElement>(null);
  const slideItemRefs = Array.from({length: 8}, x => useRef<HTMLLIElement>(null));
  const prevButtonRef= useRef<HTMLButtonElement>(null); 
  const nextButtonRef= useRef<HTMLButtonElement>(null); 
  const slideContainer = containerRef.current;
  const slideInnerContainer = innerContainerRef.current;
  const slideItem = slideItemRefs[0].current;
  const [slidePositions, setSlidePositions] = useState<number[]>([]);
  const slideLength = slideItemRefs.length;
  const prevButton = prevButtonRef.current;
  const nextButton = nextButtonRef.current; 

  const [ innerContainerMargin, setInnerContainerMargin ] = useState<number>(0)
  const [ innerContainerWidth, setInnerContainerWidth ] = useState<number>(0)
  const [ windowWidth, setWindowWidth ] = useState<number>(0)
  const [ mouseDown, setMouseDown ] = useState<boolean>(false)
  const [ mouseStart, setMouseStart ] = useState<number>(0)
  const [ mouseEnd, setMouseEnd ] = useState<number>(0)
  let ITEM_MARGIN = 58;


  const [currentIdx, setCurrentIdx] = useState(0);
  const setItemMarginFn = ()=>{
    if(slideInnerContainer && slideItem ){
      setInnerContainerMargin((windowWidth! - (slideItem.offsetWidth + (ITEM_MARGIN * 2))) / 2);
      setInnerContainerWidth((slideItem.offsetWidth + (ITEM_MARGIN * 2)) * slideLength) ;

      const t = innerContainerWidth / ((slideItem.offsetWidth) + (ITEM_MARGIN * 2));
      console.log("t",-t);
    }
  }


  const handleClickPrevFn = ()=>{
    if(currentIdx > 0){
      if(prevButton){
        prevButton.disabled = true
        setCurrentIdx(prev => prev - 1)
        setTimeout(()=>{
          prevButton.disabled = false
        },1000)
      }
    }
  }
  const handleClickNextFn = ()=>{
    if(currentIdx < 7){
      if(nextButton){
        nextButton.disabled = true
        setCurrentIdx(prev => prev + 1)
        setTimeout(()=>{
          nextButton.disabled = false
        },1000)
      }
    }
  }
  console.log();
  
  const mainSlideFn = ()=>{
    if(slideInnerContainer && slideItem){
      slideInnerContainer.style.left = `-${currentIdx * (slideItem.offsetWidth + (ITEM_MARGIN * 2))}px`;
    }
  }

  const handleMouseDown = (e : any)=>{
      console.log("mouseStart",mouseStart);
      setMouseDown(true);
      setMouseStart(e.clientX);
  }
  const handleMouseUp = (e : any)=>{
    console.log("mouseEnd",mouseEnd);
      setMouseDown(false);
      setMouseEnd(e.clientX);
      if(mouseEnd < mouseStart) handleClickNextFn()
      if(mouseEnd > mouseStart) handleClickPrevFn()
  }
  const handleMouseLeave = (e : any)=>{
      if(!mouseDown) return;
      setMouseDown(false);
      setMouseEnd(e.clientX);
      if(mouseEnd < mouseStart) handleClickNextFn()
      if(mouseEnd > mouseStart) handleClickPrevFn()
  }
  
  useEffect(()=>{
    if(slideInnerContainer){
      slideInnerContainer.style.margin = `0 ${innerContainerMargin}px`;
      slideInnerContainer.style.width = `${innerContainerWidth}px`;
    }
  },[innerContainerMargin, innerContainerWidth, slideInnerContainer])

  useEffect(()=>{
      window.addEventListener("resize",()=>{setItemMarginFn();})
      return ()=>{
        window.removeEventListener("resize",()=>{setItemMarginFn();})
      }
  })

  useEffect(()=>{
    if(slideInnerContainer && slideContainer && slideItem){
      setItemMarginFn()
    }
    setWindowWidth(window.innerWidth);
  },[slideInnerContainer, slideContainer, slideItem])
  useEffect(()=>{
    mainSlideFn()
  },[currentIdx])

/*   useEffect(()=>{
    currentItemPositionFn();
  },[]) */

  return (
    <SlideWrap>
      <SlideContainer ref={containerRef} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} /* onMouseMove={handleMouseMove} */onMouseLeave={handleMouseLeave}   >
        <SlideInnerContainer ref={innerContainerRef} >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((ele, idx) => (
            <SlideItem key={ele}margin={ITEM_MARGIN} ref={slideItemRefs[idx]}>
              <SlideItemInnerBox  className={currentIdx === idx ? 'active' : ""} >
                <ClinicItemName>{ele} 정형외과</ClinicItemName>
                <ClinicListBox>
                  {ele}
                </ClinicListBox>
              </SlideItemInnerBox>
            </SlideItem>
          ))}
        </SlideInnerContainer>
        <Button className="prevButton" onClick={handleClickPrevFn} ref={prevButtonRef}>이전</Button>
        <Button className="nextButton" onClick={handleClickNextFn} ref={nextButtonRef}>다음</Button>
      </SlideContainer>
    </SlideWrap>
  );
};

export default SlideCopy;


const Button = styled.button`
  position:absolute;
  top: 50%;
  width:50px;
  height:50px;
  background: #000;
  color:#fff;
  &.prevButton{
    left: 25%;
  }
  &.nextButton{
    right: 25%;
  }
`

const SlideWrap = styled.div`
  position:relative;
  width: 100%;
  overflow: hidden;
`;

const SlideContainer = styled.div`
  position:relative;
  height: 500px;
`;
const SlideInnerContainer = styled.ul`
  position:absolute;
  left:0;
  top:0;
  display: flex;
  width:100%;
  height:100%;
  user-select:none;
  transition: left 1s;
`;
const SlideItem = styled.li<{margin:number}>`
  flex-shrink: 0;
  width: 664px;
  height:100%;
  margin: 0 ${({margin}) => margin}px;
  display:flex;
  user-select:none;
  overflow:hidden;
`;

const SlideItemInnerBox = styled.div`
  width:80%;
  height:80%;
  border-radius: 20px;
  margin: auto auto 0 ;
  transition: height .8s, width .8s;
  display:flex;
  flex-direction:column;
  overflow:hidden;
  &.active{
    width:100%;
    height:100%;
  }
`

const ClinicItemName = styled.div`
  flex-shrink: 0;
  padding: 30px 50px;
  font-size: 27px;
  background : ${({theme}) => theme.color.darkBg};
`;
const ClinicListBox = styled.div`
  height:400px;
  padding: 30px 50px;
  background : ${({theme}) => theme.color.lightBg};
  overflow-y:scroll;
`;
const ClinicListItem = styled.div``;
