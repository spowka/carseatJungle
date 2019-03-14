import React from 'react';

class About extends React.Component {
  render() {
    return (
      <main className="flex-shrink-0">
        <div className="container py-5">
          <h1 className="page-title mb-4">About</h1>
          <p>
            Car seats are not easy. They&apos;ve got lots of features and can be
            installed in different ways. So first of all, you really need to
            know what kind of car seat you need and once you purchase it, you
            need to learn how to use it correctly. Car Seat Jungle is here to
            help with both <strong>finding</strong> and <strong>using</strong> a
            car seat by providing real car seat data. That way you don&apos;t
            have to rely on countless recommendations and reviews by people who
            don&apos;t know what your family needs.
          </p>
          <hr />
          <div className="row">
            <div className="col-lg-6">
              <h4 className="page-subtitle pt-2 pt-2 font-weight-bold">
                Finding a car seat
              </h4>
              <p>
                Simply go to the <a href="/filter">Car Seat Search</a> function,
                answer 5 short questions and view all car seats which meet your
                criteria. For example, if you want an infant and toddler seat
                which swivels and is i-Size compliant, Car Seat Jungle will show
                you only these kinds of car seats and provide links to where to
                buy them.
              </p>
              <p>
                And if you are unsure what features you need in your next car
                seat, we have fact-checked resources too which include our blog
                and an Essential Guide to Car Seats which we will help you in
                choosing the right child car seat for your family.
              </p>
            </div>
            <div className="col-lg-6">
              <h4 className="page-subtitle pt-2 pt-2 font-weight-bold">
                Using a car seat
              </h4>
              <p>
                While we don&apos;t provide car seat fitting advice (this is
                best served by specialised technicians in person), we do have a
                useful <a href="/library">Car Seat Library</a> of all freely
                available car seat manuals and installation videos. All you need
                to do is select your car seat to see all of its user
                information. We are working on additional features which will
                help you understand how to install the particular car seat of
                your choice. Stay tuned.
              </p>
            </div>
          </div>
          <hr />
          <p className="pt-3">
            Car Seat Jungle is free to use and was created to solve a very real
            problem: that of too much choice and too much (often conflicting)
            information.
          </p>
          <p>
            Car Seat Jungle comprehensively gathers data on car seats, cuts
            through the clutter of information and presents it in a
            user-friendly format. Our databases are continuously updated to
            reflect the most up to date information from the car seat market.
            And we are just getting started. You&apos;ll soon be able to have a
            look at our upcoming features which we&apos;ll be launching in 2019.
          </p>
          <p>
            Car Seat Jungle is the creation of a mum who is also a data-geek,
            researcher and digital marketer.
          </p>
        </div>
      </main>
    );
  }
}

export default About;
