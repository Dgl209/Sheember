import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'flowbite/src/components/carousel';

function Slider({ items }) {
  console.log('AdSlider items: ', items);
  const carouselRef = useRef([]);

  let carousel;

  if (carouselRef.current.length) {
    const carouselItems = carouselRef.current?.map((item, index) => ({ el: item, position: index }));
    const carouselOptions = {
      activeItemPosition: 1,
      interval: 3000,

      indicators: {
        activeClasses: 'bg-white dark:bg-gray-800',
        inactiveClasses: 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
        items: carouselItems,
      },
    };
    carousel = new Carousel(carouselItems, carouselOptions);
  }

  const onNext = () => {
    carousel.next();
  };

  const onPrev = () => {
    carousel.prev();
  };

  const handleIndicators = (id) => {
    console.log(id);
    carousel.slideTo(id);
  };

  return (
    <>
      <div id="default-carousel" className="relative" data-carousel="slide">
        <div className="overflow-hidden relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96">
          {items?.map((item, index) => (
            <div
              key={index}
              className="duration-700 ease-in-out absolute inset-0 transition-all transform translate-x-0 z-20"
              data-carousel-item=""
              ref={(el) => carouselRef.current.push(el)}
            >
              <img
                src={item}
                className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
                alt="..."
              />
            </div>
          ))}
        </div>

        <div className="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
          {items?.map((_, index) => (
            <button
              key={index}
              type="button"
              className="w-3 h-3 rounded-full bg-white dark:bg-gray-800"
              aria-current="false"
              aria-label="Slide 1"
              data-carousel-slide-to="0"
              onClick={() => handleIndicators(index)}
            ></button>
          ))}
        </div>

        <button
          type="button"
          className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
          data-carousel-prev=""
          onClick={onPrev}
        >
          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span className="hidden">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
          data-carousel-next=""
          onClick={onNext}
        >
          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <span className="hidden">Next</span>
          </span>
        </button>
      </div>
    </>
  );
}

Slider.propTypes = {
  items: PropTypes.array,
};

export default Slider;
