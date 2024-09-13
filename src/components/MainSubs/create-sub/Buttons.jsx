import { forwardRef } from "react";

const Buttons = forwardRef(
  (
    { handleBanner, handleImage, uploadBanner, uploadImage, banner, image },
    refs
  ) => {
    return (
      <div className="flex sm:items-center sm:justify-between flex-col sm:flex-row ">
        <div className="flex items-center justify-center sm:justify-normal gap-3 w-full mt-3">
          <button
            type="button"
            onClick={handleBanner}
            className={`text-white mt-5  text-md font-semibold ${
              banner ? "bg-green-600" : "bg-blue-800"
            } py-2 px-4 rounded-full hover:bg-blue-600 basis-2/4 sm:basis-3/12`}
          >
            Add Banner
            <input
              type="file"
              onChange={uploadBanner}
              placeholder=""
              className="hidden"
              ref={refs.bannerPicker}
            />
          </button>
          <button
            type="button"
            onClick={handleImage}
            className={`text-white mt-5  text-md font-semibold ${
              image ? "bg-green-600" : "bg-blue-800"
            } py-2 px-4 rounded-full hover:bg-blue-60 basis-2/4 sm:basis-3/12`}
          >
            Add image
            <input
              type="file"
              onChange={uploadImage}
              placeholder=""
              className="hidden"
              ref={refs.imgPicker}
            />
          </button>
        </div>
        <button
          className={`text-white mt-5  text-md font-semibold  py-2 px-4 rounded-full bg-blue-700 sm:bg-transparent hover:bg-blue-600`}
        >
          Create
        </button>
      </div>
    );
  }
);
export default Buttons;
