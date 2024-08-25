
// npm run server


//get link api
const api = useSelector(state => state.apiLink.link)

//get all user
import axios from 'axios';

const getAllUsers = async () => {
  try {
    const response = await axios.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
//getUserById
const getUserById = async (id) => {
  try {
    const response = await axios.get(`${'link'}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

//createUser
const createUser = async (user) => {
  try {
    const response = await axios.post(`${'link'}/users`, user);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
  }
};


//updateUser
const updateUser = async (id, user) => {
  try {
    const response = await axios.put(`${'link'}/users/${id}`, user);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

//deleteUser
const deleteUser = async (id) => {
  try {
    await axios.delete(`${'link'}/users/${id}`);
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};


//  2. Courses

//getAllCourses
const getAllCourses = async () => {
  try {
    const response = await axios.get(`${'link'}/courses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
  }
};

//getCourseById
const getCourseById = async (id) => {
  try {
    const response = await axios.get(`${'link'}/courses/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course:', error);
  }
};

//createCourse 
const createCourse = async (course) => {
  try {
    const response = await axios.post(`${'link'}/courses`, course);
    return response.data;
  } catch (error) {
    console.error('Error creating course:', error);
  }
};

//updateCourse
const updateCourse = async (id, course) => {
  try {
    const response = await axios.patch(`${'link'}/courses/${id}`, course)
    return response.data;
  } catch (error) {
    console.error('Error updating course:', error);
  }
};

//deleteCourse
const deleteCourse = async (id) => {
  try {
    await axios.delete(`${'link'}/courses/${id}`);
  } catch (error) {
    console.error('Error deleting course:', error);
  }
};

//   3. Carts
// getAllCarts
const getAllCarts = async () => {
  try {
    const response = await axios.get(`${'link'}/carts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching carts:', error);
  }
};
//   getCartByUserId
const getCartByUserId = async (userId) => {
  try {
    const response = await axios.get(`${'link'}/carts?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
  }
};

//   createCart
const createCart = async (cart) => {
  try {
    const response = await axios.post(`${'link'}/carts`, cart);
    return response.data;
  } catch (error) {
    console.error('Error creating cart:', error);
  }
};

//   updateCart
const updateCart = async (id, cart) => {
  try {
    const response = await axios.put(`${'link'}/carts/${id}`, cart);
    return response.data;
  } catch (error) {
    console.error('Error updating cart:', error);
  }
};

//   deleteCart
const deleteCart = async (id) => {
  try {
    await axios.delete(`${'link'}/carts/${id}`);
  } catch (error) {
    console.error('Error deleting cart:', error);
  }
};

//   getAllWishlists
const getAllWishlists = async () => {
  try {
    const response = await axios.get(`${'link'}/wishlists`);
    return response.data;
  } catch (error) {
    console.error('Error fetching wishlists:', error);
  }
};

//   getWishlistByUserId 
const getWishlistByUserId = async (userId) => {
  try {
    const response = await axios.get(`${'link'}/wishlists?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
  }
};

//   createWishlist 
const createWishlist = async (wishlist) => {
  try {
    const response = await axios.post(`${'link'}/wishlists`, wishlist);
    return response.data;
  } catch (error) {
    console.error('Error creating wishlist:', error);
  }
};

//   updateWishlist
const updateWishlist = async (id, wishlist) => {
  try {
    const response = await axios.put(`${'link'}/wishlists/${id}`, wishlist);
    return response.data;
  } catch (error) {
    console.error('Error updating wishlist:', error);
  }
};

//   deleteWishlist
const deleteWishlist = async (id) => {
  try {
    await axios.delete(`${'link'}/wishlists/${id}`);
  } catch (error) {
    console.error('Error deleting wishlist:', error);
  }
};

//   getAllEnrollments
const getAllEnrollments = async () => {
  try {
    const response = await axios.get(`${'link'}/enrollments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching enrollments:', error);
  }
};

//   getEnrollmentByUserAndCourse
const getEnrollmentByUserAndCourse = async (userId, courseId) => {
  try {
    const response = await axios.get(`${'link'}/enrollments?userId=${userId}&courseId=${courseId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching enrollment:', error);
  }
};

//   createEnrollment
const createEnrollment = async (enrollment) => {
  try {
    const response = await axios.post(`${'link'}/enrollments`, enrollment);
    return response.data;
  } catch (error) {
    console.error('Error creating enrollment:', error);
  }
};

//   updateEnrollment
const updateEnrollment = async (id, enrollment) => {
  try {
    const response = await axios.put(`${'link'}/enrollments/${id}`, enrollment);
    return response.data;
  } catch (error) {
    console.error('Error updating enrollment:', error);
  }
};

// deleteEnrollment
const deleteEnrollment = async (id) => {
  try {
    await axios.delete(`${'link'}/enrollments/${id}`);
  } catch (error) {
    console.error('Error deleting enrollment:', error);
  }
};

//  getDashboardStats
const getDashboardStats = async () => {
  try {
    const response = await axios.get(`${'link'}/dashboard`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
  }
};