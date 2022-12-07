import styled from "styled-components";

const SkeletonItem = styled.div`
  width: 100%;
  height: 30px;
  background-color: rgba(166, 166, 245, 0.4);
  position: relative;
  overflow: hidden;
  border-radius: 4px;

  @keyframes skeleton-gradient {
    0% {
      transform: translateX(-100%);
      background-color: rgba(176, 176, 255, 0.1);
    }
    100% {
      transform: translateX(100%);
      background-color: rgba(176, 176, 255, 0.1);
    }
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: skeleton-gradient 1.3s infinite cubic-bezier(0.99, 0.01, 0.25, 0.74);
  }
`;

export default SkeletonItem;
