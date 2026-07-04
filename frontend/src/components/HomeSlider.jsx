import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const HomeSlider = () => {


const images = [

"https://i.pinimg.com/736x/a7/7b/34/a77b3492fa562aa9e746c1da6d48c412.jpg",

"https://i.pinimg.com/1200x/3e/cd/b4/3ecdb44f6fdef1410fa8813f4f7aef67.jpg",

"https://i.pinimg.com/1200x/ef/3d/8a/ef3d8a1040594ea8528b4421d1e47f20.jpg"

];


return (

<Swiper

modules={[Autoplay,Navigation,Pagination]}

spaceBetween={0}

slidesPerView={1}

navigation

pagination={{clickable:true}}

autoplay={{

delay:3000,

disableOnInteraction:false

}}

loop={true}

className="w-full h-[250px] md:h-[500px]"


>


{

images.map((img,index)=>(


<SwiperSlide key={index}>


<img

src={img}

className="w-full h-full object-contain"

/>


</SwiperSlide>


))

}


</Swiper>


)

}

export default HomeSlider;