'use client'
import { IVenue } from "@/lib/models/venue";
import { Button, Divider, Input, Select, SelectItem, Textarea } from "@heroui/react";
import { error } from "console";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { errorHelper } from "../utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useTransition } from "react";
import { IEvent } from "@/lib/models/event";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export default function AddEventComponent({ venueList, postEvent }: { venueList: IVenue[], postEvent: (formData: IEvent) => Promise<any> }) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      artist: '',
      venue: '',
      date: '',
      description: '',
      slug: ''
    },
    validationSchema: Yup.object({
      artist: Yup.string().required('Artist name is required'),
      venue: Yup.string().required('Venue is required'),
      date: Yup.string().required('Date is required'),
      description: Yup.string().required('Description is required'),
      slug: Yup.string().required('Slug is required')
    }),
    onSubmit: async (values) => {
      console.log('values ===', values);
      handleSubmit(values as IEvent);
    }
  })

  const handleSubmit = (formData: IEvent) => {
    startTransition(async () => {
      const { success, message } = await postEvent(formData);
      if (!success) {
        setError(message);
      } else {
        toast.success('Event added successfully', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
        });
        redirect('/')
      }
    })
  }
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl mb-5 mt-5">Add New Event</h1>
      <Divider />
      <form onSubmit={formik.handleSubmit}>
        <Input
          label="Artist name"
          type="text"
          placeholder="Enter artist name"
          className="mb-5 mt-5"
          variant={'bordered'}
          fullWidth={true}
          {...formik.getFieldProps('artist')}
          {...errorHelper(formik, 'artist')}
        />
        <Select
          label="Select Venue"
          className="mb-5"
          variant={'bordered'}
          fullWidth={true}
          {...formik.getFieldProps('venue')}
          {...errorHelper(formik, 'venue')}
        >
          {
            venueList.map((venue) => (
              <SelectItem key={venue._id}>
                {venue.name}
              </SelectItem>
            ))
          }
        </Select>
        <Textarea
          label="Description"
          placeholder="Enter event description"
          fullWidth={true}
          className="mb-5"
          {...formik.getFieldProps('description')}
          {...errorHelper(formik, 'description')}
        ></Textarea>

        <DatePicker
          selected={startDate}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          onChange={(date: Date | null) => {
            formik.setFieldValue('date', date, true)
            setStartDate(date)
          }}
          customInput={
            <CustomPickerButton formik={formik} />
          }
        />
        <Input
          label="Slug"
          type="text"
          placeholder="Enter slug name"
          className="mb-5"
          variant={'bordered'}
          fullWidth={true}
          {...formik.getFieldProps('slug')}
          {...errorHelper(formik, 'slug')}
        />
        {
          !isPending ?
            <Button type="submit" variant="solid" color="primary">
              Add Event
            </Button>
            : null
        }
        {
          error ?
            <div className="text-xs text-red-600">{error}</div>
            : null
        }
      </form>
    </div>
  )
}

const CustomPickerButton = ({ formik, ref, onClick, value }: any) => {
  return (
    <div className="mb-5">
      <Button
        variant="bordered"
        color={`${formik.errors.date && formik.touched.date ? 'danger' : 'primary'}`}
        fullWidth={true}
        onPress={onClick}
        ref={ref}
      >
        {value ? value : 'Enter a date'}
      </Button>
      {
        formik.errors.date && formik.touched.date ?
          <span className="text-xs text-danger mt-1 block">
            {formik.errors.date}
          </span>
          : null
      }
    </div>
  )
}