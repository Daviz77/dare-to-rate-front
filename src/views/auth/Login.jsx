import { useFormik } from "formik"
import { loginSchema } from "./schemas/login.schemas"
import FormControl from "../../components/formControl/FormControl"
import Input from "../../components/imput/Imput"
import { useContext } from "react"
import AuthContext from "../../contexts/AuthContext"
import { login as loginService } from "../../services/AuthService"
import { setAccessToken } from "../../stores/AccessTokenStore"

const initialValues = {
	email: "",
	password: "",
}

const Login = () => {
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
		validationSchema: loginSchema,
		onSubmit: (values) => {
			loginService({
				email: values.email,
				password: values.password,
			}) // llama a /login del back pasandole el email y la password
				.then((response) => {
					// Usar el login del contexto
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
			<h1>Login</h1>

			<form onSubmit={handleSubmit}>
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

				<button
					className='btn btn-primary'
					type='submit'
					disabled={isSubmitting}
				>
					{isSubmitting ? "Submitting..." : "Submit"}
				</button>
			</form>
			<div>
				<a href='/signup'>don't have an account?</a>
			</div>
		</div>
	)
}

export default Login
