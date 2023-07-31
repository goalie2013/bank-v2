import styled from "styled-components";

export const FormWrapperStyle = styled.div`
  background: ${(props) => props.theme.secondary};
  border-radius: 20px;
  box-shadow: 0 3rem 5rem rgba(0, 0, 0, 0.2)";
  margin-top: 2.5rem;
  width: 25rem;
`;

export const FormHeader = styled.div`
  text-align: center;
  background: ${(props) => props.theme.main};
  color: ${(props) => props.theme.secondary};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  font-size: 1.75rem;
  padding: 1rem;
  overflow-wrap: break-word;
`;

export const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

export const FormStatusText = styled.div`
  margin-top: 0.5rem;
  text-align: center;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.3);
`;

// export const Input = ({ type }) => {
//   return <input type={type} name="" id="" />;
// };
