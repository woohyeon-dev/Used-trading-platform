import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import axios from 'axios';

const LoginBlock = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f3f5;

  .loginForm {
    width: 440px;
    display: flex;
    height: 450px;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: white;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.17);
  }

  .loginLogo {
    margin-top: 20px;
    width: 360px;
    height: 80px;
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

  .loginInputBox {
    display: flex;
    flex-direction: column;
    margin: 20px 0 28px 0;
  }

  .loginInput {
    width: 360px;
    height: 50px;
    margin-bottom: 24px;
    padding: 14px;
    border: 1px solid #dfdfde;
    background-color: #f8f9fa;
    font-size: 16px;
    font-family: 'GyeonggiBatang';

    &:focus {
      outline: none;
    }
  }

  .loginBtn {
    width: 360px;
    height: 50px;
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

  .registerBox {
    width: 360px;
    height: 70px;
    border-top: 2px solid #dfdfde;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .registerLink {
    text-decoration: none;
    color: green;
    font-weight: bold;
  }
`;

function Login() {
  // 글로벌 전역 상태값 setLoggedIn, setLoggedUser를 받아옴
  const { setLoggedIn, setLoggedUser } = useContext(Context);

  // url 이동을 위한 useNavigate
  const navigate = useNavigate();

  // input에서 입력한 아이디와 비밀번호 정보를 담기위한 state
  const [loginInfo, setLoginInfo] = useState({
    user_id: '',
    password: '',
  });
  const { user_id, password } = loginInfo;

  // input에 입력하면 자동적으로 loginInfo state값 변경
  const handleChange = e => {
    const { name, value } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setLoginInfo({
      ...loginInfo,
      [name]: value, // input에 지정한 네임 속성에 해당 value 값을 넣어 오버라이딩
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const callApi = async e => {
      try {
        const res1 = await axios.post(
          `${process.env.REACT_APP_URL}/auth/login`,
          loginInfo,
          { withCredentials: true }
        );
        alert(res1.data);
        setLoggedIn(true);

        const res2 = await axios.get(`${process.env.REACT_APP_URL}/auth/user`, {
          withCredentials: true,
        });
        setLoggedUser(res2.data);
        navigate('/');
      } catch (err) {
        alert(err.response.data);
      }
    };
    callApi();
  };

  return (
    <LoginBlock>
      <form className='loginForm' onSubmit={handleSubmit}>
        <NavLink to='/' className='loginLogo'>
          영숙마켓
        </NavLink>
        <div className='loginInputBox'>
          <input
            className='loginInput'
            type='text'
            placeholder='아이디'
            name='user_id'
            value={user_id}
            onChange={handleChange}
            required
          />
          <input
            className='loginInput'
            type='password'
            placeholder='비밀번호'
            name='password'
            value={password}
            onChange={handleChange}
            required
          />
          <button className='loginBtn' type='submit'>
            로그인
          </button>
        </div>
        <div className='registerBox'>
          계정이 없으신가요?&nbsp;&nbsp;
          <NavLink className='registerLink' to='/register'>
            가입하기
          </NavLink>
        </div>
      </form>
    </LoginBlock>
  );
}

export default Login;
