import { Button, Form, Input, message, Upload } from 'antd'
import React, { useRef, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { FiTrash } from 'react-icons/fi';

let authToken = localStorage.getItem("jwt");
authToken = JSON.parse(authToken)

const Gallery = () => {
    const [img, setImg] = useState([])
    const [loading, setLoading] = useState(false)
    const url = `https://tec-server-api.herokuapp.com/api/v1/gallery`;

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
      setLoading(true)
     const formData = new FormData();
     formData.append("images", img[0])

     const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Authorization': `Bearer ${authToken}`
        },
        body: formData // body data type must match "Content-Type" header
      });
     

    const result = await response.json();
    console.log(result);
      setLoading(false)
    if (result.image) {
        message.success(`Upload succesful`);
    } else if(result.message){
        message.info(result.message)
    } else {
        message.error(result.error)
    }
    };

  return (
    <>
    <div style={{marginBottom: 20}}><h1><b>Gallery</b></h1></div>

    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }}>
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

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
    
    </>  
  )
}

export default Gallery