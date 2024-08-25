import React from 'react'
import { useSelector } from 'react-redux'

export default function About() {
  const {translation}=useSelector(state=>state.lang)

  return (
<div className="mt-12 sm:flex items-center max-w-screen-xl">
  <div className="sm:w-1/2 p-10">
    <div className="image object-center text-center">
      <img src="https://i.imgur.com/WbQnbas.png" />
    </div>
  </div>
  <div className="sm:w-1/2 p-5">
    <div className="text">
      <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">{translation.aboutUs}</span>
      <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">{translation.about} <span className="text-indigo-600">{translation.aboutOurCompany}</span>
      </h2>
      <p className="text-gray-700">
        {translation.aboutDesc}
      </p>
    </div>
  </div>
</div>

  )
}
