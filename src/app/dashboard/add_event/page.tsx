import AddEventComponent from "@/components/forms/add_event_form";
import { getAllVenues } from "@/lib/action/action";
import DBconnect from "@/lib/db";
import Event, { IEvent } from "@/lib/models/event";


export default async function AddEventPage () {
  const venues = await getAllVenues()
  const postEvent = async (formData: IEvent) => {
    'use server'
    await DBconnect();
    try {
      const newEvent = new Event(formData);
      await newEvent.save();
      return { success: true, message: 'Event added' };
    } catch (error) {
      return { success: false, message: 'Error adding event' };
    }
  }
  return (
    <AddEventComponent venueList={JSON.parse(JSON.stringify(venues))} postEvent={postEvent} />
  )
}