import React from 'react';

class Contact extends React.Component {
  render() {
    return (
      <main className="flex-shrink-0">
        <div className="container py-5">
          <h1 className="page-title mb-4">Contact</h1>
          <p>
            We are always happy to hear from our users. If you have feedback
            about our site or a question relating to the website please get in
            touch below.
          </p>
          <p className="font-italic">
            Please note, we are not car seat fitting specialists and we do not
            answer questions related to car seat installation and usage. Contact
            a car seat technician or specialist center near you and they’ll be
            able to answer all questions.
          </p>
          <h3 className="subtitle py-2">Contact form</h3>
          <form method="post">
            <div className="form-group row">
              <label htmlFor="fromName" className="col-sm-2 col-form-label">
                Your name
              </label>
              <div className="col-sm-6">
                <input type="text" className="form-control" id="fromName" />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="fromEmail" className="col-sm-2 col-form-label">
                Your Email
              </label>
              <div className="col-sm-6">
                <input type="text" className="form-control" id="fromEmail" />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="fromMessage" className="col-sm-2 col-form-label">
                Message
              </label>
              <div className="col-sm-6">
                <textarea className="form-control" id="fromMessage" rows="5" />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-6 offset-sm-2">
                <button type="button" className="btn btn-primary">
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    );
  }
}

export default Contact;
