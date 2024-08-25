/* eslint-disable react/prop-types */

import { useEffect } from 'react';
import Loader from '../../../common/Loader';
import useFetchUser from './../../../hooks/useFetchUser';
import BinModal from '../../../components/modal/BinModal';
import ModalCreateAccount from './ModalCreateAccount';
const AccountTable = ({ searchValue, display, type, error, loading }) => {
    const { handleDelete, setPerPage } = useFetchUser()


    const search = type && type?.data.filter(item => item.name?.toLowerCase().includes(searchValue?.toLowerCase()))
    useEffect(() => {
        if (searchValue) {
            setPerPage(200);
        } else {
            setPerPage(10)
        }
    }, [searchValue, setPerPage])
    if (error) return <h1>{error}</h1>
    {
        loading && (<div> <Loader /></div >)
    }
    return (
        <>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-20">
                <div className="py-6 px-4 md:px-6 xl:px-7.5">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        {type === 'admin' ? 'Admin List' : 'UserList'}
                    </h4>
                </div>
                <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                    <div className="col-span-3 flex items-center">
                        <p className="font-medium">Account Name</p>
                    </div>
                    <div className="col-span-2 items-center ">
                        <p className="font-medium">Email</p>
                    </div>
                    <div className="col-span-1 items-center hidden sm:flex">
                        <p className="font-medium">Phone</p>
                    </div>
                    <div className="col-span-1 items-center hidden sm:flex">
                        <p className="font-medium">Type</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Actions</p>
                    </div>
                </div>
                {search && search.length > 0
                    ? search.map((user, index) => (<div key={index}
                        className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                    >
                        <div className="col-span-3 flex items-center">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="h-12.5 w-15 rounded-md overflow-hidden">
                                    <img className='w-full h-full object-cover' src={user?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSixWENwTZdvqJbo7WMo7JJX4yBrk5Mif_bxg&s"} alt="photo" />
                                </div>
                                <p className="text-sm text-black dark:text-white">
                                    {user.name}
                                </p>
                            </div>
                        </div>
                        <div className="col-span-2 flex items-center justify-center mr-50">
                            <p className="text-sm text-black dark:text-white">
                                {user.email}
                            </p>
                        </div>
                        <div className="col-span-1  mr-22 justify-center  items-center hidden sm:flex ">
                            <p
                                className='inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium   bg-success text-success'>
                                {user.phone}
                            </p>
                        </div>
                        <div className="col-span-1  items-center ml-3 hidden sm:flex">
                            <p className="text-sm text-black dark:text-white">
                                {user.role}
                            </p>
                        </div>
                        <div className="col-span-1 flex items-center gap-3">
                            <ModalCreateAccount userId={user.id} info={user} display={display} />
                            <BinModal id={user.id} text={user.name} handleDelete={handleDelete} />
                        </div>
                    </div>))
                    : <h1>no users</h1>
                }
            </div>

        </>
    )
}

export default AccountTable