import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import PAGE_PER from '../../utils/pagePer';

const PaginationBlk = styled.div`
  width: auto;
  margin-top: 30px;
  display: flex;
  justify-content: center;

  .pageButton {
    border: 1px solid black;
    padding: 8px 9px;
    margin: 0 5px;
    font-size: 16px;

    &:hover {
      background-color: #dfdfde;
      transform: scale(0.98);
      outline: none;
      cursor: pointer;
    }
  }

  .angleBracket {
    padding: 8px;
  }
`;

function Pagination({ totalPostCnt, currentPage, setCurrentPage }) {
  const [currentGroup, setCurrentGroup] = useState(0);
  // 페이지 번호 그룹 크기
  const pageGroupSize = 10;

  // 한 페이지에 10개의 게시물씩 전체 페이지 개수
  let totalPageCnt = Math.ceil(totalPostCnt / PAGE_PER);

  // pages에 모든 페이지를 저장
  let pages = [];
  for (let i = 1; i <= totalPageCnt; i++) {
    pages.push(i);
  }

  // 10페이지씩 나누어서 pageArr에 저장
  let pageArr = [];
  for (let i = 0; i < pages.length; i += pageGroupSize) {
    pageArr.push(pages.slice(i, i + pageGroupSize));
  }

  useEffect(() => {
    setCurrentGroup(Math.floor((currentPage - 1) / pageGroupSize));
  }, [currentPage]);

  return (
    <PaginationBlk>
      <div
        className='pageButton angleBracket'
        onClick={() => {
          if (currentGroup !== 0) {
            setCurrentGroup(currentGroup - 1);
          }
        }}
      >
        &lt;
      </div>
      {pageArr.length > 0 &&
        pageArr[currentGroup].map(num => (
          <div
            key={num}
            className={`pageButton`}
            onClick={() => {
              setCurrentPage(num);
            }}
          >
            {num}
          </div>
        ))}
      <div
        className='pageButton angleBracket'
        onClick={() => {
          if (currentGroup !== pageArr.length - 1) {
            setCurrentGroup(currentGroup + 1);
          }
        }}
      >
        &gt;
      </div>
    </PaginationBlk>
  );
}

export default memo(Pagination);
