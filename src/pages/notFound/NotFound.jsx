import React from 'react'
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div class="mt-12 bg-gradient-to-r from-slate-200 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-black dark:text-white">
    <div class="flex items-center justify-center min-h-screen px-2">
      <div class="text-center">
        <h1 class="text-9xl font-bold">404</h1>
        <p class="text-2xl font-medium mt-4">Oops! Page not found</p>
        <p class="mt-4 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/"
          class="px-6 dark:text-black py-3 dark:bg-black bg-white font-semibold rounded-full hover:bg-purple-100 transition duration-300 ease-in-out dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">
          Go Back Home
        </Link>
      </div>
    </div>
  </div>
  )
}
