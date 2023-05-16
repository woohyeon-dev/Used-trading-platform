import React, { memo, useRef, useState } from 'react';
import styled from 'styled-components';
import callApi from '../../../utils/callApi';

const MemberCreateBlock = styled.div`
  .createForm {
    width: auto;
    height: 370px;
    border: 1px solid black;
    padding: 9px;
    background-color: #dfdfde;
  }

  .formTitle {
    width: 90px;
    height: 40px;
    margin-bottom: 10px;
    border-bottom: 2px solid black;
    text-align: center;
    line-height: 40px;
    font-size: 22px;
  }

  .imageUploadBox {
    display: flex;
    margin-bottom: 10px;
  }

  .imageName {
    width: 100%;
    padding: 7px;
    border: 1px solid black;
    height: 35px;
    line-height: 35px;
    background-color: white;
    font-size: 15px;
    font-family: 'GyeonggiBatang';
  }

  .imageUploadBtn {
    width: 100px;
    height: 35px;
    text-align: center;
    line-height: 35px;
    border: 1px solid black;
    background-color: #495057;
    margin: 0 10px;
    color: white;

    &:hover {
      cursor: pointer;
    }
  }

  .cancelBtn {
    width: 80px;
    height: 35px;
    text-align: center;
    line-height: 35px;
    border: 1px solid black;
    color: white;
    background-color: #ff5050;

    &:hover {
      cursor: pointer;
    }
  }

  .infoInput {
    font-family: 'GyeonggiBatang';
    font-size: 15px;
    border: 1px solid black;
    width: 100%;
    height: 35px;
    margin-bottom: 10px;
    padding: 7px;
  }

  textarea {
    display: block;
    resize: none;
    padding: 7px;
    border: 1px solid black;
    width: 100%;
    height: 115px;
    font-family: 'GyeonggiBatang';
    font-size: 15px;
    margin-bottom: 10px;
  }

  .submitBtn {
    width: 80px;
    height: 40px;
    background-color: #4aa02c;
    color: white;
    font-size: 15px;
    border: 1px solid black;
    margin-left: 222px;

    &:hover {
      cursor: pointer;
    }
  }
`;

function MemberCreate() {
  const imageInput = useRef();
  const [memberInfo, setMemberInfo] = useState({
    name: '',
    mb_tell: '',
    introduction: '',
  });
  const [image, setImage] = useState({
    image: '',
    preview: '',
  });
  const { name, mb_tell, introduction } = memberInfo;

  const handleImageInput = e => {
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        image: e.target.files[0],
        preview: e.target.files[0].name,
      });
    };
  };

  const onClickImageUpload = e => {
    imageInput.current.click();
  };

  const handleChange = e => {
    const { value, name } = e.target;
    setMemberInfo({
      ...memberInfo,
      [name]: value,
    });
  };

  const handleTellInput = e => {
    const regex = /^[0-9\b]{0,11}$/;
    if (regex.test(e.target.value)) {
      setMemberInfo({
        ...memberInfo,
        mb_tell: e.target.value,
      });
    }
  };

  const handleUploadCancel = e => {
    setImage({
      ...image,
      preview: '',
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('mb_tell', mb_tell);
    formData.append('introduction', introduction);
    formData.append('image', image.image);
    callApi('post', '/group/create', formData);
  };

  return (
    <MemberCreateBlock>
      <form
        className='createForm'
        onSubmit={handleSubmit}
        encType='multipart/form-data'
      >
        <div className='formTitle'>등록정보</div>
        <input
          type='text'
          name='name'
          className='infoInput'
          placeholder='이름'
          value={name}
          onChange={handleChange}
          required
        />
        <input
          type='file'
          style={{ display: 'none' }}
          ref={imageInput}
          accept='image/*'
          required
          onChange={handleImageInput}
        />
        <div className='imageUploadBox'>
          <input
            className='imageName'
            placeholder='파일명'
            value={image.preview}
            disabled
          />
          <div className='imageUploadBtn' onClick={onClickImageUpload}>
            업로드
          </div>
          <div className='cancelBtn' onClick={handleUploadCancel}>
            취소
          </div>
        </div>
        <input
          type='text'
          placeholder='전화번호'
          name='mb_tell'
          className='infoInput'
          value={mb_tell}
          onChange={handleTellInput}
          required
        />
        <textarea
          name='introduction'
          placeholder='자기소개글'
          value={introduction}
          onChange={handleChange}
          required
        />
        <button className='submitBtn' type='submit'>
          조원추가
        </button>
      </form>
    </MemberCreateBlock>
  );
}

export default memo(MemberCreate);
