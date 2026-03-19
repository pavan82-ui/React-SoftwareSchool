import { Link } from 'react-router-dom'

function Home() {
  return (
    <main className="container py-5">
      <div className="text-center mb-4">
        <h1 className="display-6 fw-bold">Welcome</h1>
        <p className="text-muted mb-0">Login or create a new account from the home page.</p>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <Link to="/login" className="btn btn-primary w-100">
            Login
          </Link>
        </div>
        <div className="col-12 col-lg-6">
          <Link to="/signup" className="btn btn-success w-100">
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Home
