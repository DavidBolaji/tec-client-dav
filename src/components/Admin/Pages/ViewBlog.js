import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Avatar, message } from 'antd';
import { AiOutlineDelete } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { Blog } from '../../../utils/apiLists';
import { convertUtcToWord } from '../../../utils/convertDate';
import Paragraph from 'antd/lib/skeleton/Paragraph';
import { truncate } from '../../../utils/truncate';
let authToken = localStorage.getItem("jwt");
authToken = JSON.parse(authToken)





// const data = [
//     {
//       key: '1',
//       title: 'WE LOVE CHILDREN',
//       content: 'lorem100  as for me and my house...',
//       createdAt: '09-08-2022',
//       tags: ['nice', 'developer'],
//     },
    
//   ];

const ViewBlog = ({ editBlog }) => {
    const [data, setData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
      }),
    };
    const [rows, setRows] = useState(5);
    const history = useHistory();

    const getBlog = async () => {
      
      
      const url = `${process.env.REACT_APP_API_BASE_URI}${Blog.find}`;
  
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
      getBlog().then(res => {
        // console.log(res);
        const newArr = res.map(e => {
          const newDate = convertUtcToWord(e.createdAt)
          return {...e, key: e._id, createdAt: newDate }
        })
        // console.log(newArr);
        setData([...newArr])
      })
    
    }, [])



  const handleEditClick = (id) => {
      editBlog(id)
  }

  const handleDeleteClick = async (id) => {
    
    const newId = Blog.delete(id);
    const url = `https://tec-server-api.herokuapp.com/api/v1/${newId}`

    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${authToken}`
      }
    })

    const result = await res.json()

    if (!result){
      return message.error('An error occured while deleting Blog');
    }

    message.success('Blog deleted succesfully');

    getBlog().then(res => {
      
      const newArr = res.map(e => {
        const newDate = convertUtcToWord(e.createdAt)
        return {...e, key: e._id, createdAt: newDate }
      })
      // console.log(newArr);
      setData([...newArr]);
    })
  }
  
  const columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Content',
        dataIndex: 'content',
        key: 'content',
        render: (text, record) => (
          <p>{truncate(record.content, 18)}</p>
        )
        
      },
      {
        title: 'Image',
        dataIndex: 'image',
        render: (text, record) => (
          <Avatar src={record.img} />
        ),
      },
      {
        title: 'Created',
        dataIndex: 'createdAt',
        key: 'createdAt'
      },
      {
          title: 'Edit',
          dataIndex: 'edit',
          render: (text, record) => (
            <Space size="middle" onClick={() => handleEditClick(record.key)} 
            style={{cursor: 'pointer', color: 'blue', textDecoration: 'underline'}}
            >
              Edit
            </Space>
          ),
        },
       
      {
          title: 'Delete',
          key: 'delete',
          render: (text, record) => (
            <Space size="middle" 
            onClick={() => handleDeleteClick(record.key)}
            >
              <AiOutlineDelete 
              style={{
                color:'red',
                cursor: 'pointer'
              }}
              />
            </Space>
          ),
        }
  ];
  
    
  return (
    <Table 
    columns={columns} 
    dataSource={data} 
    rowSelection={rowSelection} 
    // onChange={onSelectChange()}
    />
  )
}

export default ViewBlog