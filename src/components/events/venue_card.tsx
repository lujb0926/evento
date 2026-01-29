'use client';
import { IVenue } from "@/lib/models/venue";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";

export default function VenueCardComponent({ venueData, eventDate }: { venueData?: IVenue, eventDate?: any }) {
  return (
    <>
      <Divider />
      <Card className="max-w-[400px] bg-slate-200 mt-5">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <div className="text-small">Venue Information</div>
            <div className="text-xl">{venueData?.name}</div>
            <div className="text-xl">{eventDate}</div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>
            {venueData?.address}, {venueData?.state}
          </p>
        </CardBody>
      </Card>
    </>
  )
}