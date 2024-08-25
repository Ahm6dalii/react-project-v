import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addToCart, removeFromCart } from "../../redux/reducers/cartSlice";
import { removeFromWishlist } from "../../redux/reducers/wishlistSlice";

/* eslint-disable react/prop-types */
const CardOfWishlist = (props) => {
  const coursesInCart = useSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const alreadyInCart = coursesInCart.some(
    (course) => course.id === props.course.id
  );
  const handleCartActions = () => {
    if (alreadyInCart) {
      dispatch(removeFromCart(props.course));
    } else {
      setIsLoading(true);
      setTimeout(() => {
        dispatch(addToCart(props.course));
        setIsLoading(false);
      }, 1000); // 3-second delay
    }
  };
  const handleWishlistActions = () => {
    dispatch(removeFromWishlist(props.course));
  };

  return (
    <div className=" dark:bg-slate-200 dark:text-slate-700 bg-white mt-6 shadow-lg rounded-lg overflow-hidden transform hover:translate-y-4 hover:shadow-2xl transition-transform duration-300 mx-3">
      <img className="w-full h-32 sm:h-48 object-cover" src={props.image} />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{props.title}</h2>
        <div className="mt-2 flex items-center">
          <span className="text-sm text-gray-600">Lessons</span>
          <span className="mx-2">·</span>
          <span className="text-sm text-gray-600">Students</span>
          <span className="mx-2">·</span>
          <span className="text-sm text-gray-600">{props.title}</span>
        </div>
        <div className="mt-3">
          {!props.isInCart && (
            <button
              className={`btn glass mt-3  ${
                alreadyInCart
                  ? "bg-purple-700 hover:bg-[#dc2626]"
                  : "bg-purple-700 hover:bg-[#10b981]"
              } text-white btn-sm`}
              onClick={handleCartActions}
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
      </div>
      <div className="absolute bottom-4 right-7">
        <button
          className="btn glass bg-red-500 hover:bg-red-600 text-white btn-sm"
          onClick={handleWishlistActions}
          title="remove from wishlist"
        >
          <i className="fa-regular fa-circle-xmark text-xl"></i>
        </button>
      </div>
    </div>
  );
};

export default CardOfWishlist;
