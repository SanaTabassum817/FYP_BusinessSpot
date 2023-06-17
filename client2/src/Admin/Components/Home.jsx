import React, { useContext, useEffect } from 'react';
import userContext from '../Context/UserContext';

const Home=()=> {
  const context = useContext(userContext);
  const { businessData, fetchBusinessData, setBusinessData,fetchUserData,userdata } = context;

  useEffect(async () => {
    fetchUserData();
    console.log(userdata);
    console.log("calling backedn");
   await fetchBusinessData()
      .then(response => {
        setBusinessData(response.data);
      })
      .catch(error => {
        console.log("Error occurred.", error);
        // Handle error here
      });
  }, []);
  console.log("returning backedn");

  console.log(businessData);

  return (
    <div>
      
    </div>
  );
}
export default Home;