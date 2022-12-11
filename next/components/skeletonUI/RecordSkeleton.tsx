import styled from "styled-components";
import SkeletonItem from "./SkeletonUI";

const RecordSkeleton = () => {
  return (
    <>
      {new Array(3).fill("").map((_, i) => (
        <Container key={i}>
          <Date />
          <RecordBox>
            <RecordWord />
            <RecordWord />
            <Images />
          </RecordBox>
        </Container>
      ))}
    </>
  );
};

const Container = styled.div`
  width: 100%;
  & + & {
    margin-top: 15px;
  }
`;

const Date = styled(SkeletonItem)`
  margin-left: 10px;
  width: 400px;
  height: 30px;
  margin-bottom: 10px;
  border-radius: 20px;
`;

const RecordBox = styled.div`
  position: relative;
  padding: 20px 200px 20px 30px;
  width: 100%;
  height: 150px;
  border-radius: 20px;
  background-color: rgb(235, 236, 252);
`;

const Images = styled(SkeletonItem)`
  position: absolute;
  width: 80px;
  height: 80px;
  top: 50%;
  transform: translate(0, -50%);
  right: 90px;
  border-radius: 15px;
`;

const RecordWord = styled(SkeletonItem)`
  width: 500px;
  height: 35px;
  border-radius: 20px;
  & + & {
    width: 300px;
    margin-top: 10px;
  }
`;

export default RecordSkeleton;
