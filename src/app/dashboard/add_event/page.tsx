import AddEventComponent from "@/components/forms/add_event_form";
import { getAllVenues } from "@/lib/action/action";


export default async function AddEventPage () {
  const venues = await getAllVenues()
  return (
    <AddEventComponent venueList={JSON.parse(JSON.stringify(venues))}/>
  )
}