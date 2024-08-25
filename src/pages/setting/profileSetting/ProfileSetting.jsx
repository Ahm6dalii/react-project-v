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
export default function ProfileSetting() {
  const { user } = useSelector((state) => state.auth);
  const dispatch=useDispatch()
  const { translation } = useSelector((state) => state.lang);
  let [userExist, setUserExist] = useState(false);
  let [loading, setLoading] = useState(false);
  let [allUser, setAllUser] = useState([]);
  const apiLink = useSelector((state) => state.apiLink.link);
  const axiosInstance = axios.create({ 
    
    withCredentials: true,  
})
  const upadeUser = async (userU,resetForm) => {
    console.log(user);

    try {
      const response = await axiosInstance.patch(`${apiLink}/users/${userU.id}`, userU);
      console.log(response);
      toast.success(translation.userUpdated);
      dispatch(setUser(userU));
      setLoading(false);

      resetForm()
    } catch (error) {
      setLoading(false);
      console.error("Error creating user:", error);
    }
  };

  const getUser = async () => {
    setUserExist(false);
    await axiosInstance
      .get(`${apiLink}/users`)
      .then((res) => {
        console.log(res, "ssdsss");
        setAllUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function handleRegister(value, { resetForm }) {
    setLoading(true);
    setUserExist(false);
    const newObj = {};

    getUser()
    let foundedUser = allUser?.find((user) => user.email == value.email);
    if (foundedUser) {
      setUserExist(true);
      setLoading(false);
      console.log('ddd');
      
    } else {
      const { fname, lname, email, profession, phone } = value;
      const fullname = `${fname} ${lname}`;
      (fullname!='') ? newObj.name = fullname:newObj.name = user.name;
      if (email!='') newObj.email = email;
      if (profession!='') newObj.profeesion = profession;
      if (phone!='') newObj.phone = phone;
      console.log({...user,...newObj});

        upadeUser({...user,...newObj},resetForm)
     
    }
  }

  let validationSchema = Yup.object().shape({
    fname: Yup.string()
      .min(3, `${translation.formNameErrMin}`)
      .max(15, `${translation.formNameErrMax}`)
      .required(`${translation.formNameReq}`),

    lname: Yup.string()
      .min(3, `${translation.formNameErrMin}`)
      .max(15, `${translation.formNameErrMax}`)
      .required(`${translation.formNameReq}`),

    phone: Yup.string().matches(
      /^^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5}$/,
      `${translation.formPhoneErr}`
    ),
    email: Yup.string().matches(
      /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
      `${translation.formEmailErr}`
    ),
    profession: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      phone: "",
      email: "",
      profession: "",
    },
    onSubmit: handleRegister,
    validationSchema,
  });

  useEffect(() => {
    getUser();
  }, [loading]);
  return (
    <>
      <div className="p-2 md:p-4  ">
        <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
          <h2 className="pl-6 text-2xl font-bold sm:text-xl">
          <i class="fa-solid fa-user me-3"></i>
            {translation?.publicProfile}
          </h2>
          <div className="grid max-w-2xl mx-auto mt-8">
            <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
              <img
                className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                src={`${user?.image}`}
                alt="Bordered avatar"
              />
              <div className="flex flex-col space-y-5 sm:ml-8">
                <button
                  onClick={() => document.getElementById(`upload`).showModal()}
                  type="button"
                  className="py-3.5 px-7 ms-3 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                >
                  {translation?.changeImage}
                </button>
                <button
                onClick={() => document.getElementById(`remove`).showModal()}

                  type="button"
                  className="py-3.5 px-7 text-base ms-3 font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                >
                  {translation?.deleteImg}
                </button>
              </div>
            </div>
            <form
              className="items-center mt-8 sm:mt-14 text-[#202142]"
              onSubmit={formik.handleSubmit}
            >
   {userExist?<AlertError message={translation.formAccExist}></AlertError>:''}

              <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div className="w-full">
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    {translation.formFname}
                  </label>
                  <input
                    type="text"
                    name="fname"
                    value={formik.values.fname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    id="first_name"
                    className={` ${formik.touched.fname && formik.errors.fname?'input-error':'input-bordered'} bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5`}
                    placeholder={translation.formFname}
                  />
                    {/* error */}
                {formik.touched.fname && formik.errors.fname ? (
          <div className="text-red-600">{formik.errors.fname}</div>
        ) : null}
                </div>
                <div className="w-full">
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                  >
                   {translation.formLname}
                  </label>
                  <input
                    name="lname"
                    value={formik.values.lname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    id="last_name"
                    className={` ${formik.touched.lname && formik.errors.lname?'input-error':'input-bordered'} bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5`}
                    placeholder={translation.formLname}

                  />
                      {/* error */}
                {formik.touched.lname && formik.errors.lname ? (
          <div className="text-red-600">{formik.errors.lname}</div>
        ) : null}
                </div>
              

              </div>
              {/* email */}
              <div className="mb-2 sm:mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                {translation.formEmail}

                </label>
                <input   
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="email"
                  id="email"
                  className={` ${formik.touched.email && formik.errors.email?'input-error':'input-bordered'} bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5`}
                  placeholder={translation.formEmailLabel}
                />
                {/* error */}
                {formik.touched.email && formik.errors.email ? (
          <div className="text-red-600">{formik.errors.email}</div>
        ) : null}

              </div>

              {/* phone */}
              <div className="mb-2 sm:mb-6">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                  {translation.formPhoneLabel}
                </label>
                <input
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="tel"
                  id="phone"
                  className={` ${formik.touched.phone && formik.errors.phone?'input-error':'input-bordered'} bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5`}
                  placeholder= {translation.formPhone}
                />
                {/* error */}
                    {formik.touched.phone && formik.errors.phone ? (
          <div className="text-red-600">{formik.errors.phone}</div>
        ) : null}
              </div>
          

             {/* Profession */}
              <div className="mb-2 sm:mb-6">
                <label
                  htmlFor="profession"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                  {translation.formProfession}
                </label>
                <input
                  name="profession"
                  value={formik.values.profession}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  id="profession"
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                  placeholder={translation.formProfessionLabel}
                />
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
        </div>
      </div>
      <UploadDialog></UploadDialog>
      <RemoveImgDialog></RemoveImgDialog>
    </>
  );
}
