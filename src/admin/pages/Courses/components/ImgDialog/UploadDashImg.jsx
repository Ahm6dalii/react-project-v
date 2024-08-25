import React, { useEffect, useState } from "react";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import { setUser } from "../../../redux/reducers/userAuthSlice";
import toast, { Toaster } from "react-hot-toast";
import { imageDb } from './../../../../../pages/setting/Config';
import { setUser } from "../../../../../redux/reducers/userAuthSlice";

export default function UploadDashImg() {
  const { user } = useSelector((state) => state.auth);
  const apiLink = useSelector((state) => state.apiLink.link);
  const { translation } = useSelector((state) => state.lang);
  let [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const [img, setImg] = useState("");
  const [imgUrl, setImgUrl] = useState([]);

  const upadeUser = async (userU) => {
    setLoading(true)
    console.log(user);

    try {
      const response = await axios.patch(`${apiLink}/users/${userU.id}`, userU);
      console.log(response);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("Error creating user:", error);
    }
  };

  const handleClick = () => {
    console.log('dsds');
    setLoading(true)
    if (img !== null) {
      const imgRef = ref(imageDb, `files/${v4()}`);
      uploadBytes(imgRef, img).then((value) => {
        console.log(value.metadata.name);
        console.log(
          `https://firebasestorage.googleapis.com/v0/b/e-learing-6119b.appspot.com/o/files%2F${value.metadata.name}?alt=media&token=5f589c95-499f-4830-89d0-927bd7b28774`
        );
        const image = `https://firebasestorage.googleapis.com/v0/b/e-learing-6119b.appspot.com/o/files%2F${value.metadata.name}?alt=media&token=5f589c95-499f-4830-89d0-927bd7b28774`;
        // dispatch(setUser({ ...user, image }));
        // console.log({ ...user, image });
        // upadeUser({ ...user, image });
        setTimeout(() => {
          setLoading(false)
          document.getElementById("upload").close();
        }, 500);
      });
    }
  };



  return (
    <>
      <div className="App">
        <input
          type="file"
          name={translation?.fileName}
          accept="image/*"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <button disabled={!img} className="btnSecondary" onClick={handleClick}>
          {  loading?<i className="fa fa-spinner fa-spin"></i>: `${translation?.upload}`}
        </button>
        <br />

      </div>
    </>
  );
}
