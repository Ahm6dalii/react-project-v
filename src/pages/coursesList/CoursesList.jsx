import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import CardOfCourses from "../../components/Cards/CardOfCourses";
import Searchbar from "../../components/searchbar/Searchbar";
import SearchSidebar from "../../components/sidebar/SearchSidebar";
import Pagination from './../../admin/components/Pagination/pagination';
import useCourses from "../../admin/hooks/useCourses";

import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

function CoursesList() {


  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedRating, setSelectedRating] = useState();
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedPrice, setSelectedPrice] = useState({
    paid: false,
    free: false,
  });


  const location = useLocation();
  const show = location.pathname === "/courses";
  const { courses, currentPage, setCurrentPage, setPerPage, perPage } = useCourses()

  useEffect(() => {
    setIsLoading(true);
    const isFiltering = searchQuery || selectedLevel || selectedRating || selectedPrice.paid || selectedPrice.free || selectedDuration;

    if (isFiltering) {
      setPerPage(200);
    } else {
      setPerPage(8);
    }
    const delayCourses = setTimeout(() => {
      const results = courses?.data
        // ----searchbar filter----
        .filter((course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        // -----Level Filter -----
        .filter((course) =>
          selectedLevel ? course.level === selectedLevel : true
        )
        // -----Rating Filter -----
        .filter((course) =>
          selectedRating ? Math.trunc(course.rating) === selectedRating : true
        )
        // -----Paid/Free Filter -----
        .filter((course) => {
          if (selectedPrice.paid && selectedPrice.free) {
            return true;
          }
          if (selectedPrice.paid) {
            return course.paid;
          }
          if (selectedPrice.free) {
            return course.free;
          }
          // if (selectedPrice.paid) {
          //   return course.typeOfCourse === 'PAID';
          // }
          // if (selectedPrice.free) {
          //   return course.typeOfCourse === 'FREE';
          // }
          return true;
        })
        // -----Duration Filter -----
        .filter((course) => {
          const durationWeeks = parseInt(course.duration);
          if (selectedDuration === "short") {
            return durationWeeks >= 0 && durationWeeks <= 1;
          }
          if (selectedDuration === "medium") {
            return durationWeeks > 1 && durationWeeks <= 4;
          }
          if (selectedDuration === "long") {
            return durationWeeks > 4;
          }
          return true;
        });

      console.log(results);
      setFilteredCourses(results);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(delayCourses);
  }, [
    searchQuery,
    courses,
    selectedLevel,
    selectedRating,
    selectedPrice,
    selectedDuration,
    perPage,
    currentPage,
    setPerPage
  ]);

  // Handle sidebar auto-close on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  ////////////////////////////////////////////////////////////////////////
  return (
    <>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <SearchSidebar
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
        selectedDuration={selectedDuration}
        setSelectedDuration={setSelectedDuration}
      />

      <div
        className={`overflow-hidden mt-12 min-h-screen flex flex-col items-center py-10 transition-all duration-300 ease-in-out ${isSidebarOpen ? "pl-80" : "pl-0"
          }`}
      >
        {show && (
          <div className="mb-6 w-full max-w-md">
            <Searchbar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
        )}


{show &&  <div className="flex flex-col md:flex-row md:items-start w-full max-w-6xl overflow-hidden ">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className={`fixed top-20 left-5 p-3 text-white bg-black rounded-lg z-50 transition-transform duration-300 ease-in-out ${isSidebarOpen ? "invisible" : ""
              }`}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>}

        <div className="flex-1 px-4 md:px-0 transition-transform duration-300 ease-in-out w-full">
          {isLoading ? (
            <div className="flex items-center justify-center w-full h-48">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          ) : (
            <div 
              className={` grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4  gap-2 px-4  ${filteredCourses?.length > 0}
                ? "opacity-100 transition-opacity duration-500 ease-in"
                : "opacity-0"
                }`}
            >
              {filteredCourses?.map((course) => (
                <div
                  key={course.id}
                  className="transition-transform transform hover:scale-105 duration-300 ease-in-out "
                >
                  <CardOfCourses
                    course={course}
                    title={course.title}
                    price={course.price}
                    image={course.image}
                    level={course.level}
                    rating={course.rating}
                    instructor={course.instructor}
                    isInCart={false}
                    discount={course.discount}
                    id={course.id}
                    typeOfCourse={course.typeOfCourse}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {show && perPage < 9 ? (
          <div className="py-8">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              courses={courses}
            />
          </div>
        ) : ''}
      </div>
    </>
  );
}


export default CoursesList;
