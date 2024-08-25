import React from "react";
import Register from "../../pages/register/Register";
import UploadImg from "../../pages/setting/uploadImg/UploadImg";

export default function UploadDialog() {

  return <>

    <dialog id="upload" className="modal  modal-middle">
      <div className="modal-box dark:bg-slate-300 dark:text-black">
        <form method="dialog">
          <button className=" block ms-auto">
            <i className='fa-solid fa-x ms-auto inline-block w-2'></i>
          </button>
        </form>
        {/* <Register></Register> */}
        <UploadImg></UploadImg>

      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </>

}
