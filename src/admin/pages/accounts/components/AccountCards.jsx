/* eslint-disable react/prop-types */

import CoverOne from '../../../images/cover/cover-01.png';
import userSix from '../../../images/user/user-06.png';
import Loader from '../../../components/old/Loader/Loader';
import Modal from './../../../components/modal/Modal';
import ModalCreateAccount from './ModalCreateAccount';
import useFetchUser from '../../../hooks/useFetchUser';
import { useEffect } from 'react';



const AccountCards = ({ searchValue, type, error, loading }) => {
    const { handleDelete, setPerPage } = useFetchUser()


    const search = type && type?.data.filter(item => item.name?.toLowerCase().includes(searchValue?.toLowerCase()))
    useEffect(() => {
        if (searchValue) {
            setPerPage(200);
        } else {
            setPerPage(1)
        }
    }, [searchValue, setPerPage])
    if (error) return <h1>{error}</h1>
    {
        loading && (<div> <Loader /></div >)
    }
    return (
        <>
            <div className=" flex justify-center items-center py-20">
                <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0 ">
                    {search && search.length > 0
                        ? search.map((user) => (
                            <div key={user.id} className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark transform hover:scale-105 transition duration-500">
                                <div className="relative z-20 h-35 md:h-45">
                                    <img
                                        src={CoverOne}
                                        alt="profile cover"
                                        className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
                                    />
                                </div>
                                <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
                                    <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3 overflow-hidden">
                                        <div className="relative w-full h-full">
                                            <img
                                                src={user?.image || userSix}
                                                alt="profile"
                                                className="absolute inset-0 w-full h-full object-cover rounded-full"
                                            />
                                        </div>
                                    </div>
                                    <div className="">
                                        <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                                            {user?.name}
                                        </h3>
                                        <p className="font-medium">{user?.email}</p>
                                    </div>
                                    <div className="mt-3 flex justify-center align-middle gap-15">
                                        <ModalCreateAccount userId={user.id} info={user} style={" text-xl  text-white bg-indigo-900 py-2 px-4 rounded-xl shadow-lg"} />
                                        <Modal id={user.id} text={user.name} handleDelete={handleDelete} />
                                    </div>

                                </div>
                            </div>
                        ))
                        : <h1>no users found</h1>
                    }

                </div>
            </div>

        </>
    )
}

export default AccountCards