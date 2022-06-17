import React, { useEffect, useState } from 'react';
import './Gallery.css';
import ImageGallery from 'react-image-gallery';
import BackgroundOne from "../../assets/img/home1.jpg";
import BackgroundTwo from "../../assets/img/school.jpg";
import BackgroundThree from "../../assets/img/comm.jpg";
import { Spin } from 'antd';

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
  {
    original: BackgroundOne,
    thumbnail: BackgroundOne,
  },
  {
    original: BackgroundTwo,
    thumbnail: BackgroundTwo,
  },
  {
    original: BackgroundThree,
    thumbnail: BackgroundThree,
  },
];



const GalleryP = () => {
  const [loading, setLoading] = useState(true);
  const getPics = async () => {
    const url = `https://tec-server-api.herokuapp.com/api/v1/gallery`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "apllication/json",
      },
    });

    const response = await res.json();

    if (response) {
      setLoading(false);
    }

    console.log(response);

    return response;
  };

    const [data,setData] = useState([])
    useEffect(() => {
      getPics().then((images) => {
        const newSet = images.map(image => {
          return {
            original: image.pic,
            thumbnail: image.pic,
          }
        })

        setData([...newSet])
      });
    },[])

    console.log(data);
  return (
    data.length === 0 ? <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}><Spin /></div> : <ImageGallery items={[...data]} />
  )
}

export default GalleryP