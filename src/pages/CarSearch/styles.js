import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 35px;
    margin-top: 30px;
    list-style: none;
  }
`;

export const Filters = styled.div`
  height: 200px;
  width: 1200px;
  background: #7159c1;
  margin-top: 15px;
`;

export const CarItem = styled.li`
  padding: 20px;
  border-radius: 5px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 600px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 0;
  }

  img {
    max-height: 300px;
    max-width: 400px;
    border-radius: 8px;
    margin-top: 20px;
  }

  strong {
    margin-top: 10px;
    font-size: 24px;
    display: block;
  }

  span {
    margin-top: 10px;
    font-size: 16px;
    display: block;
  }

  a {
    margin-top: 10px;
    justify-self: baseline;
  }
`;
