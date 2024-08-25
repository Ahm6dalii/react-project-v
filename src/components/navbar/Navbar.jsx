import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import './navebar.css'
import { useDispatch, useSelector } from 'react-redux'
import { changeLang } from '../../redux/reducers/languageSlice'
import { changeMode } from '../../redux/reducers/modeSlice'
import SignInDialog from '../signInDialog/signInDialog'
import SignUpDialog from '../signUpDialog/SignUpDialog'
import { logOutUser } from '../../redux/reducers/userAuthSlice'
import UploadDialog from '../uploadImgDialog/UploadDialog'
import { clearWishlist } from '../../redux/reducers/wishlistSlice'
import { clearCart } from '../../redux/reducers/cartSlice'
import { clearMyCourses } from '../../redux/reducers/myCourseSlice'

export default function Navbar() {
  const location = useLocation()
  const { pathname } = location
 const {user}=useSelector(state=>state.auth)
 const {language}=useSelector(state=>state.lang)
 const {translation}=useSelector(state=>state.lang)
 const {mode}=useSelector(state=>state.mode);
 const {cart}=useSelector(state=>state);
 const {wishlist}=useSelector(state=>state);
 let[total,setTotal]=useState()
 const navigate=useNavigate()
 console.log(mode);
 
 const dispatch=useDispatch()

 const handleChangeLang=(e)=>{
console.log(e.target.value);
dispatch(changeLang(e.target.value.toLowerCase()))

 }

 const logOut=()=>{
  dispatch( logOutUser())
  dispatch(clearWishlist())
  dispatch(clearMyCourses())
  dispatch(clearCart())
  
 }

 const calcTotals = () => {
  setTotal(cart?.reduce((total, course) => total + course.price, 0).toFixed(2))
};
useEffect(()=>{
  calcTotals()
},[cart])
  return (
    <div className={pathname.startsWith('/admin/') || pathname.startsWith('/admin') ? 'hidden' : ''}>

    <div className='dark:bg-slate-800 dark:text-white bg-base-100 shadow fixed end-0 start-0 top-0 z-[9999]'>
    <div className="max-w-screen-xl m-auto navbar   ">
    <div className="flex-none">
      <Link to="/" className=" text-xl">SkillQuest</Link>
    </div>
    
    {/* navbar links large screen */}
    <div className="   ms-auto hidden sm:flex">
    <ul className="flex gap-4 font-light menu-horizontal px-1">
      <li><NavLink to='/'>{translation.home}</NavLink></li>
      <li><NavLink to='/courses'>{translation.courses}</NavLink></li>
      <li><NavLink to='/contact'>{translation.contact}</NavLink></li>
      <li><NavLink to='/about'>{translation.about}</NavLink></li>
      
    </ul>
  </div>

{/* Language */}
<select className="select py-[1px] px-2 w-[60px]  max-w-xs ms-auto dark:text-black dark:bg-slate-300" onChange={handleChangeLang}>
  <option selected={language=='en'}>EN</option>
  <option selected={language=='ar'}>AR</option>
</select>

{/* Dark mood button */}
<label className="swap swap-rotate mx-2  ">
  {/* this hidden checkbox controls the state */}
  <input type="checkbox" checked={mode=='light'} className="theme-controller"   onChange={() => {}}
 value="synthwave" onClick={()=>dispatch(changeMode(mode=='light'?'dark':'light'))} />

  {mode=='light'&&
  /* moon icon */
   <svg
   className="swap-on h-7 w-7 fill-current text-black "
   xmlns="http://www.w3.org/2000/svg"
   viewBox="0 0 24 24">
   <path
     d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
 </svg>
   /* sun icon */
  }{mode=='dark'&&<svg
    className="swap-off h-7 w-7 fill-current "
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <path
      d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
  </svg>

}
  
  
 
</label>
{
user?
 <>
 {/* Wish */}
        
      <button className="dropdown dropdown-end   "  onClick={()=>navigate('/wishlist')}>
     <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
       <div className="indicator ">
       <i className="fa-solid dark:text-white fa-heart text-sm text-black fa-xl"></i>
         <span className="badge badge-sm indicator-item top-[-8px]">{wishlist.length }</span>
       </div>
     </div>
   
     
   </button>
 {/* Cart */}
     <div className="dropdown dropdown-end   ">
     <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
       <div className="indicator">
         <svg
           xmlns="http://www.w3.org/2000/svg"
           className="h-5 w-5"
           fill="none"
           viewBox="0 0 24 24"
           stroke="currentColor">
           <path
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth="2"
             d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
         </svg>
         <span className="badge badge-sm indicator-item">{cart.length}</span>
       </div>
     </div>
     <div
       tabIndex={0}
       className="card card-compact dropdown-content bg-base-100 z-[200] mt-3 w-52 shadow dark:bg-slate-200">
       <div className="card-body ">
         <span className="text-lg font-bold dark:text-black">{cart.length}Items</span>
         <span className="text-info">Subtotal: ${total}</span>
         <div className="card-actions">
           <button onClick={()=>navigate('/cart')} className="btn btn-primary btn-block">View cart</button>
           
         </div>
       </div>
     </div>
   </div>

 {/* avatar */}
 <div className="    sm:flex dark:text-black">     
   <div className="dropdown dropdown-end ">
     <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
       <div className="w-10 rounded-full">
         <img
           alt="Tailwind CSS Navbar component"
           src={user?.image} />
       </div>
     </div>
     <ul
       tabIndex={0}
       className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow dark:bg-slate-200">
       <span>
         <p className="flex justify-between uppercase font-semibold">
           {user?.name}
           <span className="badge">{translation?.new}</span>
         </p>
       </span>
       <li ><Link to="/setting">{translation?.setting}</Link></li>
       {/* <li  onClick={()=>document.getElementById(`upload`).showModal()}>{translation?.setting}</li> */}
       {/* <button className="btn btnMain mx-1" onClick={()=>document.getElementById(`signUp`).showModal()}>{translation.signUp}</button> */}
       <UploadDialog></UploadDialog>
       <li><Link to="/" onClick={logOut} >{translation?.logout}</Link></li>
     </ul>
   </div>
 </div>
 </>
:<>
<div className='hidden sm:flex'>
<button className="btn bg-transparent shadow-none border-0 mx-1 dark:text-white dark:hover:text-[#7c5cff] hover:text-[#7c5cff] hover:bg-[#d9d2f8]" onClick={()=>document.getElementById(`signIn`).showModal()}>{translation.signIn}</button>
<button className="btn btnMain mx-1" onClick={()=>document.getElementById(`signUp`).showModal()}>{translation.signUp}</button>
</div>
<SignInDialog ></SignInDialog>
<SignUpDialog ></SignUpDialog>

</>
}
   

    {/* Mobile navbat menu */}
    <div className=" sm:hidden">
    <div className="dropdown dropdown-end ">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow dark:bg-slate-200 dark:text-black">
            <li><NavLink to='/'>{translation.home}</NavLink></li>
        <li><NavLink to='/courses'>{translation.courses}</NavLink></li>
      <li><NavLink to='/contact'>{translation.contact}</NavLink></li>
      <li><NavLink to='/about'>{translation.about}</NavLink></li>
      
       {!user&& <>
        <li className='sm:hidden'><button className="btn btnMain mx-1" onClick={()=>document.getElementById(`signUp`).showModal()}>{translation.signUp}</button></li>
        <li className='sm:hidden'><button className="btn bg-transparent shadow-none border-0 mx-1 dark:text-white dark:hover:text-[#7c5cff] hover:text-[#7c5cff] hover:bg-[#d9d2f8]" onClick={()=>document.getElementById(`signIn`).showModal()}>{translation.signIn}</button></li>
       </>} 
      </ul>
    </div>
  </div>
  </div>
    </div>
    </div>
  )
}
