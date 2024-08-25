import UploadImg from "../../../pages/setting/uploadImg/UploadImg"

const UploadModal = () => {
    return (
        <>
            <dialog id="uploadd" className="modal  modal-middle">
                <div className="modal-box dark:bg-slate-300 dark:text-black">
                    <form method="dialog">
                        <button className=" block ms-auto">
                            <i className='fa-solid fa-x ms-auto inline-block w-2'></i>
                        </button>
                    </form>
                    <UploadImg></UploadImg>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default UploadModal