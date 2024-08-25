import CoursesList from "../coursesList/CoursesList";
import { Link } from 'react-router-dom';
import BrandSlider from "../../components/brandSlider/BrandSlider";
import Testmonial from "../../components/testmonial/Testmonial";
import { useSelector } from "react-redux";



export default function Home() {
  const { translation } = useSelector(state => state.lang)


  return (
    <>
      <div className="mt-12 min-h-screen flex items-center  max-w-screen-xl mx-auto py-5">
        <div className=" grid   md:grid-cols-6">
          <div className='md:col-span-4 flex items-center p-4 order-2 md:order-none '>
            <div >
              <h1 className="text-5xl font-bold text-[48px]">{translation.heroTitlel1} <br />{translation.heroTitlel2}</h1>
              <p className="py-6">
                {translation.heroDesc}
              </p>
              <div>
                <button className="btn btnMain mx-1" >{translation.heroJoin}</button>
                <button className="btn bg-transparent  border-2 shadow-none  mx-1 dark:text-white dark:hover:text-[#7c5cff] hover:text-[#7c5cff] hover:bg-[#d9d2f8]" >{translation.aboutUs}</button>
              </div>
            </div>
          </div>
          <div className='md:col-span-2 text-center'>
            <img
              src="https://img.freepik.com/free-vector/stay-home-talk-your-friends-online_23-2148485083.jpg?t=st=1724083427~exp=1724087027~hmac=bb45c5c33588c10872080aec80e5d50646d3c33fc7476fd7926f2ddc94157d9f&w=740"
              className="w-full rounded-lg mx-bg " />
          </div>
        </div>
      </div>


    <BrandSlider></BrandSlider>
    <div className="overflow-hidden">

        <h1 className="text-center text-5xl font-bold mt-7">{translation.heroTop}</h1>
        <div>
          <CoursesList />
        </div>
        <div className="flex justify-center align-middle">
          <Link to='/courses'>   <button className="glass bg-purple-900 p-3 my-4 mb-20 text-white rounded-lg hover:bg-teal-900 ">{translation.heroSeeMore}</button></Link>
        </div>
      </div>
      <Testmonial></Testmonial>
    </>
  )
}
