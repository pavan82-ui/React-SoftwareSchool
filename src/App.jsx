import Login from './Login.jsx'
import SignUp from './Signup.jsx'

function App() {
  return (
    <main className="container py-5">
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <Login />
        </div>
        <div className="col-12 col-md-6">
          <SignUp />
        </div>
      </div>
    </main>
  )
}

export default App
