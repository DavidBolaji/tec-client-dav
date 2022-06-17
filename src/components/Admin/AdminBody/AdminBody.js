import React, { useEffect, useState } from 'react';
import { Layout, message } from 'antd';
import ViewBlog from '../Pages/ViewBlog';
import { User } from '../../../utils/apiLists';
import ViewTutor from '../Pages/ViewTutor';
// import { redirect } from 'express/lib/response';
import { useHistory } from 'react-router-dom';
import CreateBlog from '../Pages/CreateBlog';
import EditBlog from '../Pages/EditBlog';
import Gallery from '../Pages/Gallery';
let authToken = localStorage.getItem("jwt");
authToken = JSON.parse(authToken)

const { Content } = Layout;




const AdminBody = ({page, name, blogPage}) => {
    
    const [blogId, setBlogId] = useState();
    const history = useHistory();
   
    
    useEffect(() => {
        // getUser(param).then(res => {
        //     userDb(res)
        //     setUser({...res});
        // });
    },[])

    const redirectEdit = (id) => {
        setBlogId(id)
        blogPage("edit-blog")
        
    }
   
  return (
    <Content
        className="site-layout-background"
        style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        
        }}
    >
        {page === "home" && <h1>Welcome {name}</h1>}
        {page === "tutor" && <ViewTutor />}
        {page === "blog" && <ViewBlog editBlog={redirectEdit} />}
        {page === "create-blog" && <CreateBlog />}
        {page === "edit-blog" && <EditBlog blogId={blogId}/>}
        {page === "gallery" && <Gallery />}
    </Content>
  )
}

export default AdminBody