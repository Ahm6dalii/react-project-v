import React, { useEffect, useState } from 'react'

export default function Testmonial() {
  

  return (
    <section className="max-w-5xl mx-auto w-full px-10 dark:bg-gray-800 dark:text-white py-5 border mb-5">

  <div className="flex items-center justify-center flex-col gap-y-2 py-5">
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Testimonials</h2>
    <p className="text-lg font-medium text-slate-700/70 dark:text-gray-400">Discover how our service can benefit you</p>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 w-full">

    <div className=" dark:bg-slate-200 border p-7 rounded-xl bg-white dark:bg-gray-700 drop-shadow-md border-neutral-200/50 col-span-2 flex flex-col gap-y-10 justify-between">
      <div className="flex flex-col gap-y-3.5  dark:text-slate-700">
        <p className="font-bold text-xl">Transformative Course on Agile Management</p>
        <p className="font-medium text-slate-700/90 dark:text-gray-300">The Agile Management course transformed the way I approach projects. The instructors were experienced, and the content was top-notch!.</p>
      </div>
      <div className="flex flex-col  dark:text-slate-700">
        <img src="https://randomuser.me/api/portraits/women/54.jpg" alt="Jane Cooper" className="h-10 w-10" />
        <p className="pt-2 text-sm font-semibold">Jane Cooper</p>
        <p className="text-sm font-medium text-slate-700/70 dark:text-gray-400">Project Manager ABC Corporation</p>
      </div>
    </div>

    <div className="border dark:bg-slate-200 dark:text-slate-700 p-7 rounded-xl bg-white dark:bg-gray-700 drop-shadow-md border-neutral-200/50 col-span-3 flex flex-col gap-y-10 justify-between">
      <div className="flex flex-col gap-y-3.5">
        <p className="font-bold text-xl">Must-Take Full-Stack Development Course</p>
        <p className="font-medium text-slate-700/90 dark:text-gray-300">This Full-Stack course is a must for any developer looking to upskill. The hands-on approach really solidified my understanding..</p>
      </div>
      <div className="flex flex-col">
        <img src="https://randomuser.me/api/portraits/women/30.jpg" alt="John Doe" className="h-10 w-10" />
        <p className="pt-2 text-sm font-semibold">Emily Smith</p>
        <p className="text-sm font-medium text-slate-700/70 dark:text-gray-400">Senior Developer at ABC Company</p>
      </div>

    </div>
    <div className="border dark:bg-slate-200 dark:text-slate-700 p-7 rounded-xl bg-white dark:bg-gray-700 drop-shadow-md border-neutral-200/50 col-span-3 flex flex-col gap-y-10 justify-between">
      <div className="flex flex-col gap-y-3.5">
        <p className="font-bold text-xl">Bright Ideas Marketing</p>
        <p className="font-medium text-slate-700/90 dark:text-gray-300">I loved the Digital Marketing course! It provided me with actionable strategies that I implemented immediately in my work..</p>
      </div>
      <div className="flex flex-col">
        <img src="https://randomuser.me/api/portraits/women/90.jpg" alt="Jane Doe" className="h-10 w-10" />
        <p className="pt-2 text-sm font-semibold">Sarah Brown</p>
        <p className="text-sm font-medium text-slate-700/70 dark:text-gray-400">Digital Marketing at XYZ Corporation</p>
      </div>
    </div>
    <div className="border dark:bg-slate-200 dark:text-slate-700 p-7 rounded-xl bg-white dark:bg-gray-700 drop-shadow-md border-neutral-200/50 col-span-2 flex flex-col gap-y-10 justify-between">
      <div className="flex flex-col gap-y-3.5">
        <p className="font-bold text-xl">Comprehensive Data Science Course</p>
        <p className="font-medium text-slate-700/90 dark:text-gray-300">The Data Science course was comprehensive and challenging. The real-world examples made the concepts easy to grasp..</p>
      </div>
      <div className="flex flex-col">
        <img src="https://randomuser.me/api/portraits/men/90.jpg" alt="Ash Doe" className="h-10 w-10" />
        <p className="pt-2 text-sm font-semibold">James White</p>
        <p className="text-sm font-medium text-slate-700/70 dark:text-gray-400">Data Science at XYZ Corporation</p>
      </div>
    </div>
  </div>
</section>

  )
}
