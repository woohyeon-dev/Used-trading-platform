import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BoardHeader, BoardList, Pagination } from '../components';
import callApi from '../utils/callApi';

const BoardBlock = styled.div`
  padding: 40px 20px;
`;

function Board() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // 전체 게시물 개수
  const totalPostCnt = posts.length;

  const goBoard = useCallback(e => {
    return callApi('get', '/board', {}, setPosts);
  }, []);

  useEffect(() => {
    goBoard();
  }, [goBoard]);

  const handleSearch = useCallback(e => {
    return callApi('get', '/board/search', { params: e }, setPosts);
  }, []);

  return (
    <BoardBlock>
      <BoardHeader handleSearch={handleSearch} goBoard={goBoard} />
      <BoardList posts={posts} currentPage={currentPage} />
      <Pagination
        totalPostCnt={totalPostCnt}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </BoardBlock>
  );
}

export default Board;
