import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const LoginContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin: auto;
padding: 20px;
width:25%;
height:50%;
border: 2px solid black; /* Add border to the container */
background-color: white; /* Set the background color */
width: 30%;
`;

export const LoginForm = styled.form`
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 5px;
  width: 400px;
  text-align: center;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export const Button = styled.button`
  padding: 10px 15px;
  background-color: black;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
