import { createSlice } from "@reduxjs/toolkit";
const storage=JSON.parse(localStorage.getItem("mycourses"))

const myCoursesSlice = createSlice({
  name: "myCourse",
  initialState: storage?storage:[],
  reducers: {
    addMyCourses: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("mycourses",JSON.stringify(state))
    },
    removeMyCourses: (state, action) => {
    let flited=state.filter((course) => course.id !== action.payload.id)
             localStorage.setItem("mycourses",JSON.stringify(flited))
      return flited;

    },
    clearMyCourses: () => {
      localStorage.removeItem("mycourses")
      return [];
    },
  },
});

export const { addMyCourses, removeMyCourses,clearMyCourses } = myCoursesSlice.actions;
export let myCoursestReducer = myCoursesSlice.reducer;
