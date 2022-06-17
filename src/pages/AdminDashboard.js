// import { Avatar, BackTop, Input } from 'antd';
import React, { useEffect, useState, useRef } from 'react'
// import {Helmet} from 'react-helmet';
// import { Editor } from '@tinymce/tinymce-react';
// import { IoIosArrowUp } from 'react-icons/io';
import AdminSideNav from '../components/Admin/AdminSideNav/AdminSideNav';
import AdminHeaderNav from '../components/Admin/AdminHeaderNav/AdminHeaderNav';
import AdminBody from '../components/Admin/AdminBody/AdminBody';
import { Layout, message } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import { User } from '../utils/apiLists';
// import { WrapperCenter } from '../components/Admin/styles/AdminHeader.styled';
let authToken = localStorage.getItem("jwt");
authToken = JSON.parse(authToken)



const AdminDashboard = () => {
  const editorRef = useRef(null)
  const history = useHistory();
  const [collapsed, setColapsed] = useState(false);
  const [user, setUser] = useState({});
  const [page, setPage] = useState('home');

  const { adminId } = useParams()

  const getUser = async () => {    
    const newId = User.find(adminId)
    
    const url = `https://tec-server-api.herokuapp.com/api/v1/${newId}`;

    const res = await fetch(url, {
        method: 'GET',
        headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${authToken}`
        }
    })

    const result = await res.json();

    console.log(result);

    if (result.error) {
      await message.error('user not authenticated', 1.5)
      await message.loading('redirecting....')
      setTimeout(() => {
        history.push('/tec-client/login')
      }, 1500)
    };

    return result
    
}


  useEffect(() => {
    getUser().then(res => {
      setUser({...res})
    })
   
  }, [])
  

  const toggle = () => {
    setColapsed(prev => !prev)
  }
  
  const setpageChange = (newPage) => {
    setPage(newPage)
  }

  const setBlogPageData = (newPage) => {
    setPage(newPage)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AdminSideNav collapsed={collapsed} param={adminId} onPageChange={setpageChange} user={user} />
      <Layout className="site-layout">
        <AdminHeaderNav collapsed={collapsed} toggle={toggle} param={adminId} image={user.img} user={user}/>
        <AdminBody page={page} name={user.name} blogPage={setBlogPageData} />
      </Layout>
    </Layout>
  );
}

export default AdminDashboard;