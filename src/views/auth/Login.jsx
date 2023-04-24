import { useFormik } from 'formik'
import { loginSchema } from './schemas/login.schemas'
import FormControl from '../../components/formControl/FormControl'
import Input from '../../components/imput/Imput'
import { useContext } from 'react'
import AuthContext from '../../contexts/AuthContext'
import { login as loginService } from '../../services/AuthService'
import { Card, Col, Container, Row } from 'react-bootstrap'

const initialValues = {
	email: '',
	password: '',
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
			})
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
					<Row className='vh-50 d-flex justify-content-center align-items-center'>
						<Col md={9}>
							<Card style={{ border: 'none' }}>
								<Card.Body>
									<div className='mb-3 mt-md-4'>
										<h1 className='fw-bold' style={{ marginBottom: '0' }}>
											Hello!
										</h1>
										<p>
										Sign into your account
										</p>
										<form onSubmit={handleSubmit}>
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
											<div style={{ marginLeft: '14rem' }}>
												<button className='btn btn-primary' type='submit' disabled={isSubmitting}>
													{isSubmitting ? 'Submitting...' : 'Login'}
												</button>
											</div>
										</form>
										<div className='mt-3'>
											<p className='mb-0  text-center'>
												Don't have an account?{' '}
												<a href='/signup' className='link-color fw-bold'>
													Sign Up
												</a>
											</p>
										</div>
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
						<h1>Welcome back!</h1>
						<p style={{ margin: '0 2rem' }} className='p1'>
							The dare to rate community is very happy to have you back. Rate the last movie you watched or find one to
							watch next
						</p>
					</Col>
					<Col md={1}></Col>
				</Row>
			</div>
		</div>
	)
}

export default Login
