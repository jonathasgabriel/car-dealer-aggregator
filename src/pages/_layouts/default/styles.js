import styled from 'styled-components';
import background from '~/assets/background.jpg';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(-90deg, #2980b9, #6dd5fa);
  overflow: auto;
`;

export const Header = styled.div`
  width: 100%;
  max-height: 200px;
  background-color: #000;
  background-image: url(${background});
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  overflow: auto;
`;
