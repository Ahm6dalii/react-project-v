import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { setUser } from "../../../redux/reducers/userAuthSlice";

export default function RemoveProfilePic() {
    const { user } = useSelector((state) => state.auth);
    const apiLink = useSelector((state) => state.apiLink.link);
    const { translation } = useSelector((state) => state.lang);
    let [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const axiosInstance = axios.create({ 
    
      withCredentials: true,  
  })

    const upadeUser = async () => {
        setLoading(true)
        try {
          const response = await axiosInstance.patch(`${apiLink}/users/${user.id}`, {image:"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png"});
          console.log(response);
            toast.success(translation.imgRemoveSuccful)
            dispatch(setUser(response.data));
            setTimeout(() => {
                setLoading(false)
                document.getElementById("remove").close();
            }, 200);
        } catch (error) {
            setLoading(false)
            toast.success(translation.fail)
          console.error("Error creating user:", error);
        }
      };
    
    const closeModel=()=>{
        document.getElementById("remove").close();

    }
  return (
    <div>
            <p className="font-semibold text-center mb-4">{translation.areYouSure}</p>
            <div className='flex gap-4 '>
            <button disabled={loading} className="px-6 rounded  duration-300 py-2 bg-red-300 hover:bg-red-700 transion text-white" onClick={upadeUser}>
                
                {loading?<i className="fa fa-spinner fa-spin"></i>: `${translation.yes}`}

                </button>
            <button className="px-6 rounded  uration-300 py-2 border border-red-300 hover:border-red-700 transion" onClick={closeModel} >{translation.no}</button>

            </div>
    </div>
  )
}
