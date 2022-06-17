import { Divider } from 'antd'
import React from 'react';
import { MdArrowRight } from 'react-icons/md';
import { truncate } from '../../utils/truncate';
import HomePic from './../../assets/img/home.webp';
import "./PageHeader.css";


const PageHeader = (props) => {
  return (
    <div className='page__header'>
        <div className='page__header__img'>
            <img src={HomePic} />
        </div>
        <div className='page__header__container'>
            <div className='bread__crumb'>
                <span>{props.home}</span> 
                <MdArrowRight 
                    style={{
                        color: 'red'
                    }}
                />
                <span>{truncate(props.page,5)}</span>
            </div>
            
            <Divider dashed/>
            <div className='page__header__current'>
                <h2>{props.page}</h2>
            </div>
        </div>
    </div>
  )
}

export default PageHeader