import React from 'react';
import Alert from './Alert';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router';

const Dashboard = (props) => {
  
  const [cookies] = useCookies(['jwt']);
  if (!props.isLoggedin && !cookies.jwt) {
    return <Navigate to="/login? You are not logged in. Please login first." />;
  }

  return (
    <div className='dashborad-main'>  
      <Alert alert={props.alert}/>
    </div>
  )
}

export default Dashboard

