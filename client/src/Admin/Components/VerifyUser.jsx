import React, {useEffect, useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'

const VerifyUser=(props)=>{
    const {userId,verificationToken}=useParams()
    const navigate=useNavigate()

    const [error,setError]=useState()

    useEffect(()=>{

        const verifyUserApiCall=async ()=>{
            try{
                const response = await fetch(`http://localhost:8000/users/${userId}/verify/${verificationToken}`, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    
                });
                const jsonResponse=await response.json()
                if(jsonResponse.msg)
                {
                    //user varification successful
                    navigate(`/login?msg=${jsonResponse.msg}`)
                }else{
                    //error occured. resend verification url
                    console.log(jsonResponse.error);
                    setError(jsonResponse.error)
                }
              }catch(error){
                console.log(error);
              }
        }

        verifyUserApiCall()
    })
    
    return(
        <>
            <div>
            <span>{error}</span>
            </div>
        </>
    )
}

export default VerifyUser