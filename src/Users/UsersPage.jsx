import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../Shared/Header.jsx'
import Footer from '../Shared/Footer.jsx'

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
}

function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    try {
      setLoading(true)
      setError('')
      const apiResponse = await axios.get('https://dummyjson.com/users')
      setUsers(apiResponse.data?.users || [])
    } catch (err) {
      setError(err?.message || 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function resetForm() {
    setFormData(INITIAL_FORM)
    setEditingId(null)
  }

  function handleEdit(user) {
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
    })
    setEditingId(user.id)
    setSuccessMessage('')
    setError('')
  }

  async function handleDelete(user) {
    const confirmed = window.confirm(`Delete user ${user.firstName} ${user.lastName}?`)
    if (!confirmed) {
      return
    }

    try {
      setError('')
      setSuccessMessage('')
      await axios.delete(`https://dummyjson.com/users/${user.id}`)
      setUsers((prevUsers) => prevUsers.filter((tempUser) => tempUser.id !== user.id))
      setSuccessMessage('User deleted successfully')

      if (editingId === user.id) {
        resetForm()
      }
    } catch (err) {
      setError(err?.message || 'Failed to delete user')
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError('First name, last name, and email are required')
      return
    }

    try {
      setSubmitting(true)
      setError('')
      setSuccessMessage('')

      if (editingId) {
        const apiResponse = await axios.put(`https://dummyjson.com/users/${editingId}`, formData)
        const updatedUser = apiResponse.data

        setUsers((prevUsers) =>
          prevUsers.map((tempUser) =>
            tempUser.id === editingId ? { ...tempUser, ...updatedUser } : tempUser,
          ),
        )
        setSuccessMessage('User updated successfully')
      } else {
        const apiResponse = await axios.post('https://dummyjson.com/users/add', formData)
        const newUser = apiResponse.data

        setUsers((prevUsers) => [{ ...newUser }, ...prevUsers])
        setSuccessMessage('User added successfully')
      }

      resetForm()
    } catch (err) {
      setError(err?.message || 'Failed to save user')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <main className="container py-5">
        <div className="row g-4">
          <div className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h2 className="h5 mb-3">{editingId ? 'Edit User' : 'Add User'}</h2>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      className="form-control"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      className="form-control"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      className="form-control"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="d-grid gap-2">
                    <button className="btn btn-primary" disabled={submitting} type="submit">
                      {submitting
                        ? editingId
                          ? 'Updating...'
                          : 'Adding...'
                        : editingId
                          ? 'Update User'
                          : 'Add User'}
                    </button>
                    {editingId ? (
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={resetForm}
                      >
                        Cancel Edit
                      </button>
                    ) : null}
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h1 className="h5 mb-0">Users</h1>
                  <button className="btn btn-outline-primary btn-sm" onClick={fetchUsers}>
                    Refresh
                  </button>
                </div>

                {error ? <div className="alert alert-danger py-2">{error}</div> : null}
                {successMessage ? <div className="alert alert-success py-2">{successMessage}</div> : null}

                {loading ? (
                  <div className="alert alert-info mb-0">Loading users...</div>
                ) : users.length === 0 ? (
                  <div className="alert alert-warning mb-0">No users found.</div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th className="text-end">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{`${user.firstName || ''} ${user.lastName || ''}`.trim()}</td>
                            <td>{user.email || '-'}</td>
                            <td>{user.phone || '-'}</td>
                            <td className="text-end">
                              <div className="btn-group btn-group-sm" role="group">
                                <button
                                  className="btn btn-outline-primary"
                                  onClick={() => handleEdit(user)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-outline-danger"
                                  onClick={() => handleDelete(user)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default UsersPage
