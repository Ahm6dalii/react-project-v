import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AlertError from "../../components/alertError/AlertError";
import { useSelector } from "react-redux";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function Register() {
  const {translation}=useSelector(state=>state.lang)
 const  apiLink=useSelector(state=>state.apiLink.link)
  let navigate = useNavigate();
  let [allUser,setAllUser]=useState([])
  let [userExist,setUserExist]=useState(false)
  let [loading,setLoading]=useState(false)

  const axiosInstance = axios.create({ 
    withCredentials: true,  
})

  const getUser=async()=>{
    setUserExist(false)
    await  axiosInstance.get(`${apiLink}/users`)
    .then((res=>{
      console.log(res,'ssdsss');  
      setAllUser(res.data)
    })).catch(err=>{
      console.log(err);
      
    })
    ;
  }
  
  const createUser = async (user,resetForm ) => {
await axios.post(`${apiLink}/users`, user).then((res)=>{
toast.success(translation.accCreated)
      console.log('user created',res);

      setTimeout(() => {
        resetForm()
        setLoading(false);
        document.getElementById('signUp').close()
      }, 2000);

}).catch(error=> {
        console.error('Error creating user:', error);
        setLoading(false);
        toast.error(translation.accFailed)
    })
  };

  async function handleRegister(value,{ resetForm } ) {
    setLoading(true)
    getUser()
    const { rePassword, ...submitValues } = value;
     let foundedUser=allUser.find(user=>user.email==value.email)
     if(foundedUser){
        setUserExist(true)
        setLoading(false);
      }else{
        createUser(submitValues ,resetForm)
        navigate('/')
      }
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, `${translation.formNameErrMin}`)
      .max(10, `${translation.formNameErrMax}`)
      .required(`${translation.formNameReq}`),
    phone: Yup.string()
      .matches(
        /^^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5}$/,
        `${translation.formPhoneErr}`
      )
      .required(`${translation.formPhoneReq}`),
    email: Yup.string()
      .matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, `${translation.formEmailErr}`)
      .required(`${translation.formEmailReq}`),
    role: Yup.string(),
    password: Yup.string()
      .min(6, `${translation.formPasswordErr}`)
      .required(`${translation.formPasswordReq}`),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], `${translation.formRePasswordErr}`)
      .required(`${translation.formPasswordReq}`),
    image: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      role: "user",
      password: "",
      rePassword: "",
      image: "",
    },
    onSubmit: handleRegister,
    validationSchema,
    
  });


  useEffect(()=>{
      getUser()
  },[loading])

  return (<>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <div className="font-semibold text-xl">{translation.registerForm}</div>
      {userExist?<AlertError message={translation.formAccExist}></AlertError>:''}
      <form className=" flex flex-col p-2 gap-3" onSubmit={formik.handleSubmit}>
        <label className={`input  ${formik.touched.name && formik.errors.name?'input-error':'input-bordered'} flex items-center gap-2`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="grow"
            placeholder={`${translation.formName}`}
          />
        </label>
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-600">{formik.errors.name}</div>
        ) : null}

        <label  className={`input  ${formik.touched.phone && formik.errors.phone?'input-error':'input-bordered'} flex items-center gap-2`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M4.75 1A1.75 1.75 0 0 0 3 2.75v10.5A1.75 1.75 0 0 0 4.75 15h6.5A1.75 1.75 0 0 0 13 13.25V2.75A1.75 1.75 0 0 0 11.25 1h-6.5ZM4.5 2.75a.25.25 0 0 1 .25-.25h6.5a.25.25 0 0 1 .25.25v10.5a.25.25 0 0 1-.25.25h-6.5a.25.25 0 0 1-.25-.25V2.75ZM8 12.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>

          <input
            type="text"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="grow"
            placeholder={`${translation.formPhone}`}
          />
        </label>
        {formik.touched.phone && formik.errors.phone ? (
          <div className="text-red-600">{formik.errors.phone}</div>
        ) : null}

        <label  className={`input  ${formik.touched.email && formik.errors.email?'input-error':'input-bordered'} flex items-center gap-2`}>
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
            className="grow"
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

        <label  className={`input  ${formik.touched.rePassword && formik.errors.rePassword?'input-error':'input-bordered'} flex items-center gap-2`}>
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
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={`${translation.formRePassword}`}
            className="grow"
          />
        </label>
        {formik.touched.rePassword && formik.errors.rePassword ? (
          <div className="text-red-600">{formik.errors.rePassword}</div>
        ) : null}
        
      
        <div className="px-2  pb-2 pt-4">
                        <button 
                         type="submit"
                         disabled={loading}
                         className="btn uppercase block w-full  text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none"
                        >{
                          loading?<i className="fa fa-spinner fa-spin"></i>: `${translation.formRegister}`
                        }</button>
          </div>
      </form>
    </>
  );
}
