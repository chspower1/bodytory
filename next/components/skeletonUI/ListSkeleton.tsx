import styled, { keyframes } from "styled-components";

const ListSkeleton = ({ backgroundColor }: { backgroundColor: string }) => {
  return (
    <Wrapper>
      {new Array(6).fill("").map((elem: string, index: number) => (
        <List key={index} backgroundColor={backgroundColor}>
          <Title />
          <Departments />
          <Address />
          <Share />
        </List>
      ))}
    </Wrapper>
  );
};

const gradient = keyframes`
0% {
  transform: translateX(-100%);
  background-color: rgba(176, 176, 255, 0.2);
}
100% {
  transform: translateX(100%);
  background-color: rgba(176, 176, 255, 0.2);
}
`;

const Wrapper = styled.ul`
  width: 98%;
`;

const List = styled.li<{ backgroundColor: string }>`
  background: ${props => props.backgroundColor};
  height: 80px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  & + * {
    margin-top: 30px;
  }
`;

const Title = styled.div`
  width: 150px;
  background-color: rgba(166, 166, 245, 0.4);
  height: 30px;
  margin-left: 20px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: ${gradient} 1.3s infinite cubic-bezier(0.99, 0.01, 0.25, 0.74);
  }
`;

const Departments = styled.div`
  width: 100px;
  background-color: rgba(166, 166, 245, 0.4);
  height: 30px;
  margin-left: 20px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: ${gradient} 1.3s infinite cubic-bezier(0.99, 0.01, 0.25, 0.74);
  }
`;

const Address = styled.div`
  width: 700px;
  background-color: rgba(166, 166, 245, 0.4);
  height: 30px;
  margin-left: 50px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: ${gradient} 1.3s infinite cubic-bezier(0.99, 0.01, 0.25, 0.74);
  }
`;

const Share = styled.div`
  width: 300px;
  height: 30px;
  background-color: rgba(166, 166, 245, 0.4);
  margin-left: 100px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: ${gradient} 1.3s infinite cubic-bezier(0.99, 0.01, 0.25, 0.74);
  }
`;

export default ListSkeleton;
