'use client'
import { errorHelper } from "@/components/utils";
import { Input, Button } from "@heroui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { signIn } from "next-auth/react";
import * as Yup from 'yup';
import { redirect } from "next/navigation";

interface IValues {
  email: string;
  password: string;
}

export default function RegisterPage() {
  const [formType, setFormType] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: { email: 'knight_lujb@163.com', password: '111111' },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email is required')
        .email('Please enter right eamil'),
      password: Yup.string()
        .required('Password is required')
        .min(4, 'Password is too short')
        .max(6, 'Password is too long')
    }),
    onSubmit: async (values: IValues) => {
      submitForm(values);
    }
  })
  const submitForm = async (values: IValues) => {
    if (formType) {
      // Register
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          contentType: 'application/json'
        },
        body: JSON.stringify(values)
      })
      const user = await res.json()
      console.log('res1 = ', user);
      if (!res.ok) {
        alert(user.error)
      } else {
        signinUser(values)
      }
    } else {
      // Sign in
      signinUser(values)
    }
  }
  const signinUser = async (values: IValues) => {
    await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    }).then((res: any) => {
      console.log('signinUser res ', res);
      if (res.ok) {
        redirect('/dashboard')
      }
    })
  }
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
