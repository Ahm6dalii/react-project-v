import React from "react";
import UploadDashImg from "./UploadDashImg";

export default function ImdDialog() {

  return  <>
 
<dialog id="upload1" className="modal  modal-middle">
  <div className="modal-box dark:bg-slate-300 dark:text-black">
  <form method="dialog">
    <button className=" block ms-auto">
  <i className='fa-solid fa-x ms-auto inline-block w-2'></i>  
    </button>
    </form>
    <UploadDashImg></UploadDashImg>

  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
    </>
  
}
