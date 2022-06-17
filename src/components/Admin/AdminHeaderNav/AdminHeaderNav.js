import React from 'react';
import { Avatar, Button, Dropdown, Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { AiOutlineUser } from 'react-icons/ai';
import AdminDropdown from '../AdminDropdown/AdminDropdown';

const { Header } = Layout;

const AdminHeaderNav = ({collapsed, toggle, image, user}) => {
  return (
    <Header className="site-layout-background" style={{ paddingLeft: 20,justifyContent: 'space-between' }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: toggle,
        })}
        <Dropdown overlay={<AdminDropdown user={user} />} trigger={['click','hover']} placement="bottomRight" arrow>
          <Avatar  src={user.img}  />
        </Dropdown>
    </Header>
  )
}

export default AdminHeaderNav