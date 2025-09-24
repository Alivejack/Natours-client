import LoadingModal from '../../components/LoadingModal';
import Card from './Card';
import useFetch from '../../Hooks/useFetch';

export default function Home() {
  const { data, loading, error } = useFetch('http://127.0.0.1:3000/api/v1/tours');

  if (error) return <p>Error: {error}</p>;
  if (loading || data === null) return <LoadingModal isLoading={loading} />;

  return (
    <main className=" bg-neutral-100 md:w-[96%] mx-auto ">
      <Card data={data} />
    </main>
  );
}
