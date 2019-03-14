import React from 'react';
import {Link} from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <main className="flex-shrink-0">
        <div className="home-hero">
          <div className="container h-100">
            <div className="row h-100">
              <div className="col-12 offset-md-5 col-md-7 offset-lg-6 col-lg-6 offset-xl-6 col-xl-6 h-100">
                <div className="d-table w-100 h-100">
                  <div className="d-table-cell w-100 h-100 align-bottom align-md-middle text-white text-center pb-5">
                    <h1 className="text-uppercase pt-2">
                      Welcome to
                      <br />
                      Car Seat Jungle
                    </h1>
                    <div className="my-3" style={{fontSize: '1.5rem'}}>
                      The Car Seat Search Engine
                    </div>
                    <span className="d-block mb-4 text-white-50">
                      Simply answer 5 quick questions and
                      <br />
                      discover which car seats meet your needs.
                    </span>
                    <Link
                      to="/filter"
                      className="btn btn-start btn-lg px-3 py-1 px-md-5 py-md-3 mb-4 mb-md-0 font-weight-bold text-uppercase"
                    >
                      Start Now
                      <i className="fas fa-chevron-right ml-4" />
                    </Link>
                    <span className="d-block text-center text-white-50 pt-3">
                      It’s 100% free!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="home-hero">
          <div className="container h-100">
            <div className="d-table w-100 h-100">
              <div className="d-table-cell w-100 h-100 align-bottom text-center text-white">
                <h1 className="text-uppercase pt-2">Keep Your Kids Safe</h1>
                <h3 className="mt-3 mb-4">
                  Find Perfect Car Seat For Your Little One
                </h3>
                <a
                  href="/guide"
                  className="btn btn-start btn-lg px-5 py-3 mb-4 mb-sm-5"
                >
                  Start The Guide
                  <i className="fas fa-chevron-right ml-4" />
                </a>
              </div>
            </div>
          </div>
        </div> */}
        <div className="container py-5">
          <div className="row">
            <div className="col-md-6">
              <h3>Welcome</h3>
              <p>
                Isn’t finding the right car seat more complicated than it should
                be? You might be wondering if you need an ISOFIX seat or whether
                you should buy a combination car seat that will last longer or
                simply which car seats are safest. And once you know what you
                need, how do you even start to compare different car seats which
                all seem to be similar?
                <br />
                <br />
                Well, you are not alone. Car Seat Jungle was created to simplify
                how parents, guardians and carers look for a new car seat. The
                best news? <strong>It’s completely free.</strong>
                <br />
                <br />
                <strong>Our mission is simple:</strong> empower consumers to
                make informed child car seat choices.
                <br />
                <br />
                We don’t want you to rely just on opinion and reviews. We want
                to help you <strong>understand what your family needs</strong>,
                what the differences between car seats are and make an informed
                decision to buy a car seat that suits your family and not
                somebody else’s.
                <br />
                <br />
                There is an easy to use 5-step search tool, a blog packed with
                fact-checked information and a car seat library boasting
                virtually all available car seats in the UK. We are just getting
                started and there is a lot more to come.
              </p>
            </div>
            <div className="col-md-6">
              <h3>How To Use</h3>
              <p>
                New to Car Seat Jungle? Here’s how to use it:
                <br />
                <br />
                <ul>
                  <li style={{listStyle: 'none'}}>
                    1. Click the ‘START NOW’ button
                  </li>
                  <li style={{listStyle: 'none'}}>
                    2. Answer 5 easy questions
                  </li>
                  <li style={{listStyle: 'none'}}>
                    3. Receive a results page with car seats that meet your
                    criteria
                  </li>
                  <li style={{listStyle: 'none'}}>
                    4. Optional: you can refine your search by using additional
                    filters
                  </li>
                  <li style={{listStyle: 'none'}}>
                    5. View your shortlisted car seats in detail
                  </li>
                </ul>
                Find your new car seat. You got this.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Home;
