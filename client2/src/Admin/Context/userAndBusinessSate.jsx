// import userContext from "./UserContext";
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const userAndBusinessState = (props) => {
//   const host = "http://localhost:8000";

//   const [userdata, setUserdata] = useState({
//     name: "",
//     profession: "",
//     about: "",
//     email: "",
//     address: "",
//     contactNumber: "",
//     image: "",
//   });

//   const [businessData, setBusinessData] = useState({
//     businessName: "",
//     businessTagline: "",
//     businessDescription: "",
//     businessEmail: "",
//     businessAddress: "",
//     bContactNumber: "",
//     youtube: "",
//     linkedIn: "",
//     twitter: "",
//     instagram: "",
//     facebook: "",
//     logoImage: "",
//   });

//   const fetchUserData = async () => {
//     try {
//       console.log("Sending request to getUserInfo at backend");
//       const response = await axios.get(`${host}/getUser`, { withCredentials: true });
//       console.log("Response from backend", response.data);
//       setUserdata(response.data)
//       return response;
//     } catch (error) {
//       console.log("Error occurred.", error);
//       console.error(error);
//     }
//   };

 

//   // useEffect(() => {
//   //   console.log("userdata state:", userdata);
//   // }, [userdata]);

//   // useEffect(() => {
//   //   console.log("businessData state:", businessData);
//   // }, [businessData]);

//   return (
//     <userContext.Provider value={{ fetchBusinessData, fetchUserData, userdata, businessData, setBusinessData, setUserdata }}>
//       {props.children}
//     </userContext.Provider>
//   );
// };

// export default userAndBusinessState;
