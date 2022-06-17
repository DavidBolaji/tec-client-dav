import React, { useState } from 'react'
import { Menu } from 'antd';
import { FaBlog } from "react-icons/fa";
import SubMenu from 'antd/lib/menu/SubMenu';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import Sider from 'antd/lib/layout/Sider';
import { GrAdd, GrOverview, GrGallery } from "react-icons/gr";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const AdminSideNav = ({collapsed, onPageChange, user}) => {
  const [page, setPage] = useState()
  
  const setNewPage = (page) => {
    onPageChange(page)
  }
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} >
      <div className="logo"></div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<AiOutlineHome />} onClick={() => setNewPage("home")}>
          Home
        </Menu.Item>
        {user.role === 'admin' && <SubMenu key="sub1" icon={<FaBlog />} title="Blog">
            <Menu.Item key="3" icon={<GrAdd />} onClick={() => setNewPage("create-blog")}>
              Create
            </Menu.Item>
            <Menu.Item key="4" icon={<GrOverview />} onClick={() => setNewPage("blog")}>
              View
            </Menu.Item>
            
        </SubMenu>}
        {user.role === 'admin' && <SubMenu key="gall" icon={<GrGallery style={{backgroundColor: 'rgba(255, 255, 255, 0.65)'}} />} title="Gallery">
            <Menu.Item key="5" icon={<GrAdd />} onClick={() => setNewPage("gallery")}>
              Upload
            </Menu.Item>
            {/* <Menu.Item key="4" icon={<GrOverview />} onClick={() => setNewPage("blog")}>
              View
            </Menu.Item> */}
            
        </SubMenu>}
        {user.role === 'admin' && <SubMenu key="sub2" icon={<AiOutlineUser />} title="Tutors">
            <Menu.Item key="6" icon={<GrOverview />} onClick={() => setNewPage("tutor")}>
              View
            </Menu.Item>
        </SubMenu>}
      </Menu>
    </Sider>
  )
}

export default AdminSideNav