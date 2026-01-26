'use server'
import { addVenueSchema } from "@/components/forms/add_venue_schema";
import DBconnect from "../db"
import Venue, { IVenue } from '../models/venue'
import { revalidatePath } from "next/cache";

export interface IActionReturn {
  success: boolean;
  message: string | string[]
}

export const addVenue = async (prveData: any, formData: FormData): Promise<IActionReturn>  => {
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