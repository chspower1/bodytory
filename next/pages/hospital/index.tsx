import { RectangleButton, RoundButton } from "@components/buttons/Button";
import { ShareStatus } from "@components/HospitalContent";
import Input from "@components/Input";
import Modal from "@components/modals/Modal";
import { Container } from "@styles/Common";
import { theme } from "@styles/theme";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { currentPatientInfo, loggedInHospital } from "atoms/atoms";
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
  id: number;
  shared: boolean;
  user : {
    id: number;
    name: string;
    birth: string;
    gender: string;
    createAt: Date;
  }
}

const HospitalHomePage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {getApi, deleteApi} = customApi("/api/hospital");
  const hospitalInfo = useRecoilValue(loggedInHospital);
  const [currentHospital,setCurrentHospital] = useState("")
  const [currentData, setCurrentData] = useState<HospitalPatients[]>();
  const setPatientInfo= useSetRecoilState(currentPatientInfo);
  const { isLoading, data, error} = useQuery(["currentHospitalKey"], getApi)
  const { mutate } = useMutation(["removePatientKey"], deleteApi)
  const [showdeleteModal, setShowDeleteModal] = useState(false);
  const [isClosingMent, setIsClosingMent] = useState(false);
  console.log(data)
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<SearchForm>({ mode: "onChange" });

  const handleClickRemovePatient = (id : number) => ()=>{
    if(isClosingMent){
      setIsClosingMent(false);
      setShowDeleteModal(false);
      queryClient.invalidateQueries(["currentHospitalKey"])
    }else{
      mutate({id});
      setIsClosingMent(true);
    }
  }
  const handleClickOnClose = ()=>{
    setShowDeleteModal(false);

  }

  const handleClickEnterUserChart= ({name, id} : {name: string; id: number}) => () => {
    router.push("/hospital/chart");
    setPatientInfo({name, id});
  }

  useEffect(() => {
    if(hospitalInfo){
      setCurrentHospital(hospitalInfo.name);
    }
  }, [hospitalInfo])
  useEffect(()=>{
    if(data){
      setCurrentData(data);
    }
  },[data])
  
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
          <Form>
            <Input white="true"  placeholder="환자 이름"  motion={false} register={register("search",{
              onChange(){
                if(data){
                  let filteredData = data.filter((x: { user: { name: string; }; }) => x.user.name.includes(watch("search")))
                  setCurrentData(filteredData)
                }
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
              {currentData && currentData.map(({user, shared, id} : HospitalPatients)=>(
                <ListLi key={`${user.name} + ${user.birth} + ${user.createAt}`}>
                  <div>
                    <Name>{user.name}</Name>
                    <Birth>{user.birth}</Birth>
                    <Gender>{user.gender === "male" ? "남" : "여"}</Gender>
                    <RecordsLinkButton onClick={handleClickEnterUserChart({name : user.name, id: user.id })} disabled={!shared}>상세보기</RecordsLinkButton>
                  </div>
                <SharedBox>
                  <RecordShareStatus weight="200" size="15px" add status={shared}>
                    {shared ? "기록 공유 중" : "기록 공유 중지"}
                  </RecordShareStatus>
                  <RectangleButton fontSize="16px" width="76px" onClick={()=> {setShowDeleteModal(true); console.log(id)}} >삭제</RectangleButton>
                </SharedBox>
                <Modal show={showdeleteModal} onClose={handleClickOnClose} activeFuction={handleClickRemovePatient(id)} closingComment={isClosingMent} >{isClosingMent ? `삭제되었습니다` :`리스트에서 ${user.name} 환자를 삭제 하시겠습니까?`}</Modal>
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
  :not(:disabled):hover {
    text-decoration: underline;
  }
  &:disabled{
    color: #999;
    cursor: default;
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
