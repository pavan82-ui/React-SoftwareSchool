import { useState } from 'react'
import Header from '../Shared/Header.jsx'
import Footer from '../Shared/Footer.jsx'

function UpdateProfile() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    profileImage: null,
  })

  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const MAX_FILE_SIZE = 1024 * 1024 // 1MB

  function handleInputChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleFileChange(e) {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > MAX_FILE_SIZE) {
      setErrorMsg(`File size exceeds 1MB limit. Selected file is ${(file.size / 1024 / 1024).toFixed(2)}MB`)
      setFormData((prev) => ({
        ...prev,
        profileImage: null,
      }))
      return
    }

    setFormData((prev) => ({
      ...prev,
      profileImage: file,
    }))
    setErrorMsg('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSuccessMsg('')
    setErrorMsg('')

    if (!formData.name || !formData.email) {
      setErrorMsg('Name and Email are required')
      return
    }

    setSuccessMsg('Profile updated successfully!')
    console.log('Profile data submitted:', formData)

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      bio: '',
      profileImage: null,
    })
  }

  return (
    <>
      <Header />
      <main className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4 p-md-5">
                <h1 className="h3 mb-4 text-center">Update Profile</h1>

                {successMsg && (
                  <div className="alert alert-success" role="alert">
                    {successMsg}
                  </div>
                )}

                {errorMsg && (
                  <div className="alert alert-danger" role="alert">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="profileName" className="form-label">
                      Full Name
                    </label>
                    <input
                      id="profileName"
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="profileEmail" className="form-label">
                      Email Address
                    </label>
                    <input
                      id="profileEmail"
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="profilePhone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      id="profilePhone"
                      type="tel"
                      className="form-control"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="profileBio" className="form-label">
                      Bio
                    </label>
                    <textarea
                      id="profileBio"
                      className="form-control"
                      name="bio"
                      rows="3"
                      placeholder="Tell us about yourself"
                      value={formData.bio}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="profileImage" className="form-label">
                      Profile Picture (Max 1MB)
                    </label>
                    <input
                      id="profileImage"
                      type="file"
                      className="form-control"
                      name="profileImage"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <small className="text-muted d-block mt-2">
                      Supported formats: JPG, PNG, GIF. Maximum size: 1MB
                    </small>
                    {formData.profileImage && (
                      <small className="text-success d-block mt-1">
                        ✓ File selected: {formData.profileImage.name} ({(formData.profileImage.size / 1024).toFixed(2)}KB)
                      </small>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default UpdateProfile
