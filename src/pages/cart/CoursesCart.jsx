import { useSelector } from "react-redux";
import CardOfCart from "../../components/Cards/CardOfCart";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import PaypalCheckoutButton from "../../components/checkOut/PaypalCheckoutButton.jsx";
import swal from 'sweetalert';


function CoursesCart() {
  let[key,setKey]=useState(0)

  const {translation}=useSelector(state=>state.lang)
  let [total,setTotal]=useState(0)
 

  const cart = useSelector((state) => state.cart);

  const calcTotals = () => {
    let totalAmout=cart.reduce((total, course) => total + course.price, 0).toFixed(2)
    localStorage.setItem("total",totalAmout)
    // setTotal(totalAmout)
    return  totalAmout
  };
  


useEffect(()=>{
  calcTotals()

},[cart])

useEffect(()=>{
  forceRender()
},[])
const forceRender = () => setKey(prevKey => prevKey + 1);

// useEffect(()=>{
//   window.paypal.Buttons({
//     createOrder:(data, actions) => {
//       return actions.order.create({
//         purchase_units: [{
//           amount: {
//             value: '0.01' 
//           }
//         }]
//       })
//   }  ,
//   onApprove:async (data, actions) => {
//     return actions.order.capture().then((details)=> {
//       alert('Transaction completed by ' + details.payer.name.given_name);
//     });
//   },
  
//   }).render('#paybal-button')
// },[])

  return (
    <>
      <div className="mt-12 container mx-auto px-4 py-8 ">
        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
          <div className="dark:bg-black bg-white p-6 rounded-lg shadow-lg w-full md:w-2/3 lg:w-1/2">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
             {translation.cartShop}
            </h1>

            <div className="space-y-4">
              {cart.length === 0 ? (
                <p>{translation.cartEmpty}</p>
              ) : (
                cart.map((course) => (
                  <CardOfCart
                    key={course.id}
                    course={course}
                    title={course.title}
                    price={course.price}
                    instructor={course.instructor}
                    description={course.description}
                    rating={course.rating}
                    image={course.image}
                    isInCart={true}
                  />
                ))
              )}
            </div>
          </div>

         { cart.length !==0 &&  <div className="mt-6 mx-7">
            <div className="flex items-center justify-between my-4">
              <p onClick={forceRender} className="text-xl font-bold text-gray-800">Total:</p>
              <p className="text-2xl font-bold text-gray-800">
              {calcTotals()}
              </p>
            </div>
            <div className="my-4">
            <PayPalScriptProvider  options={{"client-id":"AQihEpAGXgr1ICAgxGk2e8thm9u3JvlDUnuyBDy4Jd-zfhesG7495ErFbtlB7ayqGwCfyP5euZv_4g3r"}}  >
             <PaypalCheckoutButton total={total}  show={key}  />
            </PayPalScriptProvider>
            {/* <div id="paybal-button"></div> */}

            </div>
            <hr className="border-t border-gray-300 my-" />
            <label
              htmlFor="coupon"
              className="block text-sm font-medium text-gray-700 mt-2"
            >
              {translation.cartPromote}
            </label>
            <div className="flex mt-1">
              <input
                type="text"
                id="coupon"
                className="w-full px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter Coupon"
              />
              <button className="bg-[#7e22ce] text-white px-4 py-2 rounded-r-lg hover:bg-[#581c87]">
                {translation.cartApply}
              </button>
            </div>
          </div>}
        </div>
      </div>
    </>
  );
}
export default CoursesCart;
