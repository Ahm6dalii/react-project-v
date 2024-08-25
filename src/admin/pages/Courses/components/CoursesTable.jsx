/* eslint-disable react/prop-types */

import Loader from "../../../components/old/Loader/Loader"
import BinModal from "../../../components/modal/BinModal"
import useCourses from "../../../hooks/useCourses"
import Pagination from "../../../components/Pagination/pagination";
import { useEffect } from "react";
import CourseCreateModel from "./CourseCreateModel";

const CoursesTable = ({ searchValue, display }) => {
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
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-20">
                <div className="py-6 px-4 md:px-6 xl:px-7.5">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        Courses
                    </h4>
                </div>
                <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                    <div className="col-span-3 flex items-center">
                        <p className="font-medium">Course Name</p>
                    </div>
                    <div className="col-span-1 items-center hidden sm:flex">
                        <p className="font-medium">Category</p>
                    </div>
                    <div className="col-span-1 items-center hidden sm:flex">
                        <p className="font-medium">Status</p>
                    </div>
                    <div className="col-span-1  items-center hidden sm:flex">
                        <p className="font-medium">Price</p>
                    </div>
                    <div className="col-span-1  items-center hidden sm:flex">
                        <p className="font-medium">Level</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Actions</p>
                    </div>
                </div>
                {search && search.length > 0
                    ? search.map((course) => (
                        <div key={course.id}
                            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                            <div className="col-span-3 flex items-center">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                    <div className="h-12.5 w-15 rounded-md overflow-hidden">
                                        <img className="object-cover w-full h-full" src={course?.image || "https://www.filepicker.io/api/file/S5atf80QTb2tZOScHsiW"} alt="Product" />
                                    </div>
                                    <p className="text-sm text-black dark:text-white">
                                        {course?.title}
                                    </p>
                                </div>
                            </div>
                            <div className="col-span-1 hidden sm:flex items-center">
                                <p className="text-sm px-3 text-black dark:text-white line-clamp-1">
                                    {course?.category}
                                </p>
                            </div>
                            <div className="col-span-1 hidden sm:flex items-center">
                                <p
                                    className='inline-flex rounded-full bg-opacity-10 py-1 px-1 text-sm font-medium'>
                                    {course.free || course.typeOfCourse === "FREE" ? (
                                        <span
                                            className='inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium bg-blue-400 text-blue-800'>Free</span>
                                    ) : (
                                        <span
                                            className='inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium bg-success text-success'>Paid</span>
                                    )}
                                </p>
                            </div>
                            <div className="col-span-1 hidden sm:flex items-center">
                                <p className="text-sm text-black dark:text-white">
                                    {course.free || course.typeOfCourse === "FREE" ? 'No money' : `$${course.price}`}
                                </p>
                            </div>

                            <div className="col-span-1 hidden sm:flex items-center">
                                <p className="text-sm text-black dark:text-white">{course.level}</p>
                            </div>
                            <div className="col-span-1 flex items-center gap-3">
                                <CourseCreateModel courseId={course.id} course={course} display={display} />
                                <BinModal id={course.id} text={course.title} handleDelete={handleDelete} />
                            </div>
                        </div>
                    ))
                    : <div>No courses available</div>
                }

            </div>
            {!searchValue && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} courses={courses} />
            }

        </>

    )
}

export default CoursesTable