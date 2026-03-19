import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { validateEmail } from '../Utils/utils'

function Login() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email is required')
        .test('is-valid-email', 'Enter a valid email', (value) => {
          if (!value) {
            return true
          }

          return validateEmail(value)
        }),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      console.log('Login submitted:', values)
    },
  })

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h1 className="h4 mb-3">Login</h1>

              <form onSubmit={formik.handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="loginEmail" className="form-label">
                    Email address
                  </label>
                  <input
                    name="email"
                    id="loginEmail"
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
                  <label htmlFor="loginPassword" className="form-label">
                    Password
                  </label>
                  <input
                    name="password"
                    id="loginPassword"
                    type="password"
                    className={`form-control ${
                      formik.touched.password && formik.errors.password ? 'is-invalid' : ''
                    }`}
                    placeholder="Enter password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="invalid-feedback">{formik.errors.password}</div>
                  ) : null}
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Link to="/resetpword" className="small text-decoration-none">
                    Forgot password?
                  </Link>
                  <Link to="/signup" className="small text-decoration-none">
                    Create account
                  </Link>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login
