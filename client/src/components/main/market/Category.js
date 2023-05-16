import React, { memo } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const CategoryBlock = styled.div`
  height: 100px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;

  .categoryBtn {
    border: 1px solid black;
    text-align: center;
    line-height: 45px;
    color: black;
    text-decoration: none;

    &:hover {
      cursor: pointer;
      font-weight: bold;
    }
  }

  .active {
    font-weight: bold;
  }
`;

function Category({ CATEGORIES }) {
  return (
    <CategoryBlock>
      <NavLink to='/market' key={0} className='categoryBtn'>
        {'전체보기'}
      </NavLink>
      {CATEGORIES.map((category, index) => (
        <NavLink
          to={`/market/categories/${index + 1}`}
          key={index}
          className='categoryBtn'
        >
          {category}
        </NavLink>
      ))}
    </CategoryBlock>
  );
}

export default memo(Category);
