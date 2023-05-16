import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Member, MemberUpdateModal } from '../components';
import callApi from '../utils/callApi';

const GroupBlock = styled.div`
  padding: 40px 20px;
`;

function Group() {
  const [members, setMembers] = useState({});
  const [visible, setVisible] = useState(false);
  const [selectId, setSelectId] = useState();

  useEffect(() => {
    callApi('get', '/group', {}, setMembers);
  }, []);

  return (
    <GroupBlock>
      <Member
        members={members}
        setSelectId={e => {
          setSelectId(e);
        }}
        setVisible={() => {
          setVisible(!visible);
        }}
      />
      {visible && (
        <MemberUpdateModal
          selectId={selectId}
          setVisible={() => {
            setVisible(!visible);
          }}
        />
      )}
    </GroupBlock>
  );
}

export default Group;
