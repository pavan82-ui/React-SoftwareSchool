import { Link } from 'react-router-dom'
import Header from '../Shared/Header.jsx'
import Footer from '../Shared/Footer.jsx'
import TalkTousform from './TalkTousform.jsx'

function Home() {
  const talkToUsMessage = 'Need help choosing a course or getting started? Send us a message.'

  return (
    <>
      <Header />
      <main className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-9">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4 p-md-5 text-center">
                <h1 className="display-6 fw-bold mb-3">Software School</h1>
                <p className="lead text-muted mb-4">
                  Welcome to the authentication portal. Continue to login, create a new account,
                  or reset your password.
                </p>

                <div className="d-grid gap-3 d-md-flex justify-content-md-center">
                  <Link to="/login" className="btn btn-primary px-4">
                    Login
                  </Link>
                  <Link to="/signup" className="btn btn-success px-4">
                    Sign Up
                  </Link>
                  <Link to="/resetpword" className="btn btn-outline-secondary px-4">
                    Reset Password
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <TalkTousform message={talkToUsMessage} />
      <Footer />
    </>
  )
}

export default Home
