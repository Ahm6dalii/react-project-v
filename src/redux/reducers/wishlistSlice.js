import { createSlice } from "@reduxjs/toolkit";
const storage=JSON.parse(localStorage.getItem("wish"))

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState:storage?storage:[],
  reducers: {
    addToWishlist: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("wish",JSON.stringify(state))
    },
    removeFromWishlist: (state, action) => {
      let filted= state.filter((course) => course.id !== action.payload.id);
      localStorage.setItem("wish",JSON.stringify(filted))
      return filted
    },
    clearWishlist: () => {
      localStorage.removeItem("wish")
      return [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export let wishlistReducer = wishlistSlice.reducer;
