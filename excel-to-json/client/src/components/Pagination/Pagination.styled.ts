import styled from 'styled-components';

export const PageSkipWrapper = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;

  button {
    width: 1.4em;
    height: 1.4em;
    background-color: transparent;
    border: none;
    fill: #00000050;
    cursor: pointer;

    transition: ease 200ms;

    &:hover {
      fill: red;
    }
  }

  .prev {
    transform: rotate(180deg);
  }

  .currentPage {
    margin: 0 1em;
  }
`;

export const PaginationWrapper = styled.div`
  ul {
    display: inline-block;
  }

  li {
    cursor: pointer;
    display: inline-block;
    margin: 0 0.4em;

    &:hover {
      color: red;
    }
  }
`;
