import styled from "styled-components";
// styled.View``;
export const InputWrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #EEEEEE;
    color: black;
`;

export const InputField = styled.TextInput`
    justify-content: center;
    align-items: center;
    font-size: 24px;
    text-align: center;
    width: 90%;
    color: black;
    border-radius: 20px;
    border: 1px;
    margin-top: 20px;
    border-color: #3A4750;
`;

export const AddImage = styled.Image`
    width: 100%;
    height: 250px;
    margin-bottom: 15px;
    border-radius: 20px;
`;

export const StatusWrapper = styled.View`
    justify-content: center;
    align-items: center;
    color: #000000;
`;

export const SubmitBtn = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    margin-top: 15%;
    background-color: #EA9215;
    border-radius: 5px;
    padding: 10px 25px;
`;

export const SubmitBtnText = styled.Text`
    font-size: 18px;
    font-family: 'Lato-Bold';
    font-weight: bold;
    color: #EEEEEE;
`;