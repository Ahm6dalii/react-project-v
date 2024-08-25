import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AlertError from "../../components/alertError/AlertError";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { setUser } from "../../redux/reducers/userAuthSlice";

export default function Login() {
  const {translation}=useSelector(state=>state.lang)
  const  apiLink=useSelector(state=>state.apiLink.link)
  let navigate = useNavigate();
  let [allUser,setAllUser]=useState([])
  let [userExist,setUserExist]=useState(false)
  let [passError,setPassError]=useState(false)
  let [loading,setLoading]=useState(false)
  let dispatch=useDispatch()

  const axiosInstance = axios.create({ 
    
    withCredentials: true,  
})

  const getUser=async()=>{
    setUserExist(false)
    await axiosInstance.get(`${apiLink}/users`).then((res=>{
      console.log(res.data,'dfdfs');
  
      setAllUser(res.data)
    })).catch(err=>{
      console.log(errr);
      
    })
  }


  useEffect(()=>{
    getUser()
      },[loading])

  async function handleLogin(value,{ resetForm } ) {
    setLoading(true)
    setPassError(false)
    setUserExist(false)

    getUser()
     let foundedUser=allUser.find(user=>user.email==value.email)
    
     if(!foundedUser){
        setUserExist(true)
        setLoading(false)
      }else{
        if(foundedUser.password!=value.password){
          setPassError(true)
          setLoading(false)
          return
         }
        console.log(foundedUser);
        const {password,role,...userData}=foundedUser   

        if(foundedUser.role=="admin")
        {
          setTimeout(() => {
            dispatch(setUser(userData))
            setLoading(false)
            resetForm()
            document.getElementById('signIn').close()
            navigate('/admin')
           }, 2000);

              return
        }else{
          setTimeout(() => {
            dispatch(setUser(userData))
            setLoading(false)
            resetForm()
            document.getElementById('signIn').close()
            navigate('/')
          }, 2000);
        }

      
      }
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,`${translation.formEmailErr}`)
      .required(`${translation.formEmailReq}`),
    role: Yup.string(),
    password: Yup.string()
      .min(6, `${translation.formPasswordErr}`)
      .required(`${translation.formPasswordReq}`)
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      role: "user",
      password: "",
    },
    onSubmit: handleLogin,
    validationSchema,
  });



  return<>
        <div className="font-semibold text-xl mb-4">{translation.loginForm}</div>

    <form  className=" text-black w-full px-4 lg:px-0 mx-auto flex flex-col gap-3" onSubmit={formik.handleSubmit}>
        <label   className={`input  ${formik.touched.email && formik.errors.email?'input-error':'input-bordered'} flex items-center gap-2`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="grow "
            placeholder={`${translation.formEmail}`}
          />
        </label>
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-600">{formik.errors.email}</div>
        ) : null}

        <label  className={`input  ${formik.touched.password && formik.errors.password?'input-error':'input-bordered'} flex items-center gap-2`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={`${translation.formPassword}`}
            className="grow"
          />
        </label>
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-600">{formik.errors.password}</div>
        ) : null}

          {userExist||passError?<div className="text-red-600 text-center my-1">{translation.formMailOrPassErr}</div>:''}

        <div className="px-2 pb-2 pt-4">
                        <button 
                         type="submit"
                         disabled={loading}
                         className="btn uppercase block w-full  text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none"
                        >{
                          loading?<i className="fa fa-spinner fa-spin"></i>:translation.formLogin
                        }</button>
          </div>
      </form>
  </>
  

}
