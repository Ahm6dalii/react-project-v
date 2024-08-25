import React, {useEffect, useState} from 'react';
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/reducers/cartSlice';
import swal from 'sweetalert';
import { addMyCourses } from '../../redux/reducers/myCourseSlice';

const PaypalCheckoutButton = ({show}) => {

    const cart = useSelector((state) => state.cart);
    // let[key,setKey]=useState(0)
    const dispatch= useDispatch()
    const total= localStorage.getItem('total')
 
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);

    const handleApprove = (orderId) => {
        setPaidFor(true);
        swal("Good job!", "You order Done SuccessFully", "success");
    }
    // const forceRender = () => setKey(prevKey => prevKey + 1);

    // useEffect(()=>{
    //     setKey(prevKey=>prevKey+1)
    // },[])
    useEffect(()=>{
        // forceRender()
    },[show])

    return (
        <div>
      {/* <button onClick={forceRender}>Force Re-render</button> */}
            <PayPalButtons  
            key={show}
                onClick={(data, actions) => {
                    const hasAlreadyBoughtCourse = false;
                    if(hasAlreadyBoughtCourse){
                        setError("You Already bough this course");
                        return actions.reject();
                    }else{
                        return actions.resolve();
                    }
                }}
                createOrder = {(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: total,
                                },
                            },
                        ],
                    });
                }}
                onApprove = { async (data, action) => {
                    const order = await action.order.capture();
                    console.log("order", order);
                    dispatch(addMyCourses(cart))
                    dispatch(clearCart())                   
                    handleApprove(data.orderID);
                }}
                onCancel={() => {}}
                onError={(err) => {
                    setError(err);
                    console.log("PayPal Checkout onError", err);
                }}
            />
        </div>
  
  )
}

export default PaypalCheckoutButton