import { Divider } from 'antd';
import React from 'react';
import "./About.css";

const About = () => {
  return (
    <div className='about__page'>
        <Divider />

        <p
         className='a_para'
         data-aos="slide-left"
         data-aos-duration="1500"
        >The company is managed by Mr. Raphael Ajiboye who sits as Chief Executive Officer. With a team of well experience tutors, who can meet the specific needs of your kid and school assisting you to attain maximum success.</p>

        

        <Divider plain
        data-aos='zoom-in'
        data-aos-duration="2000"
        >
            <h2 className='a_head'>WHO WE ARE</h2>
        </Divider>

        <p
        className='a_para'
        data-aos="slide-right"
        data-aos-duration="1500"
        >
        The company offers different range of services from private home tutoring for All ages, All subjects and skills to consultation for schools on ICT, Music, Subject Teachers and French. TEC also offers training for individuals and corporate organization on ICT.
        </p>

        <Divider plain
        data-aos='zoom-in'
        data-aos-duration="2000"
        >
            <h2 className='a_head'>WHAT WE DO</h2>
        </Divider>

        <p
         className='a_para'
         data-aos="slide-left"
         data-aos-duration="1500"
         >
        TEC center provides a unique 1on1, group, and standard class room for academic coaching, career/life plan, for students from grade 7 to WAEC, , GCE, NECO, JAMB students. Adults, Corps Members also enjoy our TEC center training, seminars, diploma courses etc.TEC has a arm of service called RESEARCHUB, providing consultancy services/training for Institution students in academic writing, data analysis and lot more.Our vision is to create pathways to good success! Good success in academics, career, life, etc! 
        </p>

        <Divider plain
        data-aos='zoom-in'
        data-aos-duration="2000"
        >
            <h2 className='a_head'>OUR MISSION</h2>
        </Divider>

        <p
        className='a_para'
        data-aos="slide-right"
        data-aos-duration="1500"
        >
            Our mission is to ensure that we create pathways to good success for all our clients in all our services. We will strive to achieve this goal by; Providing our clients with quality services We would be mindful of the well-being of our customers and staffs treating each and every one with dignity and respect. 
        </p>
    </div>
  )
}

export default About