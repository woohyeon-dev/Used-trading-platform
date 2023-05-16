import React, { useState } from 'react';
import styled from 'styled-components';

const PrevPageInputBlock = styled.div`
  display: flex;
  flex-direction: column;

  .prevInputs {
    width: 350px;
    height: 50px;
    margin: 10px 0px;
    padding: 10px;
    border: 2px solid #dfdfde;
    background-color: #f8f9fa;
    font-size: 16px;
    font-family: 'GyeonggiBatang';

    &:focus {
      outline: none;
    }
  }

  .greenBorder {
    border-color: green;
  }

  .redBorder {
    border-color: red;
  }

  .message {
    padding: 0 11px;
    margin-bottom: 6px;
    font-size: 13px;
  }

  .error {
    color: red;
  }

  .success {
    color: green;
  }

  .nextBtn {
    width: 350px;
    height: 50px;
    margin-top: 15px;
    margin-bottom: 50px;
    background-color: #eeeeee;
    color: #bababa;
    font-size: 18px;
    font-weight: bold;
    line-height: 50px;
    text-align: center;

    &:hover {
      cursor: pointer;
    }
  }

  .able {
    background-color: green;
    color: white;
  }
`;

function PrevPageInput({ registerInfo, handleChange, handlePage }) {
  const { user_id, password } = registerInfo;
  // 비밀번호 확인 input 값 관리
  const [confirm, setConfirm] = useState('');
  // 비밀번호 확인결과
  const [isCorrect, setIsCorrect] = useState(false);
  const [isId, setIsId] = useState(true);
  const [isPassword, setIsPassword] = useState(true);

  const onChangeConfirm = e => {
    setConfirm(e.target.value);
    if (password === e.target.value) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <PrevPageInputBlock>
      <input
        className='prevInputs'
        type='text'
        placeholder='아이디'
        name='user_id'
        value={user_id}
        onChange={e => {
          handleChange(e);
          if (e.target.value.length !== 0) {
            setIsId(true);
          } else {
            setIsId(false);
          }
        }}
      />
      {isId ? null : (
        <div className='message'>{'아이디는 필수 입력 항목입니다.'}</div>
      )}
      <input
        className='prevInputs'
        type='password'
        placeholder='비밀번호'
        name='password'
        value={password}
        onChange={e => {
          handleChange(e);

          if (e.target.value.length !== 0) {
            setIsPassword(true);
          } else {
            setIsPassword(false);
          }

          if (confirm === e.target.value) {
            setIsCorrect(true);
          } else {
            setIsCorrect(false);
          }
        }}
      />
      {isPassword ? null : (
        <div className='message'>{'비밀번호는 필수 입력 항목입니다.'}</div>
      )}
      <input
        className={`prevInputs ${isCorrect ? 'greenBorder' : 'redBorder'}`}
        type='password'
        placeholder='비밀번호 확인'
        name='password_confirm'
        value={confirm}
        onChange={onChangeConfirm}
      />
      {isCorrect ? (
        <div className='message success'>{'비밀번호가 일치합니다.'}</div>
      ) : (
        <div className='message error'>{'비밀번호가 일치하지 않습니다.'}</div>
      )}
      <div
        className={`nextBtn ${
          isCorrect && user_id.length !== 0 && password.length !== 0
            ? 'able'
            : null
        }`}
        onClick={e => {
          if (isCorrect && user_id.length !== 0 && password.length !== 0) {
            handlePage(e);
          }
        }}
      >
        다음
      </div>
    </PrevPageInputBlock>
  );
}

export default PrevPageInput;
