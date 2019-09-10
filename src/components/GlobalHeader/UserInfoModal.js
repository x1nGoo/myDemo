import React from 'react';
import { Modal, Button } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import styles from './index.less';

const { Description } = DescriptionList;

// 个人信息模态框
const UserInfoModal = ({ userInfoVisible, onCancel, userInfoData }) => (
  <Modal
    key="user"
    wrapClassName={styles.normalModal}
    title="个人信息"
    visible={userInfoVisible}
    onCancel={(e) => onCancel(e, 'userInfoVisible')}
    footer={[
      <Button type="primary" onClick={(e) => onCancel(e, 'userInfoVisible')}>
        确定
      </Button>
    ]}
  >
    <DescriptionList col={1} style={{ marginBottom: 12 }}>
      <Description term="账号">{userInfoData.account}</Description>
      <Description term="用户名">{userInfoData.name}</Description>
      <Description term="角色">{userInfoData.role}</Description>
    </DescriptionList>
  </Modal>
);

export default UserInfoModal;
