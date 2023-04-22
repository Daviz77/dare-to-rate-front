import { useFormik } from 'formik'
import FormControl from '../../components/formControl/FormControl'
import Input from '../../components/imput/Imput'
import { signupSchema } from './schemas/signup.schemas'
import { signup, login as loginService } from '../../services/AuthService'
import { useContext } from 'react'
import AuthContext from '../../contexts/AuthContext'
import { Card, Col, Container, Row } from 'react-bootstrap'

const initialValues = {
	username: '',
	email: '',
	password: '',
	img: '',
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
						<Col md={8} lg={6} xs={12}>
							<Card className='px-4'>
								<Card.Body>
									<div className='mb-3 mt-md-4'>
										<h2 className='fw-bold'>Hello, friend!</h2>
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

											<FormControl text='About' error={touched.about && errors.about} htmlFor='about'>
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

											<FormControl text='Image' error={touched.img && errors.img} htmlFor='img'>
												<Input
													id='img'
													type='file'
													name='img'
													onChange={(event) => {
														setFieldValue('img', event.currentTarget.files[0])
													}}
													onBlur={handleBlur}
													error={touched.img && errors.img}
													placeholder='Upload your image...'
												/>
											</FormControl>
											<div className='d-grid'>
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
					<div>
						<h1>Gald to see you!</h1>
						<p>
							Be part of the Dare to rate community and enjoy unlimited access to the best reviews and movies. Have
							conversations about the movies you like the most and enjoy without limits as if you were a professional
							movie critic.
						</p>
					</div>
				</Row>
			</div>
		</div>
	)
}

export default Signup
