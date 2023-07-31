import styled from "styled-components";

export const Title = styled.h1`
  font-size: 3.5rem;
  text-align: center;
  color: #cd4f32;
`;

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  min-height: 101vh;
  margin-top: 5rem;
  justify-content: flex-start;
  align-items: center;
  z-index: 2;
`;

export const BXX = styled.div`
  border-radius: 2px;
  box-shadow: 0 3rem 5rem rgba(0, 0, 0, 0.2);
  width: 50rem;
  min-height: 10vh;
  background: ${(props) => props.theme.secondary};
`;
