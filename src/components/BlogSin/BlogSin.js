import { Avatar, Card, Pagination, Spin } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Blog } from '../../utils/apiLists';
import BlogS from '../BlogS/BlogS';

import "./BlogSin.css";


const BlogSin = ({blogs, rerenderHead}) => {
    const { blogId } = useParams();
    const [data, setData] = useState({});
    // const [loaded, setLoaded] = useState(false);
    const [screen, setScreen] = useState(window.screen.width);
   
    let url = `${Blog.findOne(blogId)}`;
    url = `${process.env.REACT_APP_API_BASE_URI}${url}`;
    const getSingleBlog = async () => {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
           'Content-Type': 'application/json',
        }
    })
  
    const result = await res.json()
  
    return result
    }

    useEffect(() => {
        const checkResize = (e) => {
          setScreen(window.screen.width);
        }
    
        window.addEventListener('resize', checkResize);
    
        return () => window.removeEventListener('resize', checkResize);
      }, [])
    

    useEffect(() => {
        getSingleBlog().then(res => {
           
            setData({...res});
           
          });
    },[blogId])

   const rerender = async (id) => {
        rerenderHead(id)
        const url = `${Blog.findOne(id)}`;
        const URL = `${process.env.REACT_APP_API_BASE_URI}${url}`;
       
    const res = await fetch(URL, {
        method: 'GET',
        headers: {
           'Content-Type': 'application/json',
        }
    })
  
    const result = await res.json()

    setData({...result});
   }
     
  return !data.title ? <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
  }}><Spin /></div> : (
    <>
    <div
    style={{
        // display: 'flex',
        // alignItems: 'center'
    }}
    >
        <div className="sharethis-sticky-share-buttons"></div>
    </div>
    <div className='blog__page single'>
        <div className='blog__page__blog single'
        // style={{  padding: screen-1}}
        >
            {/* <img src={data.img} />
            <p>{data.content}</p> */}
        
            <Card
                key={data._id}
                data-aos="flip-right"
                data-aos-easing="linear"
                data-aos-duration="500"
                style={{  marginTop: 20 }}
                hoverable
                cover={<img alt="example" src={data.img} />}
                >
                    
                    <h1>{data.title}</h1>
                    <div className="sharethis-inline-follow-buttons"></div>
                    <div className="sharethis-inline-reaction-buttons"></div>
                    <p>{data.content}</p>
                    
            </Card>
            
        </div>
        <BlogS rerender={rerender}/>
    </div>
    
    </>
  )
}

export default BlogSin