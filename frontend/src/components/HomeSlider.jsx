import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const HomeSlider = () => {
  const images = [
    "https://images-eu.ssl-images-amazon.com/images/G/31/IMG2026/SMB/Mocks/June/Desktop_Hero_V1_2x._CB760487247_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img21/APAY/MAYART26/travel/2_Hotels_PC_Hero_3000x1200._CB762668405_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/ALP/ALWDHero_March26/22nd_March_PC_2x._CB785055841_.jpg"
  ];

  return (
    <div className="relative w-full max-w-[100vw] overflow-hidden">
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false
        }}
        loop={true}
        className="w-full min-h-[220px] max-h-[430px] aspect-[5/2]"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="h-full overflow-hidden">
            <img
              src={img}
              className="block w-full h-full object-cover object-top"
              alt={`Banner ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Amazon's iconic bottom gradient fade mask */}
      <div className="hidden md:block absolute bottom-0 left-0 right-0 h-[clamp(80px,14vw,210px)] bg-gradient-to-t from-[#E3E6E6] to-transparent z-[5] pointer-events-none" />
    </div>
  );
};

export default HomeSlider;
