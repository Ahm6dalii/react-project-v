import React from 'react'
import Login from '../../pages/login/login'

export default function SignInDialog({btnName,btnColor,id}) {
  return <>

<dialog id="signIn" className="modal  modal-middle ">
  <div className="modal-box dark:bg-slate-300 dark:text-black">
  <form method="dialog">
    <button className=" block ms-auto">
  <i className='fa-solid fa-x ms-auto inline-block w-2'></i>  
    </button>
    </form>
    <Login></Login>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>


</>  
}
