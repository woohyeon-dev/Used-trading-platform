import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import NextPageInput from '../components/register/NextPageInput';
import PrevPageInput from '../components/register/PrevPageInput';
import callApi from '../utils/callApi';

const RegisterBlock = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f3f5;

  .registerForm {
    width: 440px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: white;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.17);
  }

  .registerLogo {
    margin-top: 40px;
    width: 260px;
    height: 80px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    font-weight: bold;
    font-family: 'YES24';
    color: green;
    text-decoration: none;

    &:hover {
      cursor: pointer;
    }
  }
`;

function Register() {
  //url 이동을 위한 useNavigate
  const navigate = useNavigate();
  // 가입정보 input 값 관리
  const [registerInfo, setRegisterInfo] = useState({
    user_id: '',
    password: '',
    nickname: '',
    name: '',
    addr: '',
    phone_num: '',
  });
  const { nickname, name, phone_num } = registerInfo;
  // 회원가입 다음 페이지 관리
  const [isNextPage, setIsNextPage] = useState(false);

  //input에 입력하면 자동적으로 registerInfo state값 변경
  const handleChange = e => {
    const { name, value } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setRegisterInfo({
      ...registerInfo,
      [name]: value, // input에 지정한 네임 속성에 해당 value 값을 넣어 오버라이딩
    });
  };

  const handlePage = e => {
    if (isNextPage) {
      setIsNextPage(false);
    } else {
      setIsNextPage(true);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (name.length !== 0 && nickname.length !== 0 && phone_num.length !== 0) {
      callApi('post', '/auth/register', registerInfo);
      navigate('/');
    }
  };

  return (
    <RegisterBlock>
      <form className='registerForm' onSubmit={handleSubmit}>
        <NavLink to='/' className='registerLogo'>
          영숙마켓
        </NavLink>
        {isNextPage ? (
          <NextPageInput
            registerInfo={registerInfo}
            handleChange={e => {
              handleChange(e);
            }}
            handlePage={e => {
              handlePage(e);
            }}
          />
        ) : (
          <PrevPageInput
            registerInfo={registerInfo}
            handleChange={e => {
              handleChange(e);
            }}
            handlePage={e => {
              handlePage(e);
            }}
          />
        )}
      </form>
    </RegisterBlock>
  );
}

export default Register;
