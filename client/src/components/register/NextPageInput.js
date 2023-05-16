import React, { useState } from 'react';
import styled from 'styled-components';

const NextPageInputBlock = styled.div`
  display: flex;
  flex-direction: column;

  .nextInputs {
    width: 350px;
    height: 50px;
    margin: 10px 0px;
    padding: 10px;
    border: 1px solid #dfdfde;
    background-color: #f8f9fa;
    font-size: 16px;
    font-family: 'GyeonggiBatang';

    &:focus {
      outline: none;
    }
  }

  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .message {
    padding: 0 11px;
    margin-bottom: 6px;
    font-size: 13px;
  }

  .registerBtn {
    width: 350px;
    height: 50px;
    margin-top: 14px;
    background-color: green;
    color: white;
    border: none;
    font-size: 18px;
    font-weight: bold;
    font-family: 'GyeonggiBatang';

    &:hover {
      cursor: pointer;
    }
  }

  .prevBtn {
    width: 350px;
    height: 50px;
    margin-top: 20px;
    margin-bottom: 50px;
    background-color: #eeeeee;
    color: #bababa;
    font-size: 18px;
    font-weight: bold;
    line-height: 50px;
    text-align: center;
  }
`;

function NextPageInput({ registerInfo, handleChange, handlePage }) {
  const { nickname, name, addr, phone_num } = registerInfo;
  const [isName, setIsName] = useState(false);
  const [isNickname, setIsNickname] = useState(false);
  const [isPhoneNum, setIsPhoneNum] = useState(false);

  const handleTellInput = e => {
    const regex = /^[0-9\b]{0,11}$/;
    if (regex.test(e.target.value)) {
      handleChange(e);
    }
    if (e.target.value.length !== 0) {
      setIsPhoneNum(true);
    } else {
      setIsPhoneNum(false);
    }
  };

  return (
    <NextPageInputBlock>
      <input
        className='nextInputs'
        type='text'
        placeholder='사용자 이름'
        name='name'
        value={name}
        onChange={e => {
          handleChange(e);
          if (e.target.value.length !== 0) {
            setIsName(true);
          } else {
            setIsName(false);
          }
        }}
      />
      {isName ? null : (
        <div className='message'>{'사용자 이름은 필수 입력 항목입니다.'}</div>
      )}
      <input
        className='nextInputs'
        type='text'
        placeholder='닉네임'
        name='nickname'
        value={nickname}
        onChange={e => {
          handleChange(e);
          if (e.target.value.length !== 0) {
            setIsNickname(true);
          } else {
            setIsNickname(false);
          }
        }}
        required
      />
      {isNickname ? null : (
        <div className='message'>{'닉네임은 필수 입력 항목입니다.'}</div>
      )}
      <input
        className='nextInputs'
        type='number'
        placeholder='기숙사 호수'
        name='addr'
        value={addr}
        onChange={e => {
          handleChange(e);
        }}
        required
      />
      <div className='message'>
        {'ex) 705호 -> 705, '}&nbsp;{'입주자가 아닐시 공란'}
      </div>
      <input
        className='nextInputs'
        type='tel'
        placeholder='전화번호'
        name='phone_num'
        value={phone_num}
        onChange={handleTellInput}
        required
      />
      {isPhoneNum ? null : (
        <div className='message'>{'전화번호는 필수 입력 항목입니다.'}</div>
      )}
      <button className='registerBtn' type='submit'>
        가입
      </button>
      <div className='prevBtn' onClick={handlePage}>
        이전
      </div>
    </NextPageInputBlock>
  );
}

export default NextPageInput;
