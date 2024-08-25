import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

export default function MyCourses() {
  const myCourses=  useSelector(state=>state.myCourse);
     const   search= [].concat(...myCourses);

    console.log(search,'dsdsdsdsadsaa');
    useEffect(()=>{

    },[ myCourses])
  return (

    <>
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-20">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
            <h4 className="text-xl font-semibold text-black dark:text-white">
                Courses
            </h4>
        </div>
        <div className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5">
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
        </div>
        {search.length!==0? search.map((course) => (
                <div key={course.id}
                    className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5">
                    <div className="col-span-3 flex items-center">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="h-12.5 w-15 rounded-md">
                                <img src={course?.image || "https://www.filepicker.io/api/file/S5atf80QTb2tZOScHsiW"} alt="Product" />
                            </div>
                            <p className="text-sm text-black dark:text-white">
                                {course?.title}
                            </p>
                        </div>
                    </div>
                    <div className="col-span-1 hidden sm:flex items-center">
                        <p className="text-sm px-3 text-black dark:text-white">
                            {course?.category}
                        </p>
                    </div>
                    <div className="col-span-1 hidden sm:flex items-center">
                        <p
                            className='inline-flex rounded-full bg-opacity-10 py-1 px-1 text-sm font-medium'>
                             
                                <span
                                    className='inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium bg-success text-success'>Paid</span>
                            
                        </p>
                    </div>
                    <div className="col-span-1 hidden sm:flex items-center">
                        <p className="text-sm text-black dark:text-white">
                            { `$${course?.price}`}
                        </p>
                    </div>

                    <div className="col-span-1 hidden sm:flex items-center">
                        <p className="text-sm text-black dark:text-white">{course?.level}</p>
                    </div>
                  
                </div>
            ))
            : <div className='text-center py-5 text-blue-500'>No courses available</div>
        }

    </div>
    {/* {!searchValue && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} courses={courses} /> */}
    {/* } */}

</>
  )
}
