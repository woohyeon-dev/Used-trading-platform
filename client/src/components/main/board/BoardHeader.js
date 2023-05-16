import React, { memo, useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Context from '../../../context/Context';

const BoardHeaderBlk = styled.div`
  width: auto;
  margin: 0 15px;
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;

  .boardTitle {
    font-size: 30px;
    font-weight: bold;
  }

  .boardBtnGroup {
    display: flex;
  }

  .searchPost {
    width: 300px;
    height: 40px;
    padding: 0 10px;
    font-family: 'GyeonggiBatang';
    font-size: 17px;
    border: 1px solid black;
  }

  .boardBtn {
    border: 1px solid black;
    text-align: center;
    width: 53px;
    font-size: 17px;
    line-height: 40px;
    margin-left: 15px;

    &:hover {
      background-color: #dfdfde;
      transform: scale(0.98);
      cursor: pointer;
    }
  }

  .boardWriteBtn {
    text-decoration: none;
    color: black;
  }
`;

function BoardHeader({ handleSearch, goBoard }) {
  const navigate = useNavigate();
  const { loggedIn } = useContext(Context);
  const [searchWord, setSearchWord] = useState({});

  const handleInput = e => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setSearchWord({
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleSearch(searchWord);
  };

  const handleCreateBtn = () => {
    if (loggedIn) {
      navigate('/board/create');
    } else {
      alert('로그인 후 이용가능합니다.');
      navigate('/login');
    }
  };

  return (
    <BoardHeaderBlk>
      <div className='boardTitle'>자유게시판</div>
      <div className='boardBtnGroup'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            className='searchPost'
            placeholder='제목을 입력하세요'
            name='query'
            onChange={handleInput}
          ></input>
        </form>
        <div
          className='searchBtn boardBtn'
          onClick={() => {
            handleSearch(searchWord);
          }}
        >
          검색
        </div>
        <div
          className='listBtn boardBtn'
          onClick={() => {
            goBoard();
          }}
        >
          목록
        </div>
        <div className='boardWriteBtn' onClick={handleCreateBtn}>
          <div className='boardBtn'>쓰기</div>
        </div>
      </div>
    </BoardHeaderBlk>
  );
}

export default memo(BoardHeader);
