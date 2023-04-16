import { useFormik } from "formik"
import FormControl from "../../components/formControl/FormControl"
import Input from "../../components/imput/Imput"
import { signupSchema } from "./schemas/signup.schemas"
import { signup, login as loginService } from "../../services/AuthService"
import { useContext } from "react"
import AuthContext from "../../contexts/AuthContext"

const initialValues = {
	username: "",
	email: "",
	password: "",
	img: "",
}

const Signup = () => {
	const { login } = useContext(AuthContext)

	const {
		values,
		errors,
		touched,
		handleChange,
		handleBlur,
		isSubmitting,
		handleSubmit,
		setSubmitting,
		setFieldError,
	} = useFormik({
		initialValues: initialValues,
		validateOnBlur: true,
		validateOnChange: false,
		validationSchema: signupSchema,
		onSubmit: (values) => {
			signup({
				username: values.username,
				email: values.email,
				password: values.password,
				about: values.about,
				img: values.img,
			})
				.then(() =>
					loginService({ email: values.email, password: values.password })
				)
				.then((response) => {
					login(response.accessToken)
				})
				.catch((err) => {
					if (err?.response?.data?.message) {
						setFieldError("email", err?.response?.data?.message)
					} else {
						setFieldError("email", err.message)
					}
					setSubmitting(false)
				})
		},
	})

	return (
		<div>
			<h1>Signup</h1>

			<form onSubmit={handleSubmit}>
				<FormControl
					text='Username'
					error={touched.username && errors.username}
					htmlFor='username'
				>
					<Input
						id='username'
						name='username'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.username}
						error={touched.username && errors.username}
						placeholder='Enter your username...'
					/>
				</FormControl>

				<FormControl
					text='Email'
					error={touched.email && errors.email}
					htmlFor='email'
				>
					<Input
						id='email'
						name='email'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.email}
						error={touched.email && errors.email}
						placeholder='Enter your email...'
					/>
				</FormControl>

				<FormControl
					text='About'
					error={touched.about && errors.about}
					htmlFor='about'
				>
					<Input
						id='about'
						name='about'
						type='textarea'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.about}
						error={touched.about && errors.about}
						placeholder='Tell us about you...'
					/>
				</FormControl>

				<FormControl
					text='Password'
					error={touched.password && errors.password}
					htmlFor='password'
				>
					<Input
						id='password'
						name='password'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.password}
						error={touched.password && errors.password}
						placeholder='Enter your password...'
						type='password'
					/>
				</FormControl>

			<FormControl
					text='Image'
					error={touched.img && errors.img}
					htmlFor='img'
				>
					<Input
						id='img'
						type='file'
						name='img'
						onChange={(event) => {
							setFieldValue("img", event.currentTarget.files[0])
						}}
						onBlur={handleBlur}
						error={touched.img && errors.img}
						placeholder='Upload your image...'
					/>
				</FormControl>

				<button
					className='btn btn-primary'
					type='submit'
					disabled={isSubmitting}
				>
					{isSubmitting ? "Submitting..." : "Submit"}
				</button>
			</form>
		</div>
	)
}

export default Signup
