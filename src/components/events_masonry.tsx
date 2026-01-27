'use client'
import { IEvent } from '@/lib/models/event';
import { Card, CardHeader, CardFooter, Image as UIimage, Button } from '@heroui/react';
import { set } from 'mongoose';
import { useState } from 'react';
import Masonry from 'react-masonry-css';
const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1
};

export default function EventsMasonry({ events, loadMore }: { events: IEvent[], loadMore: (skip: number, limit: number) => Promise<IEvent[]> }) {
  const [eventsList, setEventsList] = useState<IEvent[]>(events);
  const [isMore, setIsMore] = useState<boolean>(true);

  const handleLoadMore = async () => {
    setIsMore(false);
    const moreEvents = await loadMore(eventsList.length, 3);
    if (moreEvents.length > 0) {
      setEventsList(list => ([...list, ...moreEvents]));
      setIsMore(true);
    } else {
      setIsMore(false);
    }
  }

  const randHeight = (number: number) => {
    if (number % 2 === 0) { return 200 }
    return 300;
  }
  return (
    <div className='max-w-5xl mx-auto pt-4 p-5'>
      <div className='text-3xl antonFont py-3'>Events</div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {eventsList.map((event: IEvent, index: number) => (
          <Card key={`${event._id}+${index}`} isFooterBlurred className="w-full col-span-12 sm:col-span-7">
            <CardHeader className="absolute z-10 top-0 flex-col items-start bg-black/40" >
              <p className='text-tiny text-white/60 uppercase font-bold'>{event.venue.name}</p>
              <h4 className='text-white/90 font-medium text-xl'>{event.artist}</h4>
            </CardHeader>
            <UIimage
              isZoomed={true}
              isBlurred={true}
              removeWrapper
              alt='Card background'
              className='z-0 w-full h-full object-cover'
              src={`https://picsum.photos/200/${randHeight(index)}?${index}`}
            />
            <CardFooter className="absolute z-10 bottom-0 bg-black/40">
              Go to event
            </CardFooter>
          </Card>
        ))}
      </Masonry>
      {
        isMore ? (
          <div className='text-center mt-5'>
            <Button variant='bordered' onPress={handleLoadMore}>Load More</Button>
          </div>
        ) : null
      }
    </div>
  );
}