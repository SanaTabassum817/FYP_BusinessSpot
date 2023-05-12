import React from "react";

export default function Alert(props) {
  // const capitalize = (word) => {
  //   console.log(props.alert);
  //   if(word==="danger")
  //   {
  //     word="Signup Failed!"
  //   }
  //   else
  //   {
  //     word="Signup Successful!"
  //   }
  //   const lower = word.toLowerCase();
  //   return lower.charAt(0).toUpperCase() + lower.slice(1);
  // };
  return (
    // here height is helpful in fixing the layout movement due to alert
    <div style={{ height: "50px" }}>  
      {props.alert && (
        <div className={`alert alert-${props.alert.typ}`} role="alert">

          <strong></strong>{props.alert.msg}
        </div>
      )}
    </div>
  );
}
//{capitalize(props.alert.typ)}