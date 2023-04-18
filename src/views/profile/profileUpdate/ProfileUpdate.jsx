import { useFormik } from "formik"
import { useContext } from "react"
import AuthContext from "../../../contexts/AuthContext"
import { getCurrentUser, profileUpdate } from "../../../services/UserService"
import { useNavigate } from "react-router-dom"
import FormControl from "../../../components/formControl/FormControl"
import Input from "../../../components/imput/Imput"



const ProfileUpdate = () => {
	const { currentUser, getCurrentUser } = useContext(AuthContext)
	const navigate = useNavigate()

	const initialValues = {
		username: currentUser.username,
		image: currentUser.image,
		about: currentUser.about,
	}

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
		setFieldValue,
	} = useFormik({
		initialValues: initialValues,
		validateOnBlur: true,
		validateOnChange: false,
		onSubmit: (values) => {
			const formData = new FormData()

			formData.append("username", values.username)
			formData.append("image", values.image)
			formData.append("about", values.about)

			profileUpdate(formData)
				.then(() => {
					getCurrentUser(() => navigate("/profile"))
				})
				.catch((err) => {
					if (err?.response?.data?.errors) {
						Object.keys(err.response.data.errors).forEach((key) => {
							setFieldError(key, err.response.data.errors[key])
						})
					}
					setSubmitting(false)
				})
		},
	})

	return (
		<div>
			<h1>Update profile</h1>

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
						placeholder='Change your username...'
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
						placeholder='Change your username...'
					/>
				</FormControl>

				<FormControl
					text='Image'
					error={touched.image && errors.image}
					htmlFor='image'
				>
					<Input
						id='image'
						type='file'
						name='image'
						onChange={(event) => {
							setFieldValue("image", event.currentTarget.files[0])
						}}
						onBlur={handleBlur}
						error={touched.image && errors.image}
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

export default ProfileUpdate
