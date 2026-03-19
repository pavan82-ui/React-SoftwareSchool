import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

function Signup() {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full name is required'),
      email: Yup.string().email('Enter a valid email').required('Email is required'),
      password: Yup.string().required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    onSubmit: (values) => {
      console.log('Signup submitted:', values)
    },
  })

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h1 className="h4 mb-3">Sign Up</h1>

              <form onSubmit={formik.handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="signupName" className="form-label">
                    Full Name
                  </label>
                  <input
                    name="fullName"
                    id="signupName"
                    type="text"
                    className={`form-control ${
                      formik.touched.fullName && formik.errors.fullName ? 'is-invalid' : ''
                    }`}
                    placeholder="John Doe"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.fullName && formik.errors.fullName ? (
                    <div className="invalid-feedback">{formik.errors.fullName}</div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="signupEmail" className="form-label">
                    Email address
                  </label>
                  <input
                    name="email"
                    id="signupEmail"
                    type="email"
                    className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                    placeholder="name@example.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="invalid-feedback">{formik.errors.email}</div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="signupPassword" className="form-label">
                    Password
                  </label>
                  <input
                    name="password"
                    id="signupPassword"
                    type="password"
                    className={`form-control ${
                      formik.touched.password && formik.errors.password ? 'is-invalid' : ''
                    }`}
                    placeholder="Create a password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="invalid-feedback">{formik.errors.password}</div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="signupConfirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    name="confirmPassword"
                    id="signupConfirmPassword"
                    type="password"
                    className={`form-control ${
                      formik.touched.confirmPassword && formik.errors.confirmPassword
                        ? 'is-invalid'
                        : ''
                    }`}
                    placeholder="Confirm your password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
                  ) : null}
                </div>

                <button type="submit" className="btn btn-success w-100 mb-3">
                  Create Account
                </button>

                <p className="small text-center mb-0">
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Signup
