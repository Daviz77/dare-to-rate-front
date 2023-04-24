import * as Yup from 'yup';

export const signupSchema = Yup.object({
  username: Yup
    .string('Username err')
    .required('Required'),
  email: Yup
    .string('Email err')
    .email('Invalid email')
    .required('Required'),
  password: Yup
    .string('Password err')
    .min(8, 'Length invalid')
    .required('Required'),
  image: Yup
    .string('Image err')
})