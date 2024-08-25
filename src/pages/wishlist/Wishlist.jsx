import { useDispatch, useSelector } from "react-redux";

import { clearWishlist } from "../../redux/reducers/wishlistSlice";
import CardOfWishlist from "../../components/Cards/CardOfWishlist";

function Wishlist() {
  const {translation}=useSelector(state=>state.lang)
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const clearAllWishlist = () => {
    dispatch(clearWishlist());
  };
  return (
    <>
      <h2 className="mt-12 dark:text-white text-3xl font-bold text-center text-black flex justify-center mt-12 pt-10  ">
        {translation.wish}
      </h2>
      {wishlist.length === 0 ? (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-center text-black mb-6 ">
            {translation.wishEmpty}
          </h2>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 mt-1 pt-9 ">
          <button
            className="btn glass bg-purple-600 hover:bg-purple-900 hover:text-white  btn-md"
            onClick={clearAllWishlist}
          >
           {translation.wishClear}
          </button>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-4 mt-5 py-5 mb-5">
        {wishlist.map((course) => (
          <CardOfWishlist
            key={course.id}
            course={course}
            title={course.title}
            price={course.price}
            instructor={course.instructor}
            description={course.description}
            rating={course.rating}
            image={course.image}
            isInCart={false}
          />
        ))}
      </div>
    </>
  );
}

export default Wishlist;
