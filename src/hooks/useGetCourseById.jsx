import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

export default function useGetCourseById(id) {
   const  apiLink=useSelector((state)=>state.apiLink.link)

 
    //   const getCourseById = async (userId) => {
    //     try {
    //       const response = await axios.get(`${apiLink}/courses/${userId}`);
    //       toast.success("user created Succfully")
    //       console.log('user created',response);
    //       return response.data;

    //     } catch (error) {
    //       console.error('Error fetching course:', error);
    //       toast.error("user failed created")
    //       return error
    //     }
    //   };

      const getCourseById = async (userId) => {
        return axios.get(`${apiLink}/courses/${userId}`);
      }
      const { data, error, isLoading, refetch }=useQuery({
        queryKey: ['cousrsDetailsData'],
        queryFn:getCourseById,
        refetchOnWindowFocus: false, 
        refetchInterval: 60000, 
        onSuccess: () => {
         toast.success("from hoook")
        },
      })
      

  return   { data, error, isLoading, refetch }
 
}
