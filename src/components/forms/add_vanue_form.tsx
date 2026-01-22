'use client'
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { useActionState } from "react"
import { states } from "../states";
import { addVenue } from "@/lib/action/action";

export default function AddVenueComponent() {
  const [state, action, pedding] = useActionState(addVenue, null)
  return (
    <form className='max-w-2xl mx-auto mt-10' action={action}>
      <Input
        className="mb-5"
        type="text"
        variant="bordered"
        label="Name"
        fullWidth={true}
        name="name"
      />
      <Input
        className="mb-5"
        type="text"
        variant="bordered"
        label="Address"
        fullWidth={true}
        name="address"
      />
      <Select
        className="mb-5"
        items={states}
        label="State"
        placeholder='Select the State'
        fullWidth={true}
        name="state"
      >
        {
          (item) => <SelectItem key={item.name}>{item.name}</SelectItem>
        }
      </Select>
      <Button type="submit" color="secondary" variant="bordered" className="mb-10">
        Add Venue
      </Button>
      {pedding ? <div>...loading</div> :
        <>
          {
            state?.success ?
              <div className='text-success'>
                {state?.message}
              </div>
              :
              <div className='text-danger'>
                <ul>
                  {(state?.message as Array<string>)?.map((error: string, index: number) => (
                    <li key={index}>- {error}</li>
                  ))}
                </ul>
              </div>
          }
        </>
      }
    </form>
  )
}