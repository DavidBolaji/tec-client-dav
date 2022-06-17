import React, { useEffect, useLayoutEffect, useState } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { Button, Modal, notification, Spin } from 'antd';
import Homepage from "./pages/Homepage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import TecInEveryHome from "./pages/TecInEveryHome";
import TecInEverySchool from "./pages/TecInEverySchool";
import Gallery from "./pages/Gallery";
import TecInEveryCommunity from "./pages/TecInEveryCommunity";
import NotFound from "./pages/404";
import Blog from "./pages/Blog";
import BlogSingle from "./pages/BlogSingle";
import Login from "./pages/Login";
import Register from "./pages/Register";
import 'antd/dist/antd.css';
import "./styles.css";
import 'aos/dist/aos.css'
import AOS from 'aos';
import Test from "./components/Test";
require('dotenv').config();


const ReachableContext = React.createContext();
const UnreachableContext = React.createContext();

const config = {
  title: 'Searching for A tutor?',
  content: (
    <>
      <ReachableContext.Consumer>{name => `Reachable: ${name}!`}</ReachableContext.Consumer>
      <br />
      <UnreachableContext.Consumer>{name => `Unreachable: ${name}!`}</UnreachableContext.Consumer>
    </>
  ),
};





export default function App() {
  const [modal, contextHolder] = Modal.useModal();
  const [load, setLoaded] = useState(true)
  const location = useLocation();
  
  useEffect(() => {
    const onLoading = () => {
      setLoaded(false)
    }
    AOS.init({});
    
    window.addEventListener('load', onLoading);

    return () => window.removeEventListener('load',onLoading)
  },[])

  useLayoutEffect(() => {
   window.scrollTo(0,0)
  },[location.pathname])



  return (
    <div>
      <Switch>
        <Route path="/tec-client" exact><Redirect to="/tec-client/home" /> </Route>
        <Route path="/tec-client/home">
          <Homepage />
        </Route>

        <Route path="/tec-client/about">
          <AboutPage />
        </Route>

        <Route path="/tec-client/contact">
          <ContactPage />
        </Route>

        <Route path="/tec-client/tec_in_every_home">
          <TecInEveryHome />
        </Route>

        <Route path="/tec-client/tec_in_every_community">
          <TecInEveryCommunity />
        </Route>

        <Route path="/tec-client/tec_in_every_school">
          <TecInEverySchool />
        </Route>

        <Route path="/tec-client/blog" exact>
          <Blog />
        </Route>

        <Route path="/tec-client/blog/:blogId">
          <BlogSingle />
        </Route>

        <Route path="/tec-client/login">
          <Login />
        </Route>

        <Route path="/tec-client/register">
          <Register />
        </Route>

        <Route path="/tec-client/gallery">
          <Gallery />
        </Route>

        <Route path="/tec-client/adminDashBoard/:adminId">
          <AdminDashboard />
        </Route>

        <Route path="/tec-client/userDashBoard/:userId">
          <UserDashboard />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  )
  // )
  
  // : (
  //   <div className="spinner">
  //     <Spin size="large"/>
  //   </div>
  // );
}
