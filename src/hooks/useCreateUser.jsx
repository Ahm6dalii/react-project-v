import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

export default function useCreateUser(user) {
   const  apiLink=useSelector((state)=>state.apiLink.link)

    const createUser = async () => {
        try {
          const response = await axios.post(`${apiLink}/users`, user);
          toast.success("user created Succfully")
          console.log('user created',response);
          
          return response.data;
        } catch (error) {
            console.error('Error creating user:', error);
            toast.error("user failed created")
            return error
        }
      };

      useEffect(()=>{
        createUser()
      },[])
 
}
