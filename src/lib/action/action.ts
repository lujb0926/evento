'use server'
import { addVenueSchema } from "@/components/forms/add_venue_schema";
import DBconnect from "../db"
import Venue, { IVenue } from '../models/venue'
import Event, { IEvent } from '../models/event';
import { revalidatePath } from "next/cache";

export interface IActionReturn {
  success: boolean;
  message: string | string[]
}

export const addVenue = async (prveData: any, formData: FormData): Promise<IActionReturn> => {
  await DBconnect();
  try {
    const isValidated = await addVenueSchema(formData);
    if (!isValidated.success) {
      return isValidated;
    }
    const venue = new Venue({
      name: formData.get('name'),
      address: formData.get('address'),
      state: formData.get('state')
    })
    await venue.save();
    revalidatePath('/dashboard/add_event');
    return {
      success: true,
      message: 'Venue added'
    }
  } catch (error: any) {
    return {
      success: false,
      message: error?.errors
    }
  }
}

export const getAllVenues = async (): Promise<IVenue[]> => {
  try {
    await DBconnect();
    const venues = await Venue.find({});
    return venues;
  } catch (error) {
    return [];
  }
}

export const getEventsPage = async (skip: number, limit: number): Promise<IEvent[]> => {
  await DBconnect();
  try {
    const events = await Event.find({})
      .populate({path:'venue',model:Venue})
      .sort([['_id','desc']])
      .skip(skip)
      .limit(limit)
    return events;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const getEventBySlug = async (slug: string): Promise<IEvent | null> => {
  await DBconnect();
  try {
    const event = await Event.findOne({ slug }).populate({path:'venue',model:Venue});
    return event;
  } catch (error: any) {
    throw new Error(error.message);
  }
}