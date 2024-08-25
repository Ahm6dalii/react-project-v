import React from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import {activee} from "./setting.module.css"
export default function Setting() {
    const {translation}=useSelector(state=>state.lang)
    const {pathname}=useLocation()
    console.log(pathname);
    
  return (
    
<div className="mt-12 dark:bg-slate-900 dark:text-white bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931] ">
  <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
    <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
      <h2 className="pl-3 mb-4 text-2xl font-semibold"><i class="fa-solid fa-gear me-3"></i>{translation?.setting}</h2>
      <Link to="/setting" className={`flex items-center px-3 py-2.5 font-bold hover:text-indigo-900 hover:border hover:rounded-full ${pathname=="/setting"?"border rounded-full  border-indigo-900 " :''}`}>
       {translation?.publicProfile}
      </Link>
      <Link to="/setting/account" className={`flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full ${pathname=="/setting/account"?"border rounded-full border-indigo-900 " :''}`}>
      {translation?.accountSetting}
      </Link>
      <Link to="/setting/mycourses" className={`flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full ${pathname=="/setting/account"?"border rounded-full border-indigo-900 " :''}`}>
      {translation?.accountMyCourses}
      </Link>
 
    </div>
  </aside>
  <div className="md:hidden  flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
      <h2 className="pl-3 mb-4 text-2xl font-semibold"><i class="fa-solid fa-gear me-3"></i>{translation?.setting}</h2>
      <Link to="/setting" className={`flex items-center px-3 py-2.5 font-bold hover:text-indigo-900 hover:border hover:rounded-full ${pathname=="/setting"?"border rounded-full  border-indigo-900 " :''}`}>
       {translation?.publicProfile}
      </Link>
      <Link to="/setting/account" className={`flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full ${pathname=="/setting/account"?"border rounded-full border-indigo-900 " :''}`}>
      {translation?.accountSetting}
      </Link>
      <Link to="/setting/mycourses" className={`flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full ${pathname=="/setting/account"?"border rounded-full border-indigo-900 " :''}`}>
      {translation?.accountMyCourses}
      </Link>
 
    
    </div>
  <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
   
    <Outlet></Outlet>
  </main>
</div>

  )
}
