import React from 'react';
import Helmet from 'react-helmet';
import Footer from '../components/Footer/Footer.js';
import LoginP from '../components/LoginP/LoginP.js';
import Navbar from '../components/Navbar/Navbar.js';
import PageHeader from '../components/PageHeader/PageHeader.js';

const Login = () => {

  return (<React.Fragment>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Tec | Login</title>
    </Helmet>
    <Navbar />
    <PageHeader 
        home={`Home`}
        page={`Login`}
      />
    <LoginP />
    <Footer />
  </React.Fragment>)
}

export default Login

