/* eslint-disable react/prop-types */

function SearchSidebar(props) {
  const {
    isSidebarOpen,
    setSidebarOpen,
    selectedLevel,
    setSelectedLevel,
    selectedRating,
    setSelectedRating,
    selectedPrice,
    setSelectedPrice,
    selectedDuration,
    setSelectedDuration,
  } = props;
  const handleRatingClear = () => {
    setSelectedRating();
  };
  const handleDurationClear = () => {
    setSelectedDuration();
  };
  const handlePriceChange = (e) => {
    console.log(e.target);
    const { name, checked } = e.target;
    setSelectedPrice((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  const handleDurationChange = (e) => {
    console.log(e.target.value);
    setSelectedDuration(e.target.value);
  };
  return (
    <div dir={'ltr'} >
      <div
        className={`fixed z-[10000] inset-y-0 z-10 flex w-80 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Curvy shape */}
        <svg
          className="absolute inset-0 w-full h-full text-white"
          style={{ filter: "drop-shadow(10px 0 10px #00000030)" }}
          preserveAspectRatio="none"
          viewBox="0 0 309 800"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M268.487 0H0V800H247.32C207.957 725 207.975 492.294 268.487 367.647C329 243 314.906 53.4314 268.487 0Z" />
        </svg>

        {/* Sidebar content */}
        <div className="relative z-10 flex flex-col flex-1 bg-gray-800 text-white">
          <div className="flex items-center justify-between flex-shrink-0 w-64 p-4 ">
            {/* Logo */}
            <h1 className="text-purple-900 text-4xl font-bold">Skill Quest</h1>
            {/* Close Button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 mt-5 ms-5 rounded-lg focus:outline-none focus:ring text-black"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col flex-1 w-64 p-4  space-y-6 text-black">
            <div className="font-bold text-3xl text-black  ">Filter</div>
            <hr className="w-40  h-px ml-0  bg-neutral-200 border-0 rounded"></hr>
            {/* Levels Filter */}
            <div>
              <span className="block text-sm font-semibold mb-2">Levels</span>
              <select
                value={selectedLevel}
                onChange={(e) => {
                  setSelectedLevel(e.target.value);
                  console.log(e.target.value);
                }}
                className="form-select block w-full bg-gray-700 border border-gray-600  rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Duration Filter */}
            <div>
              <span
                className="block text-sm font-semibold mb-2 cursor-pointer"
                onClick={handleDurationClear}
              >
                Duration
              </span>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="duration"
                    value="short"
                    checked={selectedDuration === "short"}
                    onChange={handleDurationChange}
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2">Short (0-1 week)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="duration"
                    value="medium"
                    checked={selectedDuration === "medium"}
                    onChange={handleDurationChange}
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2">Medium (1-4 weeks)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="duration"
                    checked={selectedDuration === "long"}
                    onChange={handleDurationChange}
                    value="long"
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2">Long (4+ weeks)</span>
                </label>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <span
                className="block text-sm font-semibold mb-2 cursor-pointer"
                onClick={handleRatingClear}
              >
                Rating
              </span>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <label key={star} className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      value={star}
                      checked={selectedRating === star}
                      onChange={() => setSelectedRating(star)}
                      className="form-radio text-yellow-500"
                    />
                    <span className="ml-2 flex items-center">
                      {[1, 2, 3, 4, 5].map((index) => (
                        <i
                          key={index}
                          className={`fa-solid fa-star text-sm ${
                            index <= star ? "text-yellow-500" : "text-gray-300"
                          }`}
                          style={{
                            color: index <= star ? "#FFD43B" : "#E5E7EB",
                          }}
                        ></i>
                      ))}
                      <span className="ml-2">
                        {star} Star{star > 1 ? "s" : ""}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <span className="block text-sm font-semibold mb-2">Price</span>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="paid"
                    value="paid"
                    checked={selectedPrice.paid}
                    onChange={handlePriceChange}
                    className="form-checkbox text-green-500"
                  />
                  <span className="ml-2">Paid</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="free"
                    value="free"
                    checked={selectedPrice.free}
                    onChange={handlePriceChange}
                    className="form-checkbox text-green-500"
                  />
                  <span className="ml-2">Free</span>
                </label>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default SearchSidebar;
