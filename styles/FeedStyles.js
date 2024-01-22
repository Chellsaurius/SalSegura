import styled from "styled-components";
// styled.View``;
export const Container = styled.View`
  flex: 1;
  /* justify-content: center; */
  align-items: center;
  background-color: #FFFFFF;
  padding: 20px;
`;

export const Card = styled.View`
  background-color: #EEEEEE;
  width: 100%;
  margin-bottom: 20px;
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
  color: #EA9215;
`;

export const PostText = styled.Text`
  font-size: 14px;
  font-family: 'Courier New';
  color: black;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
`;

export const Divider = styled.View`
  border-bottom-color: #DDDDDD;
  border-bottom-width: 1px;
  width: 92%;
  align-self: center;
`;

export const PostImg = styled.Image`
  width: 100%;
  height: 250px;
  margin-top: 5px;
  border-radius: 20px;
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
    background-color: ${props => props.active ? '#000000' : 'transparent'}
`;

/* export const InteractionText = styled.Text`
    font-size: 12px;
    font-family: 'Lato-Regular';
    font-weight: bold;
    color: ${props => props.active ? '#2e64e5' : '#333'};
    margin-top: 5px;
    margin-left: 5px;
`; */