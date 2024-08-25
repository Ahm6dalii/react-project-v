import axios from 'axios';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

export default function (refetchTrigger) {
   const link= useSelector(state=>state.apiLink.link)

   const getUser=async()=>{
    setUserExist(false)
    await axios.get(`${apiLink}/users`)
    .then((res=>{
      console.log(res,'ssdsss');  
      setAllUser(res.data)
    })).catch(err=>{
      console.log(err);
      
    })
    ;
  }

  return   { data, error, isLoading, refetch }
}
