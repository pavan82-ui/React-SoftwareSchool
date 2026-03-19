function TalkTousform({ message }) {
  return (
    <section className="container pb-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <h2 className="h3 mb-2">Talk To Us</h2>
                <p className="text-muted mb-0">
                  Share your question and our team will get back to you.
                </p>
                <p className="small text-primary mt-2 mb-0">{message}</p>
              </div>

              <form>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="talkName" className="form-label">
                      Full Name
                    </label>
                    <input
                      id="talkName"
                      type="text"
                      className="form-control"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label htmlFor="talkEmail" className="form-label">
                      Email Address
                    </label>
                    <input
                      id="talkEmail"
                      type="email"
                      className="form-control"
                      placeholder="name@example.com"
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="talkMessage" className="form-label">
                      Message
                    </label>
                    <textarea
                      id="talkMessage"
                      className="form-control"
                      rows="4"
                      placeholder="Write your message here"
                    ></textarea>
                  </div>

                  <div className="col-12 text-center">
                    <button type="submit" className="btn btn-dark px-4">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TalkTousform
