import { MapPin, Calendar, Flag, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Card({ data }) {
  const date = data.map((tour) => new Date(tour.startDates[0]));
  const monthName = date.map((date) =>
    date.toLocaleString('default', {
      month: 'long',
    })
  );

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:grid-rows-3 justify-items-center py-10 md:py-18 md:px-20 gap-y-16">
      {data.map((tour, i) => (
        <div
          key={i}
          className="h-[37rem] w-[75%] rounded-2xl shadow-2xl overflow-hidden hover:scale-105 transform transition-all duration-300"
        >
          {/* --- COVER --- */}
          <div className="relative h-2/5 w-full rounded-t-2xl overflow-hidden">
            {/* img */}
            <img
              className="w-full h-full object-cover "
              src={`../../tours/${tour.imageCover}`}
              alt="tour cover"
            />
            {/* overlay */}
            {/* <div className="absolute inset-0 bg-green-500 opacity-50"></div> */}
            {/* tour name */}
            <div className="absolute bottom-5 right-3 text-white text-3xl">
              {tour.name}
            </div>
          </div>

          {/* ---  BODY ---  */}
          <div className=" bg-white p-8 ">
            {/* info */}
            <p className="uppercase mb-3 text-gray-500 font-semibold text-sm">
              {tour.difficulty} {tour.duration}-day tour
            </p>

            {/* summary */}
            <p className="font-thin text-gray-600 italic mb-6">{tour.summary}</p>

            {/* details */}
            <div className="grid grid-cols-2 gap-y-4">
              <div className="flex items-center gap-1">
                <MapPin color="green" />
                <p className="text-sm text-gray-500">{tour.startLocation.description}</p>
              </div>
              <div className="flex items-center gap-1">
                <Calendar color="green" />
                <p className="text-sm text-gray-500">{monthName[i]}</p>
              </div>
              <div className="flex items-center gap-1">
                <Flag color="green" />
                <p className="text-sm text-gray-500">{tour.locations.length} stops</p>
              </div>
              <div className="flex items-center gap-1">
                <User color="green" />
                <p className="text-sm text-gray-500">{tour.maxGroupSize} people</p>
              </div>
            </div>
          </div>

          {/* ---  FOOTER ---  */}
          <div className="flex justify-around items-center bg-gray-50 h-[21%] ">
            {/* Detail */}
            <div className="flex flex-col gap-3">
              <div>
                <span className=" text-gray-500 font-semibold text-md">
                  ${tour.price}
                </span>
                <span className="font-thin text-gray-500"> per person</span>
              </div>

              <div>
                <span className=" text-gray-500 font-semibold text-md">
                  {tour.ratingsAverage}
                </span>
                <span className="font-thin text-gray-500">
                  rating ({tour.ratingsQuantity})
                </span>
              </div>
            </div>

            {/* button */}
            <Link
              className="py-3 px-8 bg-green-400 rounded-full text-white hover:shadow-2xl hover:cursor-pointer hover:-translate-y-1 transition-all duration-300 ease-in-out transform"
              to={`/tour/${tour.slug}`}
            >
              DETAILS
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}
