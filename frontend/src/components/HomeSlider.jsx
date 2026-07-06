import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const HomeSlider = () => {
  const images = [
    "https://images-eu.ssl-images-amazon.com/images/G/31/img26/Prime/Acq/LU/PD26_PC_Static_Live-Now_2x_2._CB758813606_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img24/Wireless/Mounika/PD/GW/jULY4/PC_Hero_Live-phase_ASINs_3000x1200._CB758500475_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/INSLGW/PD26/AFP_Men._CB758485816_.jpg"
  ];

  return (
    <div className="relative w-full">
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
        className="w-full h-[520px]  md:h-[450px] lg:h-[600px]"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              className="w-full h-full object-cover object-top"
              alt={`Banner ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Amazon's iconic bottom gradient fade mask */}
      <div className="hidden md:block absolute bottom-0 left-0 right-0 h-[80px] md:h-[150px] lg:h-[300px] bg-gradient-to-t from-[#E3E6E6] to-transparent z-[5] pointer-events-none" />
    </div>
  );
};

export default HomeSlider;