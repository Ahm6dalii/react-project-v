import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/reducers/wishlistSlice";
import { addToCart, removeFromCart } from "../../redux/reducers/cartSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import ShouldLogin from "../shouldLogin/ShouldLogin";
import toast from "react-hot-toast";

/* eslint-disable react/prop-types */
export default function CardOfCourses(props) {
  const {user}=useSelector(state=>state.auth)

  const dispatch = useDispatch();
  const coursesInWislist = useSelector((state) => state.wishlist);
  const coursesInCart = useSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(false);

  const alreadyInWish = coursesInWislist.some(
    (course) => course.id === props.course.id
  );
  const alreadyInCart = coursesInCart.some(
    (course) => course.id === props.course.id
  );

  const wishlistActions = () => {
    if (alreadyInWish) {
      toast.success("Removed Successful")

      dispatch(removeFromWishlist(props.course));
    } else {
      toast.success("Add Successful")

      dispatch(addToWishlist(props.course));
    }
  };

  const handleCartActions = () => {
    if (alreadyInCart) {
      dispatch(removeFromCart(props.course));
      toast.success("Removed Successful")
    } else {
      setIsLoading(true);
      setTimeout(() => {
        toast.success("Add Successful")
        dispatch(addToCart(props.course));
        setIsLoading(false);
      }, 1000);
    }
  };
  return (
    <>


      <div dir={'ltr'} className="dark:bg-slate-200 dark:text-slate-700 rounded-md relative  flex flex-col justify-between h-full max-w-xs">
        <div className=" max-w-sm  bg-gray-100 px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-100 transition duration-500">

          <h3 className="mb-3 text-xl font-bold text-indigo-600">
            {props.level}
          </h3>
          <div className="relative">
            <Link to={`/course/${props.id}`}>
              <img
                className="w-full rounded-xl h-40 object-cover"
                src={props?.image}
                alt={props.title}
              />
            </Link>
            {props.free || props.typeOfCourse === "FREE" ? (
              <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">Free</p>
            ) : (
              <>
                <p className="absolute top-0 bg-yellow-300 text-gray-800 font-bold py-1 px-3 rounded-br-lg rounded-tl-lg ">
                  <del>${props.price}</del>
                </p>
                {props.discount && (
                  <p className="absolute top-0 right-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-tr-lg rounded-bl-lg">
                    {props.discount}% Discount
                  </p>
                )}
              </>)
            }
          </div>

          <h1 className="mt-4 text-gray-800 text-md font-bold cursor-pointer line-clamp-1">

            {props.title}
          </h1>

          <div className="my-4">
            <div className="flex space-x-1 items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-600 mb-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              <p>{props.duration}</p>
            </div>
            <div className="flex space-x-1 items-center">
              <span>
                <i className="fa-solid fa-person-chalkboard text-lg text-indigo-600 "></i>
              </span>
              <p className="font-semibold mt-1">{props.instructor}</p>
            </div>
            <div className="flex space-x-1 items-center">
              <span>
                <i className="fa-solid fa-star-half-stroke text-indigo-600"></i>
              </span>
              <p className="mt-1">{props.rating}</p>
            </div>
            <div className="flex space-x-1 items-center justify-center mb-1 text-green-800">
              <span>
                <i className="fa-solid fa-sack-dollar me-1 mt-2"></i>
              </span>
              {props.free || props.typeOfCourse === "FREE"
                ? <p className="mt-1 font-bold text-2xl  ">
                  Free
                </p>
                : <p className="mt-1 font-bold text-2xl  ">
                  {props.price - (props.price * props.discount) / 100}$
                </p>}

            </div>
            {/* Cart Button */}
            {!props.isInCart && (
              <button
                className={`btn glass mt-3 ${alreadyInCart
                  ? "bg-purple-700 hover:bg-[#dc2626]"
                  : "bg-purple-700 hover:bg-[#10b981]"
                  } text-white btn-md`}
                  onClick={!user? ()=>document.getElementById(`shouldLogin`).showModal():handleCartActions} 

                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-bars loading-md"></span>
                    Adding...
                  </>
                ) : alreadyInCart ? (
                  "Remove from Cart"
                ) : (
                  "Add to Cart"
                )}
              </button>
            )}
          </div>
          {/* -------------Wishlist Button ------------*/}


          <div className="absolute bottom-6 end-4">

            <button
            onClick={!user? ()=>document.getElementById(`shouldLogin`).showModal():wishlistActions} 
              className="btn-md  btn glass bg-amber-300 flex flex-col items-center justify-center text-sm font-semibold py-2 px-4 hover:animate-bounce "
             
            >
              <span className="text-m mt-1">

                
                <i

                  className={`fa-${
                    !alreadyInWish ? "regular" : `solid`
                  } fa-heart `}

                  style={alreadyInWish ? { color: "#e01010" } : {}}
                ></i>
              </span>
            </button>
          </div>
        </div>
      </div>

      <ShouldLogin></ShouldLogin>

    </>
  );
}

// Wishlist Button
{
  /* <span className="text-s mt-1">
  Wishlist
  <i className={`fa-${!alreadyInWish ? "solid" : "regular"} fa-heart ms-2`}></i>
</span>; */
}
