import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1500px;
  margin: 20px;
  display: flex;
  flex-direction: row;

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 25px;
    margin-top: 30px;
    list-style: none;
  }
`;

export const SearchForm = styled.form`
  margin: 30px;
  padding: 15px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 800px;
  border-radius: 5px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    border-radius: 4px;
    background-color: #2980b9;
    color: #fff;
    font-family: Roboto;
    font-size: 14px;
  }
`;
export const FilterTitle = styled.strong`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 10px;
`;

export const Filters = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const Filter = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  height: 38px;
  padding: 10px;
`;

export const CarItem = styled.li`
  padding: 20px;
  border-radius: 5px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 320px;
  width: 450px;

  img {
    max-height: 200px;
    max-width: 200px;
    border-radius: 8px;
    margin-top: 10px;
  }

  strong {
    font-size: 16px;
    display: block;
  }

  span {
    margin-top: 10px;
    font-size: 16px;
  }

  a {
    margin-top: 10px;
    justify-self: baseline;
  }
`;

export const Title = styled.div``;

export const Content = styled.div`
  display: flex;

  span {
    display: block;
  }
`;

export const Description = styled.span`
  display: block;
  line-height: 1.3;
  white-space: pre-line;
  margin-left: 5px;
  overflow: auto;
`;

export const Price = styled.div``;
