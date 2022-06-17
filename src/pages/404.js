import React from 'react';
import { Link } from 'react-router-dom';


const NotFound = () => {
  return (
    <div
    style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
    }}
    >
        <div 
            style={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <h1>404 NotFound</h1>
            <p>Click <Link to="/home" style={{pointer: 'cursor'}}>here</Link> to go to Hompage</p>
        </div>
    </div>
  )
}

export default NotFound;