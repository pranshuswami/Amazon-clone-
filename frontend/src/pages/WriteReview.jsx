import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TbCameraPlus } from "react-icons/tb";
import { IoCheckbox } from "react-icons/io5";

const WriteReview = () => {
  const { productId } = useParams(); // To get product ID from URL if needed
  const navigate = useNavigate();

  // Component States
  const [rating, setRating] = useState(1); // Set default to 1 star as seen in image_d2a4b8.png
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("Nice");
  const [mediaFile, setMediaFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getProduct = async () => {

    const res = await axios.get(
        `http://localhost:5000/reviews/product/${productId}`
    );

    setProduct(res.data.data);

};

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Setup Form Data if sending files, otherwise regular JSON
      await axios.post(
    "http://localhost:5000/reviews/add",
    {
        product_id: productId,
        rating,
        comment: reviewText
    },
    {
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
    }
);

alert("Review submitted!");

navigate("/orders");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] font-sans antialiased">
      
      {/* --- TOP PROFILE BAR --- */}
      <div className="bg-cyan-50 border-b  hidden border-gray-100 px-4 py-3 md:px-10 lg:px-60 md:flex items-center gap-3">
        {/* User Icon Circle */}
        <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center border border-gray-300">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5-4-8-4z"/>
          </svg>
        </div>
        <div className="text-lg">
          <span className="font-medium text-gray-800">Pranshu Swami</span>{" "}
          <button type="button" className="text-[#007185] hover:text-[#C45500] hover:underline ml-1">
            Edit public name
          </button>
        </div>
      </div>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="md:w-250 mx-auto md:px-4 md:py-6 px-3 py-1">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* PRODUCT BLOCK */}
          <div className="flex items-center gap-4">
            <img
              src="https://i.pinimg.com/736x/cc/2d/92/cc2d92241e3acc4d4a570e4b52746fb8.jpg" 
              alt="Product"
              className="md:w-20 md:h-20 w-10 h-10 object-cover rounded border border-gray-200 "
            />
            
            <div>
              <h2 className="text-xl
               md:text-3xl font-semibold text-[#111111] leading-tight">
                How was the item?
              </h2>
              <p className="text-base text-black font-medium mt-1 line-clamp-1 md:line-clamp-1 md:text-lg">
                Samsung Galaxy S26 5G features a compact 6.3-inch Dynamic AMOLED 2X display with a smooth 120Hz refresh rate and Gorilla Armor 2 protection. Powered by the latest flagship processor, it delivers exceptional performance for...
              </p>
            </div>
          </div>
          
          

          {/* INTERACTIVE STAR RATING */}
          <div className="flex items-center md:gap-1.5 gap-0.5 md:pt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none transition-transform active:scale-90"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <svg
                  className="md:w-12 md:h-12 w-10 h-10 cursor-pointer"
                  viewBox="0 0 24 24"
                  fill={star <= (hoverRating || rating) ? "#F5A623" : "none"}
                  stroke="#E47911"
                  strokeWidth="0.75"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </button>
            ))}
          </div>

          {/* BLUE INFO ALERT BOX */}
          <div className=" hidden bg-white rounded-md p-3 -mt-5 md:flex items-start gap-3">
            <div className="text-[#007185] mt-1">
              {/* Info Icon (i) */}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-lg text-gray-800 font-normal">
              Please press the submit button at the bottom of the page to save your changes
            </p>
          </div>

          {/* WRITE A REVIEW TEXTAREA */}
          <div className="space-y-2 -mt-5">
            <label className="block text-lg font-bold text-[#111111]">
              Write a review
            </label>
            <textarea
              md:rows="3" rows="5"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full p-3 border border-gray-400 rounded-lg focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600] focus:outline-none placeholder-gray-400 text-base md:text-lg shadow-inner"
              placeholder="What did you like or dislike? What did you use this product for?"
            />
          </div>

          {/* SHARE A VIDEO OR PHOTO */}
          <div className="space-y-2 -mt-5 md:mt-0">
            <label className="block text-base font-bold text-[#111111]">
              Share a video or photo
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition relative cursor-pointer">
              <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => setMediaFile(e.target.files[0])}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <TbCameraPlus md:size={25} size={20}/>
              
            </div>
          </div>
          <div className="space-y-2 -mt-5">
            <label className="block text-base font-bold text-[#111111]">
              Title your review (required)
            </label>
            <textarea
              rows="1"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full p-3 border border-gray-400 rounded-lg focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600] focus:outline-none placeholder-gray-400 text-base md:text-lg shadow-inner"
              placeholder="What did you like or dislike? What did you use this product for?"
            />
          </div>

          {/* --- SUBMIT BUTTON --- */}
          <div className="border-t border-gray-200 md:pt-5 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 border border-yellow-500 text-black py-1.5 px-6 rounded-full shadow-sm font-medium text-base transition duration-150 disabled:opacity-50 md:w-35 w-full"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default WriteReview;