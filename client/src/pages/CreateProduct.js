import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import defaultImage from '../image/default.png';
import callApi from '../utils/callApi';
import CATEGORIES from '../utils/categories';

const CreateProductBlock = styled.div`
  width: 1024px;
  padding: 30px 30px 70px 30px;
  font-size: 20px;

  .pageTitle {
    font-size: 30px;
    line-height: 100px;
    font-weight: bold;
    text-align: center;
    border-bottom: 2px solid black;
  }

  .inputBox {
    display: flex;
    margin-top: 40px;
    padding: 0 20px;
  }

  .inputTitle {
    font-size: 22px;
    width: 170px;
    line-height: 50px;
  }

  input {
    width: 704px;
    padding: 17px;
    font-size: 16px;
    font-family: 'GyeonggiBatang';
    border: 1px solid lightgrey;
    border-radius: 3px;

    &:hover,
    &:focus {
      outline: 1px solid black;
    }
  }

  .titleCharCnt {
    width: 50px;
    text-align: right;
    line-height: 51px;
    height: 50px;
  }

  .bottomLine {
    height: 40px;
    border-bottom: 1px solid lightgrey;
  }

  .imageUpload {
    width: 181px;
    height: 180px;
    border: 1px solid lightgrey;
    border-radius: 3px;

    &:hover,
    &:focus {
      outline: 1px solid black;
    }
  }

  .imgPreview {
    width: 181px;
    height: 180px;
    margin-left: 10px;
    border: 1px solid lightgrey;
    border-radius: 3px;
  }

  select {
    font-family: 'GyeonggiBatang';
    border: 1px solid lightgrey;
    color: grey;
    border-radius: 3px;
    width: 150px;
    padding: 10px;
    font-size: 16px;

    &:hover,
    &:focus {
      outline: 1px solid black;
    }
  }

  .textareaBox {
    display: flex;
    margin-top: 40px;
  }

  .priceInput {
    width: 250px;
  }

  .won {
    width: 34px;
    text-align: right;
    font-size: 20px;
    line-height: 50px;
  }

  textarea {
    font-family: 'GyeonggiBatang';
    font-size: 16px;
    width: 754px;
    height: 250px;
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

  .descriptCharCnt {
    text-align: right;
    padding: 10px 22px 0 0;
  }

  .writePostBtnGroup {
    display: flex;
    justify-content: right;
    padding: 0 20px;
  }

  button {
    font-family: 'GyeonggiBatang';
    padding: 12px;
    font-size: 18px;
    background-color: white;
    font-weight: bold;
    margin-top: 30px;

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
    margin-left: 30px;
  }
`;

function CreateProduct() {
  //url 이동을 위한 useNavigate
  const navigate = useNavigate();
  const imageInput = useRef();
  const [postInfo, setPostInfo] = useState({
    title: '',
    cat_id: '1',
    price: '',
    descript: '',
  });
  const [image, setImage] = useState({
    image_file: '', // 서버에 보낼 실제 이미지 파일
    preview_URL: '', // 클라이언트에게 미리 보여줄 이미지의 경로
  });
  const [titleCnt, setTitleCnt] = useState(0);
  const [descriptCnt, setDescriptCnt] = useState(0);

  const { title, descript, cat_id, price } = postInfo;

  // input에 입력하면 자동적으로 setPostInfo값 변경
  const handleInputs = e => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    if (value.length > 40 && name === 'title') {
      return;
    } else if (value.length > 100 && name === 'descript') {
      return;
    }
    setPostInfo({
      ...postInfo, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  useEffect(() => {
    setTitleCnt(title.length);
  }, [title]);

  useEffect(() => {
    setDescriptCnt(descript.length);
  }, [descript]);

  const onClickImageUpload = () => {
    imageInput.current.click();
  };

  const onChangeImageInput = e => {
    // file을 비동기로 읽기 위한 FileReader 객체를 생성
    const fileReader = new FileReader();

    // 이미지를 업로드하고 삭제버튼을 클릭하지 않은 후에 업로드 버튼을 클릭하고 취소 버튼을 클릭하면 발생하는 오류를 방지하기 위한 조건문
    if (e.target.files[0]) {
      // readAsDataURL은 비동기로 실행
      fileReader.readAsDataURL(e.target.files[0]);
    }

    // onload 함수는 FileReader가 이미지를 잘 인코딩하고 난 후의 결과를 처리하는 함수
    fileReader.onload = () => {
      setImage({
        image_file: e.target.files[0],
        preview_URL: fileReader.result,
      });
    };
  };

  const handleSubmit = e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('descript', descript);
      formData.append('cat_id', cat_id);
      formData.append('price', price);
      formData.append('image', image.image_file);
      callApi('post', '/market/create', formData);
      //성공하면 해당 url로 이동
      navigate('/market');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CreateProductBlock>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div className='pageTitle'> 상품 판매 게시글 작성</div>
        <div className='inputBox'>
          <div className='inputTitle'>제목</div>
          <input
            type='text'
            name='title'
            value={title}
            onChange={handleInputs}
            placeholder='상품 제목을 입력해주세요'
          />
          <div className='titleCharCnt'>{titleCnt}/40</div>
        </div>
        <div className='bottomLine'></div>

        {/* 이미지 */}
        <div className='inputBox'>
          <div className='inputTitle'>이미지</div>
          <input
            type='file'
            style={{ display: 'none' }}
            ref={imageInput}
            accept='image/*'
            required
            onChange={onChangeImageInput}
          />
          <div>
            <img
              alt=''
              src={defaultImage}
              className='imageUpload'
              onClick={onClickImageUpload}
            ></img>
          </div>
          {image.preview_URL !== '' ? (
            <img alt='' src={image.preview_URL} className='imgPreview'></img>
          ) : null}
        </div>
        <div className='bottomLine'></div>

        {/* 카테고리 */}
        <div className='inputBox'>
          <div className='inputTitle'>카테고리</div>
          <select name='cat_id' onChange={handleInputs}>
            {CATEGORIES.map((category, index) => (
              <option value={index + 1} key={index}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className='bottomLine'></div>

        <div className='inputBox'>
          <div className='inputTitle'>가격</div>
          <input
            className='priceInput'
            type='number'
            name='price'
            value={price}
            onChange={handleInputs}
            placeholder='숫자만 입력해주세요'
          />
          <div className='won'>원</div>
        </div>
        <div className='bottomLine'></div>

        <div className='inputBox'>
          <div className='inputTitle'>설명</div>
          <textarea
            name='descript'
            placeholder='상품 설명을 입력해주세요'
            value={descript}
            onChange={handleInputs}
          />
        </div>
        <div className='descriptCharCnt'>{descriptCnt}/100</div>
        <div className='bottomLine'></div>

        <div className='writePostBtnGroup'>
          <button>
            <NavLink to='/market' className='backToList'>
              목록으로
            </NavLink>
          </button>
          <button className='writeBtn' type='submit'>
            작성하기
          </button>
        </div>
      </form>
    </CreateProductBlock>
  );
}

export default CreateProduct;
