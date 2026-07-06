import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const MobileSwiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Replace these with your actual database or asset URLs
  const mobileBanners = [
    "", 
    "", 
    "https://m.media-amazon.com/images/I/61eGjnAcIQL._SX855_.jpg",
    "https://m.media-amazon.com/images/I/61913TOgWTL._SX855_.jpg"
  ];

  return (
    <div className="w-full bg-gray-100 pt-3 overflow-hidden relative">
      
      {/* Core Swiper Container */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={12}
        // 1.08 means 1 full card is visible, and 8% of the next card peeks in from the right edge
        slidesPerView={1.08} 
        centeredSlides={false}
        loop={false}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        className="w-full h-[530px] px-3"
      >
        {mobileBanners.map((imgUrl, index) => (
          <SwiperSlide key={index} className="h-full">
            <div className="w-full h-full rounded-xl overflow-hidden bg-white shadow-sm border border-gray-200/50 flex items-center justify-center">
              <img
                src={imgUrl}
                alt={`Amazon Banner ${index + 1}`}
                className="w-full h-full object-contain object-center"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

     
    </div>
  );
};

export default MobileSwiper;