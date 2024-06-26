import styled from "styled-components";
import { useRecoilState } from "recoil";
import { loggedInUserState } from "../../../atom";
import { useState, useEffect } from "react";
import { client } from "../../../../libs/supabase";
import { Button, FrameWrapper, FrameParent, TitleBox, TitleText, TagGroup, Text, Group, GroupDiv,TextBox, Schedule, RequiredBox, ButtonText, GroupRoot, ButtonGroup, TextDifficulty, TextBeach, TextSport, TextHost, TextState } from "./MatchingLayout";


const ApplyBox = styled.textarea`
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  width: 550px;
  height: 130px;
  border-radius: 5px;
  border: none;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  font-size: var(--font-size-m);
  color: var(--color-navy);
  padding: 10px;
  resize: none;
  outline: none;
  @media screen and (max-width: 376px) {
    width: 330px;
    height: 100px;
    font-size: var(--font-size-s);
  }
`;

const MatchingWatch = ({ matching, sport, beach, hostProfile }) => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [isHostUser, setIsHostUser] = useState(matching.host_userId === loggedInUser.id);
  const [isUserJoined, setIsUserJoined] = useState(false);
  const [isMatchingFull, setIsMatchingFull] = useState(false);

  useEffect(() => {
    setIsUserJoined(matching.joining_users && matching.joining_users.includes(loggedInUser.id));
  }, [matching, loggedInUser.id]);

  useEffect(() => {
    setIsHostUser(matching.host_userId === loggedInUser.id);
  }, [matching.host_userId, loggedInUser.id]);

  useEffect(() => {
    const currentParticipants = matching.joining_users ? matching.joining_users.length : 0;
    if (currentParticipants >= matching.total_people) {
      matching.state = "모집완료";
      setIsMatchingFull(true);
    } else {
      matching.state = "모집중";
      setIsMatchingFull(false);
    }
  }, [matching]);
  

  const formatTime = (timeString) => {
    const [hour, minute] = timeString.split(':');
    return `${hour}시 ${minute}분`;
  };

  const handleButtonClick = async () => {
    if (isHostUser) {
      return;
    } else {
      if (isUserJoined) {
        const cancel = window.confirm('매칭을 취소하시겠습니까?');
        if (cancel) {
          setIsUserJoined(false);
          //취소 시 배열 삭제
          const updatedJoiningUsers = Array.isArray(matching.joining_users) ? matching.joining_users.filter(userId => userId !== loggedInUser.id) : [];
          await client
            .from('MATCHING')
            .update({
              joining_users: updatedJoiningUsers
            })
            .eq('id', matching.id);
          window.location.reload();
        }
      } else {
        const apply = window.confirm('매칭을 신청하시겠습니까?');
        if (apply) {
          setIsUserJoined(true);
          //신청 시 배열 추가
          const updatedJoiningUsers = Array.isArray(matching.joining_users) ? [...matching.joining_users, loggedInUser.id] : [loggedInUser.id];
          await client
            .from('MATCHING')
            .update({
              joining_users: updatedJoiningUsers,
            })
            .eq('id', matching.id);
          window.location.reload();
        }
      }
    }
  };

  return (
    <FrameWrapper>
      <FrameParent key={matching.id}>
        <TitleBox>
          <TitleText>{matching.title}</TitleText>
        </TitleBox>
        <TagGroup>
          <TextSport>#{sport.title}</TextSport>
          <TextDifficulty>#{matching.difficulty}</TextDifficulty>
          <TextBeach>#{beach.beach_name}</TextBeach>
        </TagGroup>
        <Group>
          <GroupDiv>
            <TextBox>참가인원</TextBox>
            <TextState>{matching.joining_users ? matching.joining_users.length : 0}/{matching.total_people}명</TextState>
          </GroupDiv>
          <GroupDiv style={{paddingLeft:"0px"}}>
            <TextBox>모집상태</TextBox>
            <Text>{matching.state}</Text>
          </GroupDiv>
        </Group>
        <Group style={{marginTop:"0px"}}>
          <GroupDiv style={{paddingTop:"0px"}}>
            <TextBox>일정</TextBox>
            <Schedule>{matching.matching_date} {formatTime(matching.matching_time)}</Schedule>
          </GroupDiv>
          <GroupDiv style={{paddingTop:"0px", paddingLeft:"0px"}}>
            <TextBox>호스트</TextBox>
            <TextHost>{hostProfile ? hostProfile.user_nickname : "host_nickname"}</TextHost>
          </GroupDiv>
        </Group>
        <GroupRoot>
          <RequiredBox>
            상세위치: {matching.location}<br/><br/>
            {matching.necessity_details ? `준비물 : ${matching.necessity_details}` : '준비물이 없습니다.'}<br/><br/>
            [공지사항]<br />
            {matching.required}
          </RequiredBox>
          <ApplyBox placeholder="신청 메세지를 입력해주세요." />
          <Button onClick={handleButtonClick} disabled={isMatchingFull}>
            <ButtonText>{isMatchingFull ? '매칭 마감' : isUserJoined ? '매칭 취소하기' : '매칭하기'}</ButtonText>
          </Button>
        </GroupRoot>
      </FrameParent>
    </FrameWrapper>
  );
};

export default MatchingWatch;
