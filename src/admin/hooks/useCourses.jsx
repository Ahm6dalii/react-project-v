import axios from "axios"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useSelector } from "react-redux"

const useCourses = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(6)
    console.log("currentPage", currentPage);

    const axiosInstance = axios.create({
        withCredentials: true,  
    });
    
    const fetchCourses = () => {
   return  axiosInstance.get(`${api}/courses?_page=${currentPage}&_per_page=${perPage}`);
};
    const api = useSelector(state => state.apiLink.link)
    const { data, error, isLoading } = useQuery(['data', currentPage, perPage], fetchCourses,
        {
            keepPreviousData: true,
        })
    const courses = data
    console.log(data,'sdasdadss');

    const queryClient = useQueryClient()


    const { mutate } = useMutation(async (id) => {
        await axios.delete(`${api}/courses/${id}`)
    },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('data')
            }
        }
    )
    const handleDelete = (id) => {
        mutate(id)
    }
    return { error, isLoading, currentPage, setCurrentPage, courses, handleDelete, setPerPage, perPage }
}

export default useCourses