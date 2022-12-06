import styled from "styled-components";
import SkeletonItem from "./SkeletonUI";

const ListSkeleton = () => {
  return (
    <Wrapper>
      {new Array(5).fill("").map((elem: string, index: number) => (
        <List key={index}>
          <Title />
          <Departments />
          <Address />
          <Share />
        </List>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  width: 100%;
`;

const List = styled.li`
  background: rgb(225, 227, 255);
  height: 80px;
  display: flex;
  align-items: center;
  margin-top: 30px;
  border-radius: 40px;
`;

const Title = styled(SkeletonItem)`
  width: 150px;
  height: 30px;
  margin-left: 20px;
`;

const Departments = styled(SkeletonItem)`
  width: 100px;
  height: 30px;
  margin-left: 20px;
`;

const Address = styled(SkeletonItem)`
  width: 700px;
  height: 30px;
  margin-left: 50px;
`;

const Share = styled(SkeletonItem)`
  width: 300px;
  height: 30px;
  margin-left: 100px;
`;

export default ListSkeleton;
