import { getEventBySlug } from "@/lib/action/action";
import Image from "next/image";
import { IVenue } from "@/lib/models/venue";
import VenueCardComponent from "@/components/events/venue_card";

export default async function EvensSlugPage({params}: {params: Promise<any>}) {
  const slug = ((await params).slug || [])[0];
  const event = await getEventBySlug(slug);
  console.log('event==', event);
  
  return (
    <div className="max-w-5xl mx-auto my-10">
      <div className="relative w-auto h-[500px]">
        <Image
          fill
          alt="band"
          src={`https://picsum.photos/800/800?${slug}`}
          priority={true}
          style={{objectFit: 'cover'}}
        />
      </div>
      <div className="py-4">
        <div className="py-10">
          <h1 className="text-7xl">{event?.artist}</h1>
          <h3 className="text-3xl">{(event?.venue as IVenue)?.name}</h3>
        </div>
        {event?.description}
      </div>
      <VenueCardComponent
        venueData={JSON.parse(JSON.stringify(event?.venue))}
        eventDate={event?.date}
        />
    </div>
  )
}