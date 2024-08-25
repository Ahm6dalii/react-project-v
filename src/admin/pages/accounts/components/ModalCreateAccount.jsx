/* eslint-disable react/prop-types */

import AccountForm from './AccountForm';

const ModalCreateAccount = ({ userId, info, display, style }) => {
    return (

        <>
            {
                display ? <button className="hover:text-primary" onClick={() => document.getElementById(`${userId}`).showModal()}>
                    <i className="fa-regular fa-pen-to-square"></i>
                </button>
                    : <button className={style} onClick={() => document.getElementById(`${userId}`).showModal()}>{userId ? 'Edit' : 'Create'}</button>
            }
            <dialog id={`${userId}`} className="modal">
                <div className="modal-box w-6/12 max-w-5xl dark:bg-black">
                    <div className=''>
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    {userId ? `Updating Account information : ${info?.email}` : "Creating Account"}
                                </h3>
                            </div>
                            <AccountForm userId={userId} info={info} />
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

export default ModalCreateAccount