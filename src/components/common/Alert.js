import { useState } from 'react';
import './../../App.css'
function Alert(props) {
  const getCustomMessage = (type) => {
    switch (type) {
      case 'success':
        return 'Success:';
      case 'danger':
        return 'Oops! Something went wrong:';
      case 'warning':
        return 'Warning:';
      // Add more cases for other alert types if needed
      default:
        return 'Hey there!';
    }
  };


  return (
    <div className='fixed-top-alert'>
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{getCustomMessage(props.alert.type)}</strong>: {props.alert.msg}
      </div>}
    </div>
  )
}

export default Alert;