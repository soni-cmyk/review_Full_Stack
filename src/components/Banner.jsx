import { useEffect, useState } from "react";
import Slider from "react-slick";
import axios, { BASE_URL } from "../api/axios";

const Banner = () => {
  const [slides, setSlides] = useState([]);

  // slider settings
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
  };

  // fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get("/banners");
        // if your response is {data:[...]}
        setSlides(res.data.data || res.data);
      } catch (err) {
        console.error("Failed to load banners", err);
      }
    };

    fetchBanners();
  }, []);

  // loading UI
  if (!slides || slides.length === 0) {
    return (
      <section className="h-[50vh] flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">No banners available</p>
      </section>
    );
  }

  return (
    <section className="h-[50vh] overflow-hidden">
      <Slider {...settings} className="h-full">
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[50vh]">

            {/* Background Image */}
            <img
              src={BASE_URL + slide.imageUrl}
              alt={slide.title}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="text-center text-white max-w-3xl px-6">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {slide.title}
                </h1>

                {slide.description && (
                  <p className="text-lg md:text-xl mb-6">
                    {slide.description}
                  </p>
                )}

                <div className="flex justify-center gap-4">
                  {slide.link && (
                    <a
                      href={slide.link}
                      className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition"
                    >
                      Visit Link
                    </a>
                  )}

                  <button className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-black transition">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Banner;
