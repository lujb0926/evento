import { IActionReturn } from '@/lib/action/action'
import * as Yup from 'yup'

export const addVenueSchema = async (formData: FormData): Promise<IActionReturn> => {
  const data = {
    name: formData.get('name'),
    state: formData.get('state'),
    address: formData.get('address')
  }

  const schema = Yup.object({
    name: Yup.string().required('Name in required').min(2).max(100),
    address: Yup.string().required('Address is required').min(5).max(150),
    state: Yup.string().required('State in required')
  })
  try {
    const result = await schema.validate(data)
    console.log('result == ',result);
    return {success: true, message: 'success'}
  } catch (error: any) {
    console.log('error 111 ', JSON.stringify(error));
    return {
      success: false,
      message: error?.errors
    }
  }
}