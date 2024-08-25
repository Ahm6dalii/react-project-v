/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */

import Modal from "../../../components/modal/Modal"
import CourseCreateModel from "./CourseCreateModel"
import Loader from './../../../common/Loader/index';
import useCourses from "../../../hooks/useCourses"
import Pagination from "../../../components/Pagination/pagination";
import { useEffect } from "react";

const CoursesCards = ({ searchValue }) => {
    const { error, isLoading, courses, handleDelete, currentPage, setCurrentPage, setPerPage } = useCourses()
    const search = courses && courses?.data.filter(item => item.title?.toLowerCase().includes(searchValue?.toLowerCase()))
    useEffect(() => {
        if (searchValue) {
            setPerPage(200);
        } else {
            setPerPage(10)
        }
    }, [searchValue, setPerPage])
    if (error) return <h1>Error : {error.message} </h1>
    if (isLoading) return <Loader />
    return (
        <>
            <div className=" flex justify-center items-center py-20 ">
                <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
                    {search && search.length > 0
                        ? search.map((course) => (
                            <div key={course.id} className="max-w-sm  bg-white dark:border-strokedark dark:bg-boxdark  px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
                                <h3 className="mb-3 text-xl font-bold text-indigo-600">{course.level}</h3>
                                <div className="relative">
                                    <img className="w-full rounded-xl h-40 object-cover" src={course?.image || "https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"} alt="Colors" />
                                    {course.free || course.typeOfCourse === "FREE" ? (
                                        <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">Free</p>
                                    ) : (
                                        <>
                                            <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
                                                ${course.price}
                                            </p>
                                            {course.discount && (
                                                <p className="absolute top-0 right-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-tr-lg rounded-bl-lg">
                                                    {course.discount}% Discount
                                                </p>
                                            )}
                                        </>
                                    )}
                                </div>
                                <h1 className="mt-4 text-gray-800 text-xl font-bold cursor-pointer  min-h-14">{course.title}</h1>
                                <div className="my-1">
                                    <div className="flex space-x-1 items-center">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </span>
                                        <p>{course.duration} </p>
                                    </div>
                                    <div className="flex space-x-1 items-center">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </span>
                                        <p>{course.instructor}</p>
                                    </div>
                                    <div className="flex space-x-1 items-center align-middle ">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                            </svg>
                                        </span>
                                        <p>{course.category}</p>
                                    </div>
                                    <div className="mt-3   flex justify-center align-middle gap-15">
                                        <CourseCreateModel courseId={course.id} course={course} style={" text-xl  text-white bg-indigo-900 py-2 px-4 rounded-xl shadow-lg"} />
                                        <Modal id={course.id} text={course.title} handleDelete={handleDelete} />
                                    </div>
                                </div>
                            </div>
                        ))
                        : <div>No courses available</div>
                    }
                </div>
            </div>

            {!searchValue && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} courses={courses} />
            }
        </>
    )
}

export default CoursesCards