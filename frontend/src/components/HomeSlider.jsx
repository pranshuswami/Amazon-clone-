import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const HomeSlider = () => {


const images = [

"https://i.pinimg.com/1200x/2d/ca/48/2dca4800ef6f1d68ce7f52114999a03e.jpg",

"https://i.pinimg.com/1200x/3d/44/a4/3d44a4163c09b34ab58586ffd06783dc.jpg",

"https://i.pinimg.com/1200x/2f/70/4c/2f704cca1000e8150f637ec7a4d06ad4.jpg"

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