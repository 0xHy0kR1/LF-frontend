import { useState } from 'react';
import './../../App.css'
function Alert(props) {
  const [show, setShow] = useState(true);
  const capitalized = (word) => {
    if (!word) {
        return ''; // Return an empty string or another default value
      }
    if(word === "danger"){
      word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  return (
    <div className='fixed-top-alert'>
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{capitalized(props.alert.type)}</strong>: {props.alert.msg}
      </div>}
    </div>
  )
}

export default Alert;