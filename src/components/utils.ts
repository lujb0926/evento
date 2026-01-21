import bcrypt from "bcryptjs";
export const errorHelper = (formik: any, key: string) => {
  const isShow: boolean = formik.errors[key] && formik.touched[key];
  return {
    isInvalid: isShow,
    errorMessage: isShow ? formik.errors[key] : null
  }
}

export const passwordHash = async (pwd: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(pwd, salt);
  return hash;
}

export const passwordCheck = async (pwd: string, hash: string) => {
  return await bcrypt.compare(pwd, hash);
}