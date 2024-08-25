
import React from "react";
import RemoveProfilePic from "../../pages/setting/removeProfilePic/RemoveProfilePic";

export default function RemoveImgDialog() {

  return  <>
 
<dialog id="remove" className="modal  modal-middle">
  <div className="modal-box dark:bg-slate-300 dark:text-black">
  <form method="dialog">
    <button className=" block ms-auto">
  <i className='fa-solid fa-x ms-auto inline-block w-2'></i>  
    </button>
    </form>
    
    <RemoveProfilePic></RemoveProfilePic>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
    </>
  
}
