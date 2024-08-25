
import CourseForm from './CourseForm'
// eslint-disable-next-line react/prop-types
const CourseCreateModel = ({ courseId, course, display, style }) => {
    return (

        <>
            {
                display ? <button className="hover:text-primary" onClick={() => document.getElementById(`my_modal_${courseId}`).showModal()}>
                    <i className="fa-regular fa-pen-to-square"></i>
                </button>
                    : <button className={style} onClick={() => document.getElementById(`my_modal_${courseId}`).showModal()}>{courseId ? 'Edit' : 'Create'}</button >
            }
            <dialog id={`my_modal_${courseId}`} className="modal">
                <div className="modal-box w-8/12 max-w-5xl dark:bg-black">
                    <div className=''>
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    {
                                        courseId ? <h1 >Updating Course : {course?.title}</h1> : "creating Course"
                                    }
                                </h3>
                            </div>
                            <CourseForm course={course} courseId={courseId} />
                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default CourseCreateModel