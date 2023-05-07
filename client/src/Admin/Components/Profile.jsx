// try{
//     const response = await fetch(`http://localhost:8000/`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         credentials: 'include',
//     });
//     const jsonResponse=await response.json()
//     if(jsonResponse._id){
//       console.log(jsonResponse);