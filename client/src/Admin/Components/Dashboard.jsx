import React from 'react';
import Alert from './Alert';

const Dashboard = (props) => {
  return (
    <div className='content-div'>  
      <Alert alert={props.alert}/>
    </div>
  )
}

export default Dashboard

