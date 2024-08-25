import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import { useSelector } from 'react-redux'
import Footer from '../../components/footer/Footer'
import { Toaster } from 'react-hot-toast'

export default function () {
  const {language}=useSelector(state=>state.lang)
  const {mode}=useSelector(state=>state.mode)

  return (
    <>
    <div className={`${mode=='light'?'':'dark'}`}>
    <div dir={language=='ar'?'rtl':'ltr'}  className={`   dark:bg-slate-900 dark:text-white` } >
    <Navbar></Navbar>
    <div className='min-h-screen  m-auto'>
    <Toaster 
  position="top-center"
  reverseOrder={false}
    />
    <Outlet></Outlet>  
    </div>
    <Footer></Footer>
    </div>
    </div>

    </>
  )
}
