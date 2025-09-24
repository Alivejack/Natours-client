import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Slider({ data }) {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? data.images.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === data.images.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="relative w-full mx-auto lg:w-[60%] overflow-hidden shadow-xl rounded-xl my-10">
      {/* SLIDER */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {data.images.map((picture, i) => (
          <img
            src={`../tours/${picture}`}
            className="w-full object-cover shrink-0"
            alt={`picture number ${i}`}
            key={i}
          />
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 -translate-y-1/2 left-5 bg-black/50 text-white p-2 rounded-full hover:cursor-pointer"
      >
        <ChevronLeft />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 -translate-y-1/2 right-5 bg-black/50 text-white p-2 rounded-full hover:cursor-pointer"
      >
        <ChevronRight />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3 ">
        {data.images.map((_, i) => (
          <button
            onClick={() => setCurrent(i)}
            key={i}
            className={`h-3 w-3 rounded-full hover:cursor-pointer ${
              current === i ? 'bg-white' : 'bg-gray-100 opacity-50'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
