import { useFormik } from 'formik'
import FormControl from '../../components/formControl/FormControl'
import Input from '../../components/imput/Imput'
import { signupSchema } from './schemas/signup.schemas'
import { signup, login as loginService } from '../../services/AuthService'
import { useContext } from 'react'
import AuthContext from '../../contexts/AuthContext'
import { Card, Col, Row } from 'react-bootstrap'

const initialValues = {
	username: '',
	email: '',
	password: '',
	about: '',
	image: '',
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
		setFieldValue
	} = useFormik({
		initialValues: initialValues,
		validateOnBlur: true,
		validateOnChange: false,
		validationSchema: signupSchema,
		onSubmit: (values) => {
			const formData = new FormData()
			formData.append('username', values.username)
			formData.append('email', values.email)
			formData.append('password', values.password)
			formData.append('about', values.about)
			formData.append('image', values.image)

			signup(formData)
				.then(() => loginService({ email: values.email, password: values.password }))
				.then((response) => {
					login(response.accessToken)
				})
				.catch((err) => {
					if (err?.response?.data?.message) {
						setFieldError('email', err?.response?.data?.message)
					} else {
						setFieldError('email', err.message)
					}
					setSubmitting(false)
				})
		},
	})

	return (
		<div className='row w-100' style={{ height: 'calc(100vh - 50px)', width: '100%' }}>
			<div className='col-6'>
				<Row className='align-items-center h-100'>
					<Row className='vh-60 d-flex justify-content-center align-items-center'>
						<Col md={9}>
							<Card className='px-4' style={{ border: 'none' }}>
								<Card.Body>
									<div className='mb-3 mt-md-4'>
										<h1 className='fw-bold'>Hello, friend!</h1>
									</div>
									<div className='mb-3'>
										<form onSubmit={handleSubmit}>
											<FormControl text='Username' error={touched.username && errors.username} htmlFor='username'>
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

											<FormControl text='Email' error={touched.email && errors.email} htmlFor='email'>
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

											<FormControl text='Password' error={touched.password && errors.password} htmlFor='password'>
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

											<FormControl text='About (optional)' error={touched.about && errors.about} htmlFor='about'>
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

											<FormControl text='Image (optional)' error={touched.image && errors.image} htmlFor='image'>
												<Input
													id='image'
													type='file'
													name='image'
													onChange={(event) => {
														setFieldValue('image', event.currentTarget.files[0])
													}}
													onBlur={handleBlur}
													error={touched.image && errors.image}
													placeholder='Upload your image...'
												/>
											</FormControl>
											<div style={{ marginLeft: '11rem' }}>
												<button className='btn btn-primary' type='submit' disabled={isSubmitting}>
													{isSubmitting ? 'Submitting...' : 'Create account'}
												</button>
											</div>
										</form>
									</div>
									<div className='mt-3'>
										<p className='mb-0  text-center'>
											Already have an account?{' '}
											<a href='/login' className='link-color fw-bold'>
												Login
											</a>
										</p>
									</div>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Row>
			</div>
			<div className='col-6'>
				<Row className='align-items-center h-100' style={{ backgroundColor: '#fbea7f', textAlign: 'center' }}>
					<Col md={1}></Col>
					<Col md={10}>
						{' '}
						<h1>Glad to see you!</h1>
						<p className='p1'>
							Be part of the Dare to rate community and enjoy unlimited access to the best reviews and movies. Have
							conversations about the movies you like the most and enjoy without limits as if you were a professional
							movie critic.
						</p>
					</Col>
					<Col md={1}></Col>
				</Row>
			</div>
		</div>
	)
}

export default Signup
