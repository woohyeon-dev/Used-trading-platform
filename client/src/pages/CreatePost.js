import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import callApi from '../utils/callApi';

const CreatePostBlock = styled.div`
  width: 1024px;
  display: flex;
  flex-direction: column;
  padding: 30px 30px 70px 30px;
  font-size: 20px;

  .pageTitle {
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    height: 100px;
    line-height: 100px;
    border-bottom: 2px solid black;
  }

  .inputBox {
    height: 50px;
    display: flex;
    margin-top: 40px;
    padding: 0 20px;
  }

  .inputTitle {
    width: 170px;
    font-size: 22px;
    line-height: 50px;
  }

  input {
    font-family: 'GyeonggiBatang';
    width: 754px;
    font-size: 16px;
    padding: 17px;
    border: 1px solid lightgrey;
    border-radius: 3px;

    &:hover,
    &:focus {
      outline: 1px solid black;
    }
  }

  .charCnt {
    padding: 10px 25px 10px 10px;
    height: 60px;
    text-align: right;
    border-bottom: 1px solid lightgrey;
  }

  .textareaBox {
    display: flex;
    margin-top: 40px;
    padding: 0 20px;
  }

  textarea {
    font-family: 'GyeonggiBatang';
    width: 754px;
    height: 350px;
    font-size: 16px;
    line-height: 30px;
    padding: 15px;
    resize: none;
    border: 1px solid lightgrey;
    border-radius: 3px;

    &:hover,
    &:focus {
      outline: 1px solid black;
    }
  }

  .CreatePostBtnGroup {
    display: flex;
    justify-content: right;
    padding-right: 20px;
  }

  button {
    font-family: 'GyeonggiBatang';
    padding: 12px;
    font-size: 18px;
    background-color: white;
    font-weight: bold;
    margin-top: 40px;

    &:hover {
      cursor: pointer;
    }
  }

  .backToList {
    text-decoration: none;
    color: black;
  }

  .writeBtn {
    background-color: green;
    color: white;
    margin-left: 20px;
  }
`;

function CreatePost() {
  //url 이동을 위한 useNavigate
  const navigate = useNavigate();

  const { loggedIn } = useContext(Context);
  const [inputs, setInputs] = useState({
    title: '',
    content: '',
  });
  const [titleCnt, setTitleCnt] = useState(0);
  const [contentCnt, setContentCnt] = useState(0);

  const { title, content } = inputs;

  const handleInputs = e => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!loggedIn) {
      alert('로그인 후 이용해주세요');
      navigate('/login');
    }
    callApi('post', '/board/create', inputs);
    navigate('/board'); //성공하면 해당 url로 이동
  };

  useEffect(() => {
    setTitleCnt(title.length);
  }, [title]);

  useEffect(() => {
    setContentCnt(content.length);
  }, [content]);

  return (
    <CreatePostBlock>
      <form onSubmit={handleSubmit}>
        <div className='pageTitle'>자유게시판 게시글 작성</div>
        <div className='inputBox'>
          <div className='inputTitle'>제목</div>
          <input
            type='text'
            name='title'
            value={title}
            onChange={handleInputs}
            placeholder='게시글 제목을 입력해주세요'
          />
        </div>
        <div className='charCnt'>{titleCnt}/40</div>

        <div className='textareaBox'>
          <div className='inputTitle'>내용</div>
          <textarea
            name='content'
            placeholder='게시글 내용을 입력해주세요'
            value={content}
            onChange={handleInputs}
          />
        </div>
        <div className='charCnt'>{contentCnt}/100</div>

        <div className='CreatePostBtnGroup'>
          <button>
            <NavLink to='/board' className='backToList'>
              목록으로
            </NavLink>
          </button>
          <button className='writeBtn' type='submit'>
            작성하기
          </button>
        </div>
      </form>
    </CreatePostBlock>
  );
}

export default CreatePost;
