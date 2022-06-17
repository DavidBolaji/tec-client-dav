import { Button, Form, Input, message } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { FiTrash } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { Blog } from '../../../utils/apiLists';
let authToken = localStorage.getItem("jwt");
authToken = JSON.parse(authToken)

const EditBlog = ({ blogId }) => {
    const [img, setImg] = useState([]);
    const [blogData, setBlogData] = useState({});
    const [loading, setLoading] = useState(false)
    const contentRef = useRef();
    const titleRef = useRef();


    // const newId = Blog.find(blogId)
    // const urlUpdate = `https://tec-server-api.herokuapp.com/api/v1/${newId}`;

    const getBlogs = async () => {
        
        const newId = Blog.findOne(blogId)
        
        const url = `https://tec-server-api.herokuapp.com/api/v1/${newId}`;
       
    
        const res = await fetch(url, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${authToken}`
            }
        })
    
        const result = await res.json()
    
        return result
      }

    useEffect(() => {
        getBlogs().then(res => {
            setBlogData({...res});
        });
    }, [])
    
        

    const uploadRef = useRef();

    const handleUploadChange = () => {
        
        setBlogData(prev => {
            return {
                ...prev,
                title: titleRef.current.input.value,
                content: contentRef.current.resizableTextArea.props.value 
            }
        })
        setImg([uploadRef.current.files[0]]);
        console.log(uploadRef.current.files[0]);
        message.success(`file uploaded successfully`);
    }

    const toggleFile = () => {
        uploadRef.current.click();
    }

    const clearFile = () => {
        setImg([]);
        message.success(`file removed successfully`);
    }

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    };

    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: '${label} is required!',
    };
  /* eslint-enable no-template-curly-in-string */
  
    const onFinish = async (values) => {
    setLoading(true)
    const newId = Blog.updateOne(blogId)
    const urlUpdate = `https://tec-server-api.herokuapp.com/api/v1/${newId}`;
      
     const formData = new FormData();

     formData.append("title", values.title)
     formData.append("content", values.content)

     if (img.length > 0) {
        formData.append('images', img[0])
     }

     console.log(urlUpdate);

     const response = await fetch(urlUpdate, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Authorization': `Bearer ${authToken}`
        },
        body: formData // body data type must match "Content-Type" header
      });
     

    const result = await response.json();

    if (result) {
        message.success(`Blog updated succesfully`);
        setLoading(false)
        // setTimeout(() => {
        //     history.push('/tec-client/login')
        // },3000)
    }
    };

    
  return (
    <>
    
    <div style={{marginBottom: 20}}><h1><b>Edit Blog</b></h1></div>

    <Form {...layout} name="nest-messages" onFinish={onFinish}
     validateMessages={validateMessages}
     fields={[
        {
            value: blogData.content,
            name: ["content"]
        },
        {
            value: blogData.title,
            name: ["title"]
        }
     ]}
     >
      <Form.Item name="title" label="Title" rules={[{ required: true }]} className="form" >
        <Input ref={titleRef} />
      </Form.Item>
      {/* defaultValue={blogData.title} */}
      <Form.Item name="content" label="Content" rules={[{ required: true }]}
      
      >
        <Input.TextArea rows={10} ref={contentRef} />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
      <div>
       
        <Button onClick={toggleFile} icon={<AiOutlineCloudUpload style={{
            marginRight: 5,
            paddingTop: 3,
           
        }} />}  
        
        > Click to Upload</Button>
        
    <input type='file' className="file__hidden" ref={uploadRef} onChange={handleUploadChange}/>
    </div>
    {img.length > 0 ?<div className='upload__tray'>
            <div className='upload__name'>
                {img.map(e =>{
                    return(
                        <span key={e.name}>{e.name}</span>
                    )
                })}
            </div>
            <div><FiTrash onClick={clearFile}/></div>
        </div>: null}
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
    
    </>  
  )
}

export default EditBlog