import React from 'react';
import BreadCrumb from '../../components/layout/BreadCrumb';

const BlogPostTheWildWildWestOfCarSeatHire = () => (
  <main className="flex-shrink-0">
    <BreadCrumb
      history={[{text: 'Home', link: '/'}, {text: 'Blog', link: '/blog'}]}
      text={'The Wild Wild West of Car Seat Hire'}
    />

    <div
      style={{
        height: '500px',
        backgroundImage: 'url(/images/blog-hero1.jpg)',
        backgroundSize: 'cover',
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      <div className="container py-4 h-100">
        <div className="d-table w-100 h-100">
          <div className="d-table-cell w-100 h-100 align-bottom">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <h1 className="page-title text-white">
                  The Wild Wild West of Car Seat Hire
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container pt-5 pb-4">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <p>
            This post is about hiring a car seat when you are renting a car.
          </p>

          <p>
            After handing over an extortionate amount of money for the privilege
            of hiring a car seat (we recently paid a cringeworthy £63 for 7
            days), you head over to pick up the rented car seat and find that
            you are handed one which is either dirty or of cheap quality or
            both. You then realise that you have no clue on how to install the
            car seat and spend the next 30 minutes of your valuable holiday time
            figuring it out with a YouTube video in one hand and a crying
            baby/toddler in the other.
          </p>

          <p>
            Luckily for you, Car Seat Jungle solves the latter problem. Simply
            head over to the Car Seat Library, select your car seat model and
            get all the info on how to install the car seat. Once you know what
            type of installation the car seat requires, you can also check out
            this blog post which will guide you through the individual
            installation steps.
          </p>

          <p>
            The bad news is, we can’t solve the former problem: car rental
            companies often provide cheap or poor quality car seats and there is
            nothing to stop them. If you are lucky, you might get a car seat
            from a well-known and trusted brand but even then you still wonder
            if the car seat is safe: how long has it been in use? Has the car
            seat been cleaned with child-friendly detergents? Has the car seat
            been handled well? For example, has it been thrown or dropped? Has
            it been exposed to extended periods of time in the heat which can
            cause the car seat to lose its safety properties?
          </p>

          <p>
            And then there is this to consider: car rental companies say very
            little about the car seats that they rent out. First and foremost,
            when booking a car seat you don’t know what brand or even
            installation type to expect. Second, is there a car seat policy in
            place to ensure car seats are handled well and are safe to use? (The
            answer for pretty much all rental companies is ‘No’). Third, why is
            it so utterly extortionate to hire car seats? In some cases renting
            the car seat is as expensive as renting the car itself. Finally, why
            is staff not trained in car seat fitting so that they can provide
            guidance on installing car seats?
          </p>

          <p>
            Perhaps worst of all are the statements which can be found on
            official car rental websites. This blog post reveals the top and
            bottom car rental companies in relation to the information they
            provide about their car seat hiring options and the emphasis they
            put on child safety.
          </p>

          <p>
            Is it time for car rental companies to step up and make child safety
            a priority? A quick search online reveals discussions from thousands
            of concerned parents about bad experiences with car seat rentals.
            Most commonly, unsuitable car seats are given as the only option to
            parents who had booked a car seat in advance and were expecting car
            seats adequate to the child’s weight or height.
          </p>

          <p>
            Leave a comment below to share your experiences of buying a car
            seat.
          </p>
        </div>
      </div>
    </div>
  </main>
);

export default BlogPostTheWildWildWestOfCarSeatHire;
