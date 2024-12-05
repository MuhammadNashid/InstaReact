import React, {useState , useEffect} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const Index=({setUser})=>{
    const navigates=useNavigate()

    const getUser=async()=>{
        const token=localStorage.getItem("token")
        console.log(!token);
        
        if(!token){
            console.log("hai");
            navigates("/login")
        }
        else{
            try{
                const res=await axios.get("http://localhost:3009/api/display",{headers:{"Authorization": `Bearer ${token}`}})

                if(res.status==200){
                    setUser(res.data.name)
                }
                else{
                    navigates("/login")
                }
            }catch(error){
                console.log(error);
                
            }
     }
    }
    useEffect(()=>{
        getUser()
    },[])

    return(
        <>
        <div><i>Home Page</i></div>
        </>
    )
}

export default Index