import axios from "axios"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useSelector } from "react-redux"

const useFetchUser = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const api = useSelector((state) => state.apiLink.link)
    const { data: usersData, error: usersError, isLoading: usersLoading } = useQuery(
        ['user', currentPage, perPage],
        () => axios(`${api}/users?_page=${currentPage}&_per_page=${perPage}&role=user`),
        { keepPreviousData: true }
    );


    const { data: adminsData, error: adminsError, isLoading: adminsLoading } = useQuery(
        ['admin', currentPage, perPage],
        () => axios(`${api}/users?_page=${currentPage}&_per_page=${perPage}&role=admin`),
        { keepPreviousData: true }
    );

    const qureyClient = useQueryClient()
    const users = usersData?.data
    const admins = adminsData?.data

    const { mutate } = useMutation(async (id) => {
        await axios.delete(`${api}/users/${id}`)
    },
        {
            onSuccess: () => {
                qureyClient.invalidateQueries('user');
                qureyClient.invalidateQueries('admin');
            }
        }
    )
    const handleDelete = (id) => {
        mutate(id)
    }
    return {
        handleDelete, users, admins, usersError,
        adminsError,
        usersLoading,
        adminsLoading, currentPage, setCurrentPage, setPerPage
    }
}

export default useFetchUser