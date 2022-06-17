import { Button, Form, Input, message, Upload } from 'antd'
import React, { useRef, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { FiTrash } from 'react-icons/fi';
import { Blog } from '../../../utils/apiLists';
let authToken = localStorage.getItem("jwt");
authToken = JSON.parse(authToken)

const CreateBlog = () => {
    const [img, setImg] = useState([])
    const url = `https://tec-server-api.herokuapp.com/api/v1/${Blog.create}`;

    const uploadRef = useRef();

    const handleUploadChange = () => {
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
  
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
   
  };

    const onFinish = async (values) => {
      console.log(values);
      console.log(img[0]);
     const formData = new FormData();

     formData.append("title", values.title)
     formData.append("content", values.content)
     formData.append('images', img[0])

     const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Authorization': `Bearer ${authToken}`
        },
        body: formData // body data type must match "Content-Type" header
      });
     

    const result = await response.json();
    console.log(result);

    if (result) {
        message.success(`Blog created succesfully`);

        // setTimeout(() => {
        //     history.push('/tec-client/login')
        // },3000)
    }
    };

  return (
    <>
    <div style={{marginBottom: 20}}><h1><b>Create Blog</b></h1></div>

    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      
      <Form.Item name="content" label="Content" rules={[{ required: true }]}>
        <Input.TextArea rows={10} />
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    
    </>  
  )
}

export default CreateBlog