import { configureStore } from "@reduxjs/toolkit";
import { apiLinkReducer } from "./reducers/apiLinkSlice";
import { userAuthReducer } from "./reducers/userAuthSlice";
import { languageReducer } from "./reducers/languageSlice";
import { modeReducer } from "./reducers/modeSlice";
import { cartReducer } from "./reducers/cartSlice";
import { wishlistReducer } from "./reducers/wishlistSlice";
import { myCoursestReducer } from "./reducers/myCourseSlice";



let store=configureStore({
    reducer:{
        apiLink:apiLinkReducer,
        auth:userAuthReducer,
        lang:languageReducer,
        mode:modeReducer,
        cart:cartReducer,
        wishlist:wishlistReducer,
        myCourse: myCoursestReducer
    }
})


export default store;
