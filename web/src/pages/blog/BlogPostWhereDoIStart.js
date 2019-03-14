import React from 'react';
import BreadCrumb from '../../components/layout/BreadCrumb';

const BlogPostWhereDoIStart = () => (
  <main className="flex-shrink-0">
    <BreadCrumb
      history={[{text: 'Home', link: '/'}, {text: 'Blog', link: '/blog'}]}
      text={'Where do I start'}
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
                  5-step Guide to starting your car seat search
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
            A car seat is probably going to be the most complex purchase you
            make for your child. Here are a few key points to help you get
            started:
            <br />
            <br />
            <ol>
              <li>
                Set a budget: don’t save on a car seat. While expensive car
                seats are not always safer, our analysis has found that there is
                a strong correlation between price and safety. In other words,
                more expensive car seats are on average safer but there are
                exceptions. Here’s out in-depth analysis to car seat safety vs.
                price.
              </li>
              <li>
                Weigh and measure the height of your child before you start
                researching which car seat to buy. This blog post explains why
                this is so important. For babies that are not born yet, remember
                that dedicated infant car seats are the best choice for the
                first months of life.
              </li>
              <li>
                Make a list of vehicles where the car seat is going to be used.
                Note whether all have ISOFIX, if it’s just one car seat or more
                to be used in these vehicles, the space available in these cars,
                if and how often the car seat will have to be moved between cars
                and the ability of the different carers to fit the seat
                correctly.
                <br />
                <br />
                For example:
                <ul>
                  <li>
                    Car seats secured with ISOFIX will generally be easier to
                    move between cars but not all vehicles might have that
                    option
                  </li>
                  <li>
                    Car seats installed with tethers might take longer to
                    install every time they are moved, however additional tether
                    straps can be purchased for each car so that moving the seat
                    becomes quicker
                  </li>
                  <li>
                    In certain cars, tall drivers who need to push their seats
                    far back might find that there is not enough space for an
                    extended rear-facing seat behind them if two or more car
                    seats are being used
                  </li>
                </ul>
              </li>
              <li>
                Do your car seat research. Decide which features are essential
                and which car seats meet your needs. Car Seat Jungle simplifies
                this step by providing a comprehensive and easy to use search
                tool. You should now make a shortlist of 2 or 3 car seats to
                choose from.
              </li>
              <li>
                Go to a specialist to have the seat fitted in your car before
                you buy. Not all car seats fit well in all cars so this step is
                essential.
              </li>
            </ol>
          </p>
        </div>
      </div>
    </div>
  </main>
);

export default BlogPostWhereDoIStart;
