import { BackTop } from 'antd';
import React from 'react'
import {Helmet} from 'react-helmet';
import { IoIosArrowUp } from 'react-icons/io';



const UserDashboard = () => {
  return (
    <React.Fragment>
      <Helmet>
          <meta charSet="utf-8" />
          <title>User | David</title>
      </Helmet>

      
      <BackTop>
        <div style={{
          height: 40,
          width: 40,
          lineHeight: '40px',
          borderRadius: 4,
          backgroundColor: '#1088e9',
          color: '#fff',
          textAlign: 'center',
          fontSize: 14,
        }}><IoIosArrowUp /></div>
      </BackTop>
      
    </React.Fragment>
  )
}

export default UserDashboard;