function SignUp() {
    return (
        <div className="card shadow-sm border-0 h-100">
            <div className="card-body p-4">
                <h2 className="h4 mb-3">Create Account</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="signupName" className="form-label">
                            Full name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="signupName"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="signupEmail" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="signupEmail"
                            placeholder="name@example.com"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="signupPassword" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="signupPassword"
                            placeholder="Create a password"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="signupConfirmPassword" className="form-label">
                            Confirm password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="signupConfirmPassword"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-success w-100">
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignUp