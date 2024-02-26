import styled from 'styled-components';
// styled.View``;
export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 20px;
`;

export const Card = styled.View`
  background-color: #eeeeee;
  width: 100%;
  margin-bottom: 10%;
  border-radius: 20px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  padding: 15px;
`;

export const UserImg = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const UserInfoText = styled.View`
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`;

export const UserName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  font-family: 'Courier New';
  color: black;
`;

export const PostTime = styled.Text`
  font-size: 12px;
  font-family: 'Courier New';
  color: #ea9215;
`;

export const PostText = styled.Text`
  font-size: 14px;
  font-family: 'Courier New';
  color: black;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
`;

export const PostTextRes = styled.Text`
  font-size: 14px;
  font-family: 'Courier New';
  color: black;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 10px;
  padding-top: 10px;
`;

export const TxtRespReporte = styled.View`
  border-radius: 15px;
  justify-content: center;
  /* margin-left: 50%; */
  width: 90%;
  /* height: 7%; */
  margin-bottom: 5%;
  align-items: center;
  align-self: center;
  background-color: #379237;
  margin-top: 5%;
  
`;

export const Divider = styled.View`
  border-bottom-color: #dddddd;
  border-bottom-width: 1px;
  width: 92%;
  align-self: center;
`;

export const DividerResp = styled.View`
  border-bottom-color: #61677a;
  border-bottom-width: 1px;
  width: 92%;
  align-self: center;
  height: 2px;
  margin: 5px 10px 0px 0px;
`;

export const BtnStatus = styled.View`
  border-radius: 15px;
  justify-content: center;
  margin-left: 50%;
  margin-right: 5%;
  width: 40%;
  margin-bottom: 5%;
  align-items: center;
  align-self: center;
`;

export const TxtStatus = styled.Text`
  font-size: 14px;
  font-family: 'Courier New';
  /* text-align: center;
  justify-content: center;
  align-content: center; */
  color: white;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 10px;
  /* padding-top: 10px; */
`;

export const PostImg = styled.Image`
  width: 100%;
  height: 250px;
  margin-top: 5px;
  border-radius: 20px;
`;

export const PostImgResp = styled.Image`
  width: 100%;
  height: 250px;
  margin-top: 5px;
  border-radius: 20px;
  /* margin-bottom: 10px; */
`;

export const InteractionWrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 15px;
`;

export const Interaction = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  border-radius: 5px;
  padding: 2px 5px;
  background-color: ${props => (props.active ? '#000000' : 'transparent')};
`;

/* export const InteractionText = styled.Text`
    font-size: 12px;
    font-family: 'Lato-Regular';
    font-weight: bold;
    color: ${props => props.active ? '#2e64e5' : '#333'};
    margin-top: 5px;
    margin-left: 5px;
`; */
