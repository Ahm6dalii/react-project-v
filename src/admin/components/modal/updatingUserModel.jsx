import CreateUser from "../../pages/users/createUser/CreateUser"

const UpdatingUserModel = ({ userId, info }) => {
    return (
        <>
            <button className="rounded-md hover:bg-green-100 text-green-600 p-2 flex justify-between items-center" onClick={() => document.getElementById(`modal_${userId}`).showModal()}>Edit</button>
            <dialog id={`modal_${userId}`} className="modal">
                <div className="modal-box w-11/12 max-w-5xl text-black">
                    <CreateUser userId={userId} info={info} />
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

export default UpdatingUserModel

