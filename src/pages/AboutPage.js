import { BackTop } from 'antd';
import React from 'react'
import {Helmet} from 'react-helmet';
import { IoIosArrowUp } from 'react-icons/io';
import Footer from '../components/Footer/Footer';
import GetConnected from '../components/GetConnected/GetConnected';
import About from '../components/About/About';
import MailingList from '../components/MailingList/MailingList';
import Navbar from '../components/Navbar/Navbar';
import PageHeader from '../components/PageHeader/PageHeader';


const AboutPage = () => {
  return (
    <React.Fragment>
      <Helmet>
          <meta charSet="utf-8" />
          <title>Tec | About</title>
      </Helmet>
      <Navbar />
      <PageHeader 
        home={`Home`}
        page={`About Us`}
      />
     <About />
      
      
     
      <MailingList />
      <GetConnected />
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
      <Footer />
    </React.Fragment>
  )
}

export default AboutPage;