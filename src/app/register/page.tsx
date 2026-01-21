'use client'
import { errorHelper } from "@/components/utils";
import { Input, Button } from "@heroui/react";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';

export default function RegisterPage() {
  const [formType, setFormType] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email is required')
        .email('Please enter right eamil'),
      password: Yup.string()
        .required('Password is required')
        .min(4, 'Password is too short')
        .max(6, 'Password is too long')
    }),
    onSubmit: async (values: any) => {
      console.log(values);
    }
  })
  const handleFormType = () => {
    setFormType(!formType);
  }
  return (
    <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
      <h1 className='text-5xl py-10'>
        {formType ? 'Register' : 'Sign in'}
      </h1>
      <div className="mb-5">
        <Input
          type='email'
          label='Email'
          fullWidth={true}
          {...formik.getFieldProps('email')}
          {...errorHelper(formik, 'email')}
        />
      </div>
      <div className="mb-5">
        <Input
          type='password'
          label='Password'
          fullWidth={true}
          {...formik.getFieldProps('password')}
          {...errorHelper(formik, 'password')}
        />
      </div>
      <div className='mb-3'>
        <Button color='secondary' type='submit'>
          {formType ? 'Register' : 'Sign in'}
        </Button>
      </div>
      <div className='mb-3'>
        <Button color='primary' variant='bordered' onPress={handleFormType}>
          {formType ?
            'Already registered ? Click here'
            :
            'Already signed in ? Click here'
          }
        </Button>
      </div>
    </form>
  );
}
