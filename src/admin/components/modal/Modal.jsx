/* eslint-disable react/prop-types */

const Modal = ({ id, handleDelete, text }) => {
    return (
        <>
            <button className="text-xl  text-white bg-red-600 py-2 px-2 rounded-xl shadow-lg" onClick={() => document.getElementById(`modal1_${id}`).showModal()}>Delete</button>
            <dialog id={`modal1_${id}`} className="modal ">
                <div className="modal-box dark:bg-boxdark dark:text-white">
                    <p className="py-4 ">are you sure you want to delete  <span className=" font-bold text-boxdark dark:text-white"> {text}</span> </p>
                    <div className="flex justify-between px-10">
                        <form method="dialog">
                            <button className="text-xl  text-white bg-red-600 py-2 px-2 rounded-xl shadow-lg hover:bg-red-800" onClick={() => handleDelete(id)}>
                                <span></span> Delete
                            </button>
                        </form>
                        <form method="dialog">
                            <button className="text-xl  hover:bg-boxdark dark:text-boxdark dark:bg-white bg-boxdark-2 text-white py-2 px-2 rounded-xl shadow-lg dark:hover:bg-grey-200">Close</button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default Modal