import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  color: black;
  padding: 20px;
  border-radius: var(--br-3xs);
  height: 800px;
  width: 600px;
  text-align: center;
  position: relative;
  @media screen and (max-width: 376px) {
    width: 350px;
    height: 600px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: var(--color-dark);
  &:hover {
    color: var(--color-navy);
  }
`;

export const Button = styled.button`
  border: none;
  width: 150px;
  padding: var(--padding-base) var(--padding-base);
  background-color: var(--color-blue-main);
  color: var(--color-white);
  border-radius: var(--br-3xs);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  &:hover {
    background-color: ${({ disabled }) => (disabled ? 'gray' : 'var(--color-navy)')};
    box-sizing: border-box;
  }
  @media screen and (max-width: 376px) {
    width: 100px;
    height: 40px;
  }
`;

export const ButtonText = styled.div`
  position: relative;
  font-size: var(--font-size-m);
  text-align: center;
  display: inline-block;
  white-space: nowrap;
  @media screen and (max-width: 376px) {
    font-size: var(--font-size-s);
  }
`;

/////////////////////////////// MatchingWrite, Matchingupdate ///////////////////////////////
export const FrameWrapperRoot = styled.form`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  max-width: 100%;
  height: 100%;
  gap: var(--gap-base);
  margin: auto;
  @media screen and (max-width: 376px) {
    gap: var(--gap-3xs);
  }
`;

export const Div = styled.div`
  font-size: var(--font-size-s);
  font-weight: bold;
  color: var(--color-blue-main);
  text-align: center;
  height: 45px;
  line-height: 45px;
  @media screen and (max-width: 376px) {
  height: 30px;
  line-height: 30px;
  font-size: var(--font-size-xs);
  }
`;

export const Title = styled.input.attrs({
  maxLength: 17
})`
  height: 40px;
  flex: 1;
  border-radius: var(--br-8xs);
  border: none;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  overflow: hidden;
  min-width: 374px;
  max-width: 100%;
  padding: 10px;
  background-color: aliceblue;
  @media screen and (max-width: 376px) {
    min-width: 190px;
    height: 30px;
  }
`;
export const SportTagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  box-sizing: border-box;
  max-width: 100%;
  gap: var(--gap-3xs);
`;


export const FrameGroup = styled.div`
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: var(--gap-xl);
  white-space: nowrap;
  margin-bottom: 10px;
  @media screen and (max-width: 376px) {
    flex-wrap: wrap;
  }
`;
export const Schedulebox = styled.input`
  height: 40px;
  flex: 1;
  border-radius: var(--br-8xs);
  border: none;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  overflow: hidden;
  max-width: 30%;
  padding: 10px;
  background-color: aliceblue;
    @media screen and (max-width: 376px) {
    height: 30px;
    max-width: 100px;
  }
`;
export const NumberInput = styled.input`
  height: 40px;
  flex: 1;
  border-radius: var(--br-8xs);
  border: none;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  overflow: hidden;
  max-width: 30%;
  padding: 10px;
  background-color: aliceblue;
  @media screen and (max-width: 376px) {
    height: 30px;
    max-width: 100px;
    line-height: 30px;
  }
`;
export const FrameDiv = styled.div`
  width: 767px;
  display: flex;
  justify-content: flex-start;
  gap: var(--gap-3xs);
  box-sizing: border-box;
  max-width: 100%;
  @media screen and (max-width: 376px) {
    width: 300px;
  }
`;
export const FrameDiv2 = styled.div`
  width: 767px;
  display: flex;
  justify-content: flex-start;
  gap: var(--gap-3xs);
  box-sizing: border-box;
  max-width: 100%;
  @media screen and (max-width: 376px) {
    width: 300px;
    font-size: var(--font-size-s);
    gap: 0px;
  }
`;


export const FrameParent1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  height: 60%;
  margin-top: 25px;
  @media screen and (max-width: 376px) {
    height: 400px;
    width: 350px;

  }
`;
export const Divbox = styled.div`
  padding: 10px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  height: 40px;
  line-height: 20px;
  background-color: var(--color-blue-vivid);
  width: 70px;
  @media screen and (max-width: 376px) {
    width: 50px;
    font-size: var(--font-size-s);
    height: 30px;
    line-height: 20px;
    padding: 5px;
  }
`;
export const Textbox = styled.textarea`
  height: 150px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  font-size: var(--font-size-m);
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  resize: none;
  border: none;
  outline: none;
  background-color: aliceblue;
  @media screen and (max-width: 376px) {
    height: 80px;
    font-size: var(--font-size-s);
  }
`;

export const DivRoot = styled.div`
  width: 100%;
  box-sizing: border-box;
  gap: var(--gap-base);
  @media screen and (max-width: 675px) {
    gap: var(--gap-mini);
    box-sizing: border-box;
  }
`;

export const Div2 = styled.div`
  position: relative;
  font-size: var(--font-size-m);
  color: inherit;
  text-align: center;
  display: inline-block;
  white-space: nowrap;
`;

export const FrameDiv1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  @media screen and (max-width: 376px) {
    flex-direction: column;
    gap: var(--gap-xl);
  }
`;
export const Radio = styled.input`
  &:checked + label {
    color: var(--color-blue-main);
    font-weight: 900;
  }
`;
export const RadioLabel = styled.label`
  margin-left: 0px;
  margin-right: 0px;
  height: 45px;
  line-height: 45px;
  font-weight: bold;
  color: var(--color-gray);
  cursor: pointer;
  &:hover {
    color: var(--color-blue-main);
  }
  @media screen and (max-width: 376px) {
    height: 30px;
    line-height: 30px;
    font-size: var(--font-size-s);
  }
`;

export const Dropdown = styled.select`
  height: 40px;
  flex: 1;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  overflow: hidden;
  max-width: 60%;
  padding: 0px 20px 0px 10px;
  background-color: aliceblue;
  @media screen and (max-width: 376px) {
    width: 100px;
    height: 30px;
  }
`;
export const Necessity = styled.input`
  margin-left: 23px;
  height: 45px;
  flex: 1;
  border-radius: var(--br-8xs);
  border: 1px solid var(--color-blue-main);
  box-sizing: border-box;
  overflow: hidden;
  min-width: 30px;
  max-width: 100%;
  padding: 10px;
  background-color: aliceblue;
  @media screen and (max-width: 376px) {
    height: 30px;
    padding: 3px;
    font-size: var(--font-size-s);
  }
`;
export const BeachWrapper = styled.div`
  display: flex;
  gap: var(--gap-5xs);
  @media screen and (max-width: 376px) {
    gap: var(--gap-9xs);
  }
`

/////////////////////////////// MatchingWatch, MatchingApply //////////////////////////////

export const FrameWrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  max-width: 100%;
  height: 100%;
  gap: var(--gap-base);
  margin: auto;
  @media screen and (max-width: 376px) {
    width: 310px;
    height: 560px;
  }
`;

export const FrameParent = styled.div`
  margin-top: 10px;
  margin-bottom: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  height: 200px;
`;

export const TitleBox = styled.div`
  margin: 10px;
  box-sizing: border-box;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  height: 50px;
  width: 550px;
  line-height: 50px;
  text-align: center;
  background-color: aliceblue;
  @media screen and (max-width: 750px) {
    width: 300px;
    height: 40px;
    line-height: 40px;
  }
`;

export const TitleText = styled.div`
  width: 274px;
  position: relative;
  font-size: var(--m-size);
  font-family: var(--l-bold);
  color: var(--gray);
  text-align: center;
  display: inline-block;
  font-weight: bold;
`;

export const TagGroup = styled.nav`
  margin: 0px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: var(--gap-9xs);
  white-space: nowrap;
  margin-bottom: 10px;
  @media screen and (max-width: 750px) {
    flex-wrap: wrap;
  }
`;

export const Text = styled.div`
  padding: 10px;
  border: none;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  height: 40px;
  line-height: 20px;
  width: 90px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 376px) {
    width: 70px;
    height: 30px;
    line-height: 10px;
    font-size: var(--font-size-s);
  }
