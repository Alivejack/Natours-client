import { useParams } from 'react-router-dom';
import useFetch from '../Hooks/useFetch';
import LoadingModal from '../components/LoadingModal';
import { Clock, MapPin, Calendar, Activity, User, Star } from 'lucide-react';
import Slider from '../components/Slider';

export default function TourPage() {
  const { tourSlug } = useParams();
  const { data, loading, error } = useFetch(
    `http://127.0.0.1:3000/api/v1/tours/${tourSlug}`
  );
  if (error) return <p className="text-2xl w-fit mx-auto mt-10">Error: {error}</p>;
  if (loading || data === null) return <LoadingModal isLoading={loading} />;

  const date = new Date(data.startDates[0]);
  const monthName = date.toLocaleString('default', {
    month: 'long',
  });
  const yaer = date.getFullYear();

  const quickFacts = (Icon, text, m1, m2) => (
    <div className="flex gap-x-3">
      <Icon color="#43df72" />
      <h5 className=" text-gray-500 font-semibold mr-2">{text}</h5>
      <p className=" text-gray-500 first-letter:uppercase">
        {m1}
        {m1 && m2 ? (typeof m1 === 'number' && typeof m2 === 'number' ? ' / ' : ' ') : ''}
        {m2}
      </p>
    </div>
  );

  return (
    <section className="md:w-[96%] mx-auto">
      {/* --- IMAGE ---- */}
      <div className="w-full h-[29rem] sm:h-[36rem] relative">
        <img src={`../tours/${data.imageCover}`} className="object-cover w-full h-full" />

        {/* -- middle box -- */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-y-10">
          <h2 className=" text-white text-5xl bg-green-600/75 px-4 py-2 pb-3 rounded-2xl text-center">
            {data.name}
          </h2>
          <div className="flex mx-auto gap-25 text-white ">
            <div className="flex gap-x-2 bg-green-600/65 h-fit px-2 py-2 rounded-full">
              <Clock />
              {data.duration}
              Days
            </div>
            <div className="flex gap-x-2 bg-green-600/65 w-[10rem]  h-fit px-2 py-2 rounded-full">
              <MapPin />
              {data.startLocation.description}
            </div>
          </div>
        </div>
      </div>

      {/* --- DESCRIPTION --- */}
      <div className="w-full h-auto flex flex-col lg:flex-row-reverse">
        {/* about */}
        <div className="lg:w-1/2 py-12 flex flex-col justify-center items-start gap-10 text-left px-20">
          <h4 className="uppercase text-3xl text-green-400">
            about the {data.name} tour
          </h4>
          <p className="text-lg ">{data.description}</p>
        </div>

        {/* details */}
        <div className="lg:w-1/2 py-12 gap-10 bg-gray-50 flex flex-col justify-center items-center">
          {/* quick facts */}
          <div className="flex flex-col items-center gap-9">
            <h4 className="uppercase text-green-400 text-3xl">quick facts</h4>
            <div className="flex flex-col gap-7">
              {quickFacts(Calendar, 'NEXT DATE', monthName, yaer)}
              {quickFacts(Activity, 'DIFFICULTY', data.difficulty, '')}
              {quickFacts(User, 'PARTICIPANTS', data.maxGroupSize, 'People')}
              {quickFacts(Star, 'RATING', data.ratingsAverage, data.ratingsQuantity)}
            </div>
          </div>
          {/* tour guides */}
          <div className="flex flex-col items-start gap-9">
            <h4 className="uppercase text-green-400 text-3xl">your tour guides</h4>
            <div className="flex flex-col gap-y-5">
              {data.guides.map((guide, i) => (
                <div key={i} className="flex items-center gap-x-3 ">
                  <img
                    src={`../users/${guide.photo}`}
                    className="w-10 h-10 rounded-full"
                    alt="profile picture"
                  />
                  <h6 className=" text-gray-600 font-semibold mr-2 uppercase">
                    <span>{guide.role === 'lead-guide' ? '' : 'TOUR '}</span>
                    {guide.role.split('-').join(' ')}
                  </h6>
                  <p className=" text-gray-500 first-letter:uppercase">{guide.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- PICTURES --- */}
      <Slider data={data} />
    </section>
  );
}
