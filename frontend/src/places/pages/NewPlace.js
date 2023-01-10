import { useFormik } from "formik";
import * as Yup from 'yup'
export const NewPlace = () => {
	const formik = useFormik({
		initialValues:{ email: "", password: "" },

    validationSchema: Yup.object().shape({
      // firstName: Yup.string()
      //   .max(15, 'Must be 15 characters or less')
      //   .required('Required'),
      // lastName: Yup.string()
      //   .max(20, 'Must be 20 characters or less')
        // .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required').label('email'),
      password: Yup.string().required().min(6).label('password').matches(
        /(?=.*[0-9].*[0-9])/,
        'Ensure string has two digits.'),
    }),
    // onSubmit: values => {
    //   alert(JSON.stringify(values, null, 2));
    // },
  // });

		// validate:{(values) => {
		// 	const errors = {};
		// 	if (!values.email) {
		// 		errors.email = " required";
		// 	} else if (
		// 		!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
		// 	) {
		// 		errors.email = "Invalid email address";
		// 	}
		// 	return errors;
		// }}
		onSubmit:(values, { setSubmitting }) => {
			setTimeout(() => {
				alert(JSON.stringify(values, null, 2));
				setSubmitting(false);
			}, 400);
		}
		})




	return (
		<>
			<div>New place</div>

			<form onSubmit={formik.handleSubmit}>
				<input
					type="email"
					name="email"
					onChange={formik.handleChange}
					// onBlur={handleBlur}
					value={formik.values.email}
				/>
				{formik.errors.email && formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ): null}
				<input
					type="password"
					name="password"
					onChange={formik.handleChange}
					// onBlur={handleBlur}
					value={formik.values.password}
				/>
				{formik.errors.password && formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ): null
        }
				<button type="submit" >
					Submit
				</button>
			</form>
		</>
	);
};
