import EventsMasonry from '@/components/events_masonry';
import { getEventsPage } from '@/lib/action/action';
import Image from 'next/image';
export default async function Home() {
  const events = await getEventsPage(0, 3);
  const loadMore = async (skip: number, limit: number) => {
    'use server';
    const moreEvents = await getEventsPage(skip, limit);
    return JSON.parse(JSON.stringify(moreEvents));
  }
  return (
    <div className="w-full">
      <div className='relative w-auto h-[200px]'>
        <Image src="/images/band/band_one.jpg" alt="Hero" fill style={{ objectFit: 'cover' }}></Image>
        <div className="absolute bottom-0 w-full h-full bg-black/60 text-center text-5xl text-white py-32 antonfont">
          Rocking hard since 1964
        </div>
      </div>
      <EventsMasonry events={JSON.parse(JSON.stringify(events))} loadMore={loadMore} />
    </div>
  );
}
