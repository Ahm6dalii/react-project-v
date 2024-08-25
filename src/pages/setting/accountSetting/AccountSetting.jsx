import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadDialog from "../../../components/uploadImgDialog/UploadDialog";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { setUser } from "../../../redux/reducers/userAuthSlice";
import AlertError from "../../../components/alertError/AlertError";
import RemoveImgDialog from "../../../components/removeImgDialog/removeImgDialog";

export default function AccountSetting() {
  const { user } = useSelector((state) => state.auth);
  const dispatch=useDispatch()
  const {translation} = useSelector((state) => state.lang);
  let [loading, setLoading] = useState(false);
  const apiLink = useSelector((state) => state.apiLink.link);

  async function handleRegister(value, { resetForm }) {
    console.log(value); 
    setLoading(true);
    upadeUser(value ,resetForm)

  }
  const axiosInstance = axios.create({ 
    
    withCredentials: true,  
})
  const upadeUser = async (userPass,resetForm) => {

    try {
      const response = await axiosInstance .patch(`${apiLink}/users/${user.id}`, userPass)
      console.log(response);
      toast.success(translation.userUpdated);
      setLoading(false);
      resetForm()
    } catch (error) {
      setLoading(false);
      console.error("Error creating user:", error);
    }
  };


  let validationSchema = Yup.object().shape({
    password: Yup.string()
    .min(6, `${translation.formPasswordErr}`)
    .required(`${translation.formPasswordReq}`),
  rePassword: Yup.string()
    .oneOf([Yup.ref("password"), null], `${translation.formRePasswordErr}`)
    .required(`${translation.formPasswordReq}`),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      rePassword: "",
     
    },
    onSubmit: handleRegister,
    validationSchema,
  });

  return (
    <div className="grid max-w-2xl mx-auto mt-8">
      <h2 className="pl-6 text-2xl font-bold sm:text-xl">
      <i class="fa-solid fa-key me-3"></i>
            {translation?.changeUserPassword}
          </h2>
 <form
              className="items-center mt-8 sm:mt-14 text-[#202142]"
              onSubmit={formik.handleSubmit}
            >
  

              {/* password */}
              <div className="mb-2 sm:mb-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                {translation.formEmail}

                </label>
                <input   
                 type="password"
                 name="password"
                 value={formik.values.password}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                   id="password"
                  className={` ${formik.touched.password && formik.errors.password?'input-error':'input-bordered'} bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5`}
                  placeholder={`${translation.formPassword}`}
                  />
                {/* error */}
                {formik.touched.password && formik.errors.password ? (
          <div className="text-red-600">{formik.errors.password}</div>
        ) : null}

              </div>

              {/* rePassword*/}
              <div className="mb-2 sm:mb-6">
                <label
                  htmlFor="rePassword"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                {translation.formRePassword}

                </label>
                <input   
                    type="password"
                    name="rePassword"
                    value={formik.values.rePassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  id="rePassword"
                  className={` ${formik.touched.rePassword && formik.errors.rePassword?'input-error':'input-bordered'} bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5`}
                  placeholder={`${translation.formRePassword}`}
                  />
                {/* error */}
                {formik.touched.rePassword && formik.errors.rePassword ? (
          <div className="text-red-600">{formik.errors.rePassword}</div>
        ) : null}

              </div>


              <div className="flex justify-end">
                <button
                  type="submit"
                  className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                >
               {loading?<i className="fa fa-spinner fa-spin"></i>: `${translation.save}` } 
                  
                </button>
              </div>
            </form>

</div>
  )
}
