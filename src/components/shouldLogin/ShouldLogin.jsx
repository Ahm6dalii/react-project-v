import React from 'react'
import SignInDialog from '../signInDialog/signInDialog'
import { useSelector } from 'react-redux'

export default function ShouldLogin() {
    const {translation}=useSelector(state=>state.lang)

  return (
    <>
    <dialog id="shouldLogin" className="modal  modal-middle ">
    <div className="modal-box dark:bg-slate-300 dark:text-black">
    <form method="dialog">
      <button className=" block ms-auto">
    <i className='fa-solid fa-x ms-auto inline-block w-2'></i>  
      </button>
      </form>
            <p className='font-semibold fs-3 text-center mb-4'>{translation.loginFirst}</p>
        <div className='flex gap-2'>
            <button className="btn bg-transparent shadow-none border-0 mx-1 dark:text-white dark:hover:text-[#7c5cff] hover:text-[#7c5cff] hover:bg-[#d9d2f8]" onClick={()=>{document.getElementById(`signIn`).showModal(),document.getElementById('shouldLogin').close()
}}>{translation.signIn}</button>
            <button className="btn btnMain mx-1" onClick={()=>{document.getElementById(`signUp`).showModal(),document.getElementById('shouldLogin').close()}}>{translation.signUp}</button>
        </div>


    </div>
    <form method="dialog" className="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
    {/* <SignInDialog></SignInDialog> */}
    </>
  )
}
