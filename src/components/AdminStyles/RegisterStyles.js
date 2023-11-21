import styled from "styled-components";

export const Container = styled.div`
  width: 1150px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #f4f4f4;
  font-size: 16px;
`;

export const FormField = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const Label = styled.label`
  width: 150px;
  text-align: right;
  margin-right: 10px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 8px;
  font-size: 16px;
`;

export const TextArea = styled.textarea`
  flex: 1;
  padding: 8px;
  font-size: 16px;
`;

export const Button = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  background-color: grey;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: black;
  }
`;
