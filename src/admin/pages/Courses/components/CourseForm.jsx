/* eslint-disable react/prop-types */
import { yupResolver } from "@hookform/resolvers/yup"
import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query"
import { useSelector } from "react-redux"
import * as yup from 'yup'
import MessageSuccess from "../../../components/MessageSuccess";
import ErrorMessage from './../../../components/ErrorMessage';
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { imageDb } from './../../../../pages/setting/Config';

const CourseForm = ({ course, courseId }) => {
    const [img, setImg] = useState("");
    const [imgUrl, setImgUrl] = useState([]);

    const [paidorNot, setPaidorNot] = useState(course?.typeOfCourse === "PAID" ? "PAID" : "")
    useEffect(() => {
        if (course) {
            setPaidorNot(course.typeOfCourse === "PAID" ? "PAID" : "");
        }
    }, [course]);
    const api = useSelector(state => state.apiLink.link)
    const queryClient = useQueryClient()
    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        description: yup.string(),
        instructor: yup.string().required("Instructor is required"),
        category: yup.string().required("Category is required"),
        duration: yup.string().required("Duration is required"),
        prerequisites: yup.string().required("Prerequisites are required"),
        level: yup.string().required("Level is required"),
        syllabus: yup.string().required("Syllabus is required"),
        typeOfCourse: yup.string().required("Type of Course is required"),
        image: yup.mixed(),
        price: yup.number().positive("Positive number only"),
        discount: yup.string()
    })

    const { mutate: creatingCourse, error: createError, isLoading: isCreating, isSuccess: isCreateSuccess } = useMutation(
        async (data) => {
            console.log("Submitting form data:", data);
            const response = await axios.post(`${api}/courses`, data);
            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('data')
                toast.success("Course created successfully")
            },
            onError: () => {
                toast.error("Failed to create Course");
            }
        }
    )
    const { mutate: updateingCourse, error: updateError, isLoading: isUpdating, isSuccess: isUpdateSuccess } = useMutation(
        async (data) => {
            const response = await axios.patch(`${api}/courses/${courseId}`, data);
            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('data');
                toast.success("Course updated successfully")
            },
            onError: () => {
                toast.error("Failed to update Course");
            }
        }
    )


    const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm({
        resolver: yupResolver(schema),
        defaultValues: course ? { ...course } : {}
    })

    const handlePaidorFree = (e) => {
        setPaidorNot(e.target.value)
    }


    const submitTheForm = (data) => {
        console.log("Form Data on Submit:", data)

        try {
            if (courseId) {
                updateingCourse(data)
                console.log("Image field value set:", getValues('image'));
                setValue('image', imgUrl);
                setPaidorNot("");
                console.log('Course updated successfully')
            } else {
                creatingCourse(data)
                console.log("Image field value set:", getValues('image'));
                setValue('image', imgUrl);
                setPaidorNot("");
                reset()

                console.log('Course created successfully')
            }
        } catch (error) {
            console.log(error);
        }
    }


    const handleClick = () => {
        console.log('dsds');
        if (img !== null) {
            const imgRef = ref(imageDb, `files/${v4()}`);
            uploadBytes(imgRef, img).then((value) => {
                console.log(value.metadata.name);
                console.log("ay7age",
                    `https://firebasestorage.googleapis.com/v0/b/e-learing-6119b.appspot.com/o/files%2F${value.metadata.name}?alt=media&token=5f589c95-499f-4830-89d0-927bd7b28774`
                );
                const image = `https://firebasestorage.googleapis.com/v0/b/e-learing-6119b.appspot.com/o/files%2F${value.metadata.name}?alt=media&token=5f589c95-499f-4830-89d0-927bd7b28774`;
                // dispatch(setUser({ ...user, image }));
                // console.log({ ...user, image });
                // upadeUser({ ...user, image });
                setImgUrl(image)
                console.log("image firebase url ", image)
                setTimeout(() => {
                    //   setLoading(false)
                    document.getElementById("upload").close();
                }, 500);
            });
        }
    };

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <form onSubmit={handleSubmit(submitTheForm)}>
                <div className="p-6.5">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <label className="mb-2.5 block text-black dark:text-white">
                                COURSE INSTRUCTOR
                            </label>
                            <input
                                type="text"
                                placeholder="Enter course instructor name"
                                {...register("instructor")}
                                className={`w-full rounded border-[1.5px] ${errors.instructor ? 'border-red-500' : 'border-stroke'} bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                            />
                            {errors.instructor && <p className="text-red-500">{errors.instructor.message}</p>}
                        </div>
                        <div className="w-full xl:w-1/2">
                            <label className="mb-2.5 block text-black dark:text-white">
                                COURSE TITLE
                            </label>
                            <input
                                type="text"
                                placeholder="Enter course title"
                                {...register("title")}
                                className={`w-full rounded border-[1.5px] ${errors.title ? 'border-red-500' : 'border-stroke'} bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                            />
                            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                        </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <label className="mb-2.5 block text-black dark:text-white">
                                CATEGORY
                            </label>
                            <input
                                type="text"
                                placeholder="Enter course category"
                                {...register("category")}
                                className={`w-full rounded border-[1.5px] ${errors.category ? 'border-red-500' : 'border-stroke'} bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                            />
                            {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                        </div>
                        <div className="w-full xl:w-1/2">
                            <label className="mb-2.5 block text-black dark:text-white">
                                DURATION
                            </label>
                            <input
                                type="text"
                                placeholder="Enter course duration"
                                {...register("duration")}
                                className={`w-full rounded border-[1.5px] ${errors.duration ? 'border-red-500' : 'border-stroke'} bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                            />
                            {errors.duration && <p className="text-red-500">{errors.duration.message}</p>}
                        </div>
                    </div>
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            COURSE TYPE
                        </label>
                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                            <select
                                {...register("typeOfCourse")}
                                onChange={handlePaidorFree}
                                className={`relative z-20 w-full appearance-none rounded border ${errors.typeOfCourse ? 'border-red-500' : 'border-stroke'} bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white`}
                            >
                                <option value="" disabled>Select Type</option>
                                <option value="FREE" className="text-body dark:text-bodydark">
                                    FREE
                                </option>
                                <option value="PAID" className="text-body dark:text-bodydark">
                                    PAID
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
                                            fill="#000"
                                        />
                                    </g>
                                </svg>
                            </span>
                        </div>
                        {errors.typeOfCourse && <p className="text-red-500">{errors.typeOfCourse.message}</p>}
                    </div>
                    {paidorNot === "PAID" && (
                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    PRICE
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter course price"
                                    {...register("price")}
                                    className={`w-full rounded border-[1.5px] ${errors.price ? 'border-red-500' : 'border-stroke'} bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                                />
                                {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                            </div>
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    DISCOUNT
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter course discount"
                                    {...register("discount")}
                                    className={`w-full rounded border-[1.5px] ${errors.discount ? 'border-red-500' : 'border-stroke'} bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                                />
                                {errors.discount && <p className="text-red-500">{errors.discount.message}</p>}
                            </div>
                        </div>
                    )}
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            SYLLABUS
                        </label>
                        <textarea
                            placeholder="Enter course syllabus"
                            {...register("syllabus")}
                            className={`w-full rounded border-[1.5px] ${errors.syllabus ? 'border-red-500' : 'border-stroke'} bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        />
                        {errors.syllabus && <p className="text-red-500">{errors.syllabus.message}</p>}
                    </div>
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            IMAGE
                        </label>
                        <input
                            type="file"
                            onChange={(e) => { setImg(e.target.files[0]), handleClick() }}
                            className={`w-full rounded border-[1.5px] ${errors.image ? 'border-red-500' : 'border-stroke'} bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        />

                        {errors.image && <p className="text-red-500">{errors.image.message}</p>}
                    </div>
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            LEVEL
                        </label>
                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                            <select
                                {...register("level", { required: "Level is required" })}
                                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white ${errors.level ? 'border-red-500' : ''}`}
                            >
                                <option value="" disabled>Select level</option>
                                <option value="Beginner" className="text-body dark:text-bodydark">
                                    Beginner
                                </option>
                                <option value="Intermediate" className="text-body dark:text-bodydark">
                                    Intermediate
                                </option>
                                <option value="Advanced" className="text-body dark:text-bodydark">
                                    Advanced
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
                        </div>
                        {errors.level && <p className="text-red-500">{errors.level.message}</p>}
                    </div>
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            PREREQUISITES
                        </label>
                        <input
                            type="text"
                            placeholder="Enter course prerequisites"
                            {...register("prerequisites")}
                            className={`w-full rounded border-[1.5px] ${errors.prerequisites ? 'border-red-500' : 'border-stroke'} bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        />
                        {errors.prerequisites && <p className="text-red-500">{errors.prerequisites.message}</p>}
                    </div>
                    <div className="mb-5.5">
                        <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="Username"
                        >
                            Description
                        </label>
                        <div className="relative">
                            <span className="absolute left-4.5 top-4">
                                <svg
                                    className="fill-current"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                                            fill=""
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                                            fill=""
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_88_10224">
                                            <rect width="20" height="20" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </span>

                            <textarea
                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                rows={6}
                                placeholder="Write your Descritpion here"
                                {...register("description")}
                            ></textarea>
                            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                        </div>
                    </div>
                    <div className="mb-4.5 flex justify-end">
                        <button
                            type="submit"
                            className="w-full rounded dark:bg-white dark:text-boxdark-2 text-white bg-boxdark font-bold py-3 px-5  transition dark:hover:bg-boxdark-2 dark:hover:text-white hover:bg-white hover:text-boxdark-2"
                            disabled={isCreating || isUpdating}
                        >
                            {courseId ? 'Update Course' : 'Create Course'}
                        </button>
                    </div>
                    {(isCreating || isUpdating) && <p>Processing...</p>}
                    {createError && <ErrorMessage name={"Course"} type={"created"} message={createError?.message} />}
                    {updateError && <ErrorMessage name={"Course"} type={"Updated"} message={updateError?.message} />}
                    {isCreateSuccess && <MessageSuccess name={"Course"} type={"created"} message={"You Successfully created a Course"} />}
                    {isUpdateSuccess && <MessageSuccess name={"Course"} type={"Updated"} message={"You Successfully updated the Course"} />}
                </div>
            </form>
        </>
    )
}

export default CourseForm