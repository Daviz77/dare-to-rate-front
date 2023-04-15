import { useFormik } from "formik"
import { useContext } from "react"
import AuthContext from "../../../contexts/AuthContext"
import { profileUpdate } from "../../../services/UserService"
import { useNavigate } from "react-router-dom"
import FormControl from "../../../components/formControl/FormControl"
import Input from "../../../components/imput/Imput"

const initialValues = {
	username: "",
	img: '',
}

const ProfileUpdate = () => {
  const { getCurrentUser } = useContext(AuthContext)
  const navigate = useNavigate()

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
      formData.append("img", values.img)

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

export default ProfileUpdate