`;

export const Group = styled.div`
  margin: 0px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: var(--gap-9xs);
  white-space: nowrap;
`;

export const GroupDiv = styled.div`
  width: 767px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-3xs);
  box-sizing: border-box;
  max-width: 100%;
  padding: 5px 10px;
  margin-bottom: 5px;
`;

export const TextBox = styled.div`
  padding: 5px;
  border: none;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  height: 40px;
  line-height: 30px;
  background-color: var(--color-blue-vivid);
  width: 80px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 376px) {
    width: 50px;
    height: 30px;
    line-height: 20px;
    font-size: 10px;
    font-weight: bold;
  }
`;

export const Schedule = styled.div`
  font-weight: bold;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  height: 40px;
  line-height: 40px;
  flex: 1;
  border-radius: var(--br-8xs);
  box-sizing: border-box;
  overflow: hidden;
  min-width: 374px;
  max-width: 100%;
 @media screen and (max-width: 376px) {
    min-width: 210px;
    height: 30px;
    line-height: 30px;
    font-size: var(--font-size-s);
  }
`;

export const RequiredBox = styled.div`
  font-weight: bold;
  height: 256px;
  width: 100%;
  padding: 20px;
  text-align: left;
  box-sizing: border-box;
  font-size: var(--font-size-m);
  background-color: aliceblue;
  border-radius: 15px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  overflow: auto;
  @media screen and (max-width: 376px) {
    width: 300px;
    height: 130px;
    font-size: var(--font-size-s);
  }
`;

export const GroupRoot = styled.div`
  margin: 0px;
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  gap: var(--gap-base);
  @media screen and (max-width: 675px) {
    gap: var(--gap-base);
    box-sizing: border-box;
  }
`;