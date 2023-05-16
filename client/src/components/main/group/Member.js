import React from 'react';
import styled from 'styled-components';
import { MemberCreate } from '../..';
import callApi from '../../../utils/callApi';

const MemberBlock = styled.div`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: repeat(3, 1fr);
`;

const MemberBox = styled.div`
  height: 412px;
  padding: 10px;
  border: 1px solid black;
  position: relative;
  margin-bottom: 10px;

  .memberImgBox {
    position: absolute;
    z-index: 9;
    width: 300.66px;
    height: 340px;

    &:hover {
      transition: 0.7s ease-in-out;
      z-index: 1;
      filter: brightness(30%);
    }
  }

  .memberImg {
    width: 300.66px;
    height: 340px;
    outline: 1px solid black;
  }

  .memberInfoBox {
    position: absolute;
    z-index: 5;
    font-size: 17px;
    padding: 20px;
    color: white;
  }

  .memberName {
    font-weight: bold;
    font-size: 25px;
    line-height: 55px;
  }

  .memberInfo {
    margin-bottom: 3px;
    line-height: 30px;
  }

  .buttonBox {
    margin-top: 350px;
    width: 300.66px;
    height: 40px;
    display: flex;
    justify-content: right;
  }

  .memberBtn {
    width: 45px;
    height: 40px;
    line-height: 40px;
    border: 1px solid black;
    text-align: center;

    &:hover {
      cursor: pointer;
    }
  }

  .updateBtn {
    background-color: #dfdfde;
  }

  .deleteBtn {
    margin-left: 10px;
    background-color: #ff5050;
  }
`;

function Member({ members, setVisible, setSelectId }) {
  const handelDeleteMember = e => {
    const { mb_id, image } = members[e.target.id];
    callApi('delete', '/group/delete', { params: { mb_id, image } });
  };
  return (
    <MemberBlock>
      {members.length > 0 &&
        members.map((member, index) => (
          <MemberBox key={index} member={member}>
            <div className='memberImgBox'>
              <img
                alt=''
                src={process.env.REACT_APP_IMAGE_URL + member.image}
                className='memberImg'
                onContextMenu={e => e.preventDefault()}
              />
            </div>
            <div className='memberInfoBox'>
              <div className='memberName'>{member.name}</div>
              <div className='memberInfo'>
                Mobile.{' '}
                {member.mb_tell.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')}
              </div>
              <div className='memberInfo'>{member.introduction}</div>
            </div>
            <div className='buttonBox'>
              <div
                className='memberBtn updateBtn'
                id={member.mb_id}
                onClick={e => {
                  setSelectId(e.target.id);
                  setVisible();
                }}
              >
                수정
              </div>
              <div
                className='memberBtn deleteBtn'
                id={index}
                onClick={handelDeleteMember}
              >
                삭제
              </div>
            </div>
          </MemberBox>
        ))}
      <MemberCreate />
    </MemberBlock>
  );
}

export default Member;
