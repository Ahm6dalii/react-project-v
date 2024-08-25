/* eslint-disable react/prop-types */
import { useState } from "react"
import * as Yup from "yup";
import { useSelector } from "react-redux";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../../../components/ErrorMessage";
import MessageSuccess from "../../../components/MessageSuccess";
import AlertMessage from "../../../components/AlertMessage";

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Name must be greater than 2 characters")
        .max(10, "Name must be less than 10 characters")
        .required("Name is required"),
    phone: Yup.string()
        .matches(
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5}$/,
            "Enter a valid phone number"
        )
        .required("Phone is required"),
    email: Yup.string()
        .matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, "Enter a valid email")
        .required("Email is required"),
    role: Yup.string()
        .required("Role is required"),
    password: Yup.string()
        .min(6, "Minimum length 6 letters")
        .required("Password is required"),
});

const AccountForm = ({ userId, info }) => {
    const apiLink = useSelector((state) => state.apiLink.link);
    const queryClient = useQueryClient();
    const [userExist, setUserExist] = useState(false);
    const [loading, setLoading] = useState(false);


    const { data } = useQuery(
        'users', () => axios.get(`${apiLink}/users`),
        {
            refetchOnWindowFocus: false,
        }
    )
    const allUser = data?.data

    const { mutate: createUser, error: createError, isSuccess: isCreateSuccess } = useMutation(
        (user) => axios.post(`${apiLink}/users`, user),
        {
            onSuccess: () => {

                queryClient.invalidateQueries('user');
                queryClient.invalidateQueries('admin');
                toast.success("User created successfully")
            },
            onError: () => {
                toast.error("Failed to create user");
            }
        }
    )

    const { mutate: updateUser, error: updateError, isSuccess: isUpdateSuccess } = useMutation(
        (user) => axios.patch(`${apiLink}/users/${userId}`, user),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('user');
                queryClient.invalidateQueries('admin');
                toast.success("User Updated successfully")
            },
            onError: () => {
                toast.error("Failed to create user");
            }
        }
    )

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: info ? { ...info } : {}
    });
    const handleRegister = async (data) => {
        setLoading(true);
        if (!userId) {
            const foundUser = allUser.find((user) => user.email === data.email);

            if (foundUser) {
                setUserExist(true);
                setLoading(false);
                return;
            }
        }
        if (userId) {
            await updateUser(data);
        } else {
            await createUser(data);
            reset()
        }
        setUserExist(false);
        setLoading(false);
    };


    return (
        <>
            <div className="p-7">

                <Toaster position="top-center" reverseOrder={false} />
                {userExist && <div className="mb-2"><AlertMessage message={"Email already exists"} email={"change you email"} /></div>}
                <form onSubmit={handleSubmit(handleRegister)}>
                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Account type
                        </label>
                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                            <select
                                {...register("role")}
                                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white"
                            >
                                <option value="admin" className="text-body dark:text-bodydark">
                                    Admin
                                </option>
                                <option value="user" className="text-body dark:text-bodydark">
                                    USER
                                </option>
                            </select>
                            <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                <svg
                                    className="fill-current"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g opacity="0.8">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                            fill=""
                                        ></path>
                                    </g>
                                </svg>
                            </span>

                            {errors.role && <p className="text-red-600">{errors.role.message}</p>}
                        </div>

                        <label className="mb-2.5 block font-medium text-black dark:text-white mt-3">
                            Name
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                {...register("name")}
                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            <span className="absolute right-4 top-4">
                                <svg
                                    className="fill-current"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 22 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g opacity="0.5">
                                        <path
                                            d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                                            fill=""
                                        />
                                        <path
                                            d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                                            fill=""
                                        />
                                    </g>
                                </svg>
                            </span>
                            {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Phone
                        </label>
                        <div className="relative">
                            <input
                                type="tel"
                                placeholder="Enter your phone"
                                {...register("phone")}
                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            <span className="absolute right-4 top-4 text-stone-400">
                                <i className="fa-solid fa-phone"></i>
                            </span>
                            {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                {...register("email")}
                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            <span className="absolute right-4 top-4">
                                <svg
                                    className="fill-current"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 22 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g opacity="0.5">
                                        <path
                                            d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                                            fill=""
                                        />
                                    </g>
                                </svg>
                            </span>
                            {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                        </div>
                    </div>
                    {!userId && <>
                        <div className="mb-4">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    {...register("password")}
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                                <span className="absolute right-4 top-4">
                                    <svg
                                        className="fill-current"
                                        width="22"
                                        height="22"
                                        viewBox="0 0 22 22"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g opacity="0.5">
                                            <path
                                                d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                                fill=""
                                            />
                                            <path
                                                d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                                fill=""
                                            />
                                        </g>
                                    </svg>
                                </span>
                                {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                            </div>
                        </div>
                    </>}
                    <button
                        type="submit"
                        className="w-full rounded dark:bg-white dark:text-boxdark-2 text-white bg-boxdark font-bold py-3 px-5  transition dark:hover:bg-boxdark-2 dark:hover:text-white hover:bg-white hover:text-boxdark-2"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : userId ? "Update Account" : "Create Account"}
                    </button>
                    <div className="my-5">
                        {createError && <ErrorMessage name={"Account"} type={"created"} message={createError?.message} />}
                        {updateError && <ErrorMessage name={"Account"} type={"Updated"} message={updateError?.message} />}
                        {isCreateSuccess && <MessageSuccess name={"Account"} type={"created"} message={"You Successfully created a Account"} />}
                        {isUpdateSuccess && <MessageSuccess name={"Account"} type={"Updated"} message={"You Successfully updated the Account"} />}

                    </div>
                </form >
            </div >
        </>
    )
}

export default AccountForm