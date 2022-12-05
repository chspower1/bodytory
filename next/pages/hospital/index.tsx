import { RectangleButton, RoundButton } from "@components/buttons/Button";
import { ShareStatus } from "@components/HospitalContent";
import Input from "@components/Input";
import { Container } from "@styles/Common";
import { theme } from "@styles/theme";
import { useQuery } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { currentPatientName, loggedInUser } from "atoms/atoms";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useRouter } from "next/router";
import { DescriptionBox, Pragraph } from "pages/users/my-hospital";
import { ToriBox, ToryIcon } from "pages/users/my-hospital/clinic-list";
import { SearchForm } from "pages/users/my-hospital/find";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

export interface HospitalName{
  id : number;
  name : string;
}

interface HospitalPatients{
  user : {
  name: string;
  birth: string;
  gender: string;
  createAt: Date;
}
}

const HospitalHomePage = () => {
  const router = useRouter();
  const {getApi} = customApi("/api/hospital");
  const hospitalInfo = useRecoilValue(loggedInUser);
  const [currentHospital,setCurrentHospital] = useState("")
  const [currentData, setCurrentData] = useState("");
  const setPatientName = useSetRecoilState(currentPatientName);
  const { isLoading, data, error} = useQuery(["currentHospitalKey"], getApi)
  console.log(data)
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<SearchForm>({ mode: "onChange" });

  const onValid = ({ search }: SearchForm) => {

  };

  const handleClickEnterUserChart= (user : string) => () => {
    router.push("/hospital/chart");
    setPatientName(user);
  }

  useEffect(() => {
    if(hospitalInfo){
      setCurrentHospital(hospitalInfo.name);
    }
  }, [hospitalInfo])
  

  return (
    <HospitalWrapper>
      <HospitalContainer>
        <PageHead>
          <ToriBox>
            <ToryIcon />
          </ToriBox>
          <DescriptionBox>
            <Pragraph>{format(new Date(), "yyyy년 MM월 dd일", { locale: ko })}</Pragraph>
            <Pragraph>
              <strong>{currentHospital}</strong> 환자 목록이에요
            </Pragraph>
          </DescriptionBox>
        </PageHead>
        <PageBody>
          <Form onSubmit={handleSubmit(onValid)}>
            <Input white  placeholder="환자 이름"  motion={false} register={register("search",{
              onChange(){
                // data.filter(x => x.name.includes(watch("search")))
              }
            })} />
          </Form>
          <ListBox>
            <ListCol>
              <div>
                <Name>이름</Name>
                <Birth>생년월일</Birth>
                <Gender>성별</Gender>
                <Records>증상기록 및 진료내역</Records>
              </div>
              <div>
                <Shared>기록 공유 상태</Shared>
              </div>
            </ListCol>
            <ListUl>
              {data && data.map(({user} : HospitalPatients)=>(
                <ListLi key={`${user.name} + ${user.birth} + ${user.createAt}`}>
                  <div>
                    <Name>{user.name}</Name>
                    <Birth>{user.birth}</Birth>
                    <Gender>{user.gender === "male" ? "남" : "여"}</Gender>
                    <RecordsLinkButton onClick={handleClickEnterUserChart(user.name)}>상세보기</RecordsLinkButton>
                  </div>
                <SharedBox>
                  <RecordShareStatus weight="200" size="15px" add status={true}>
                    {true ? "기록 공유 중" : "기록 공유 중지"}
                  </RecordShareStatus>
                  <RectangleButton fontSize="16px" width="76px">삭제</RectangleButton>
                </SharedBox>
              </ListLi>
              ))}
            </ListUl>
          </ListBox>
        </PageBody>
      </HospitalContainer>
    </HospitalWrapper>
  );
};

export default HospitalHomePage;

const HospitalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
`;

const PageHead = styled(Container)`
  display: flex;
  align-items: center;
`;
const PageBody = styled(Container)`
  max-width: 1300px;
`;

const HospitalContainer = styled.div`
  margin: auto 0;
`;

const Form = styled.form`
  display: flex;
  margin-bottom: 50px;
`;

const ListBox = styled.div`
  height: 550px;
`;
const ListCol = styled.div`
  padding: 30px 50px;
  display: flex;
  align-items: center;
  font-size: 15px;
  justify-content: space-between;
  > div:first-child {
    flex-shrink: 0;
    display: flex;
    column-gap: 70px;
  }
  > div:nth-child(2) {
    width: 300px;
    display: flex;
  }

`;
const ListUl = styled.ul`
  height: 466px;
  overflow-y:scroll;
  padding: 10px 20px;
`;
const ListLi = styled.li`
  padding: 15px 30px;
  display: flex;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  background: ${({theme})=> theme.color.lightBg};
  border-radius: 10px;
  > div:first-child {
    flex-shrink: 0;
    display: flex;
    column-gap: 70px;
  }
  & + &{
    margin-top: 20px;
  }
`
const Col = styled.div`
  text-align:center;
  margin: 0 20px;
`;
const Name = styled(Col)`
  width: 100px;
`;
const Birth = styled(Col)`
  width: 100px;
`;
const Gender = styled(Col)`
  width: 50px;
`;
const Records = styled(Col)`
  width: 140px;
`;
const RecordsLinkButton = styled.button`
  width: 140px;
  text-align:center;
  margin: 0 20px;
  color: ${({theme})=> theme.color.darkBg};
  :hover {
    text-decoration: underline;
  }
`
const Shared = styled(Col)`
  width: 130px;
`;
const SharedBox = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  > button{
    background: ${({theme}) =>theme.color.input};
  }
  
`;
const RecordShareStatus = styled(ShareStatus)`
  margin: 0 20px;
  font-weight: 500;
`
