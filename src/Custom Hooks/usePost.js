import axios from "axios"
import { config } from "../Constant/environment"
import { useState } from "react"

const usePost=(endPoint,body)=>{
   const [data,setData]=useState();
   const handleClick=()=>{ axios.post(`${config.baseUrl}/${endPoint}`,body)
    .then(res=>{
        console.log(res)
        setData(res.data.data)
    })
    .catch(err=>{console.log(err)})

}
return [data,handleClick];}
export default usePost;