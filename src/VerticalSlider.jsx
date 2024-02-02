import { Video, CloudinaryContext } from "cloudinary-react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { createRef, useRef } from "react";
import { sliderData } from "./mock-data";

const VerticalSlider = ({ data = sliderData }) => {
  const cloudinaryName = "mounssif-void";

  // Create an array of refs to store references to the video DOM elements
  const videoRefs = useRef(data.map(() => createRef()));

  // Function to play a specific video
  const playVideo = (index) => {
    if (videoRefs.current[index].current) {
      videoRefs.current[index].current.play();
    }
  };

  return (
    <div className="relative">
      <Swiper
        grabCursor={true}
        spaceBetween={30}
        direction="vertical"
        pagination={{
          type: "fraction",
          renderFraction: function (currentClass, totalClass) {
            return `<div class="custom-pagination"> <span class="${currentClass}"></span><span class="${totalClass}"></span></div>`;
          },
        }}
        modules={[Pagination]}
        className="h-screen bg-gray-100 p-5"
      >
        {data.map((item, index) => {
          return (
            <SwiperSlide
              className="relative overflow-hidden rounded-[32px]"
              key={index}
            >
              <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center text-white bg-black bg-opacity-30">
                {item.title && (
                  <h2 className="text-[100px] font-extrabold">{item.title}</h2>
                )}
                {item.content && (
                  <p className="text-[30px] font-bold leading-[30px] text-center mb-8">
                    {item.content}
                  </p>
                )}
                <div
                  className="flex h-[67px] w-[67px] cursor-pointer items-center justify-center rounded-full bg-red-600 text-white font-extrabold leading-[47px] text-xl"
                  onClick={() => playVideo(index)}
                >
                  PLAY
                </div>
              </div>
              <CloudinaryContext cloudName={cloudinaryName} className="h-full">
                <Video
                  publicId={item.video}
                  className="h-full w-full object-cover"
                  innerRef={videoRefs.current[index]} // Link the ref to the video element
                  preload="auto"
                />
              </CloudinaryContext>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default VerticalSlider;
