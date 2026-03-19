import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

function ResetPword() {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Enter a valid email').required('Email is required'),
    }),
    onSubmit: (values) => {
      console.log('Reset password submitted:', values)
    },
  })

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h1 className="h4 mb-3">Reset Password</h1>
              <p className="text-muted small mb-4">
                Enter your email and we will send you a password reset link.
              </p>

              <form onSubmit={formik.handleSubmit} noValidate>
                <div className="mb-4">
                  <label htmlFor="resetEmail" className="form-label">
                    Email address
                  </label>
                  <input
                    name="email"
                    id="resetEmail"
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

                <button type="submit" className="btn btn-warning w-100 mb-3">
                  Send Reset Link
                </button>

                <p className="small text-center mb-0">
                  Back to <Link to="/login">Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ResetPword
