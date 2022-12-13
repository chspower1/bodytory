import styled, { css } from "styled-components";


const RoundedDefaultButton = styled.button<{lg ?: boolean; sm ?: boolean;}>`
  font-size: 18px;
  font-weight: medium;
  padding: 10px 50px;
  text-align:center;
  display:flex;
  align-items:center;
  justift-content:center;
  border-radius: 50px;
  img, svg{
    margin-right: 15px
  }
  ${({lg}) => lg && css`
    width: 500px;
    padding: 10px 0;
    border-radius: 60px;
  `}
  ${({sm}) => sm && css`
    width: 140px;
    font-size:16px;
    border-radius: 40px;
  `}
`

const CircleDefaultButton = styled.button<{lg ?: boolean; sm ?: boolean;}>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display:flex;
  justify-content:center;
  align-items:center;
  ${({lg}) => lg && css`
    width: 140px;
    height: 140px;
  `}
  ${({sm}) => sm && css`
    width: 62px;
    height: 62px;
  `}
`

const RectangleDefaultButton = styled.button<{ sm ?: boolean;}>`
  width:88px;
  text-align:center;
  padding: 10px 0; 
  color:#fff;
  border-radius: 5px;
`