export const errorHelper = (formik: any, key: string) => {
  const isShow: boolean = formik.errors[key] && formik.touched[key];
  return {
    isInvalid: isShow,
    errorMessage: isShow ? formik.errors[key] : null
  }
}