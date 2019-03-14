import React from 'react';

function BlogPost({url}) {
  if (url === undefined) url = '';

  switch (url.toString().toLowerCase()) {
    case 'where-do-i-start':
      return (
        <React.Fragment>
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
                  A car seat is probably going to be the most complex purchase
                  you make for your child. Here are a few key points to help you
                  get started:
                  <br />
                  <br />
                  <ol>
                    <li>
                      Set a budget: don’t save on a car seat. While expensive
                      car seats are not always safer, our analysis has found
                      that there is a strong correlation between price and
                      safety. In other words, more expensive car seats are on
                      average safer but there are exceptions. Here’s out
                      in-depth analysis to car seat safety vs. price.
                    </li>
                    <li>
                      Weigh and measure the height of your child before you
                      start researching which car seat to buy. This blog post
                      explains why this is so important. For babies that are not
                      born yet, remember that dedicated infant car seats are the
                      best choice for the first months of life.
                    </li>
                    <li>
                      Make a list of vehicles where the car seat is going to be
                      used. Note whether all have ISOFIX, if it’s just one car
                      seat or more to be used in these vehicles, the space
                      available in these cars, if and how often the car seat
                      will have to be moved between cars and the ability of the
                      different carers to fit the seat correctly.
                      <br />
                      <br />
                      For example:
                      <ul>
                        <li>
                          Car seats secured with ISOFIX will generally be easier
                          to move between cars but not all vehicles might have
                          that option
                        </li>
                        <li>
                          Car seats installed with tethers might take longer to
                          install every time they are moved, however additional
                          tether straps can be purchased for each car so that
                          moving the seat becomes quicker
                        </li>
                        <li>
                          In certain cars, tall drivers who need to push their
                          seats far back might find that there is not enough
                          space for an extended rear-facing seat behind them if
                          two or more car seats are being used
                        </li>
                      </ul>
                    </li>
                    <li>
                      Do your car seat research. Decide which features are
                      essential and which car seats meet your needs. Car Seat
                      Jungle simplifies this step by providing a comprehensive
                      and easy to use search tool. You should now make a
                      shortlist of 2 or 3 car seats to choose from.
                    </li>
                    <li>
                      Go to a specialist to have the seat fitted in your car
                      before you buy. Not all car seats fit well in all cars so
                      this step is essential.
                    </li>
                  </ol>
                </p>
              </div>
            </div>
          </div>
        </React.Fragment>
      );

    case 'when-do-i-need-to-replace-my-car-seat':
      return (
        <React.Fragment>
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
                        When do I need to replace my car seat?
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
                  There are three main reasons for replacing car seats:
                  <br />
                  <ol>
                    <li>
                      When your child grows out of their existing seat (that is
                      becomes too heavy or too tall for it)
                    </li>
                    <li>
                      When the car seat has been in a crash (note that this
                      applies to accidents where there was a child in the car
                      seat as well as when the car seat was empty)
                    </li>
                    <li>When a car seat has reached its expiration date</li>
                  </ol>
                </p>
                <p>
                  Most blogs or experts on the topic will say something along
                  the lines of “Always refer to the user manual of the car seat
                  you have”. Additionally, certain bodies or institutions will
                  provide their own guidelines, such as the NHS in the UK, the
                  Which? organisation or the National Highway Traffic Safety
                  Administration (NHTSA) in the US.
                </p>
                <p>
                  It is generally accepted that user manuals take precedence
                  over any other recommendations or guidelines provided by
                  bodies or institutions dealing with child car safety. If you
                  are not a fan of reading user manuals (we can’t blame you!)
                  call the manufacturer and ask your question(s).
                </p>
              </div>
            </div>
          </div>
        </React.Fragment>
      );

    case 'are-you-using-your-car-seat-correctly':
      return (
        <React.Fragment>
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
                        Are you using your car seat correctly?
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
                  So you got a car seat. You are thinking: ‘Great! My precious
                  little Hugo is going to be super safe in his new car seat’.
                  Let me stop you right there. Yes, car seats are great for
                  saving lives in the event of an accident. But chances are that
                  you are installing the seat incorrectly.
                </p>
                <p>
                  <strong>
                    Around 70% of car seats in Europe are installed or used
                    incorrectly.
                  </strong>{' '}
                  The EU Commissions program CASPER (Child Advanced Safety
                  Project for European Roads) reported that the use and misuse
                  studies which are regularly performed in Europe &quot;show
                  that the global situation is more or less stable and that
                  according to the definitions used by the investigators the
                  rate of incorrect use varies between 60 and 75% but rarely
                  reach a lower level than this&quot;.
                </p>
                <p>
                  This is confirmed by a recent Which? investigation which found
                  that even the people who are supposed to be experts fail to
                  install car seats correctly. They used the car fitting service
                  available at Mamas &amp; Papas, BabiesRUs and Mothercare.
                  Shockingly, out of the 42 car seats fitted across these
                  retailers, only 4 were fitted correctly.
                </p>
                <p>
                  That’s massive! So what can you do to make sure you are using
                  your car seat as intended?
                </p>
                <ol>
                  <li>
                    Follow the manual. As boring as it is, read the few pages
                    which explain how to correctly install the seat. Some
                    manufacturers have even made videos of how to install their
                    car seats. You can download the manual and check whether an
                    installation video is available in our Car Seat Library
                    [LINK]. If there is, watch it at least three times to make
                    sure you don’t miss a trick.
                  </li>
                  <li>
                    Strap your child in well. Don’t let the harness slide off
                    your child’s shoulders. Make it tight enough so they can’t
                    wriggle out. When they scream “It’s too tight!!!” tell them
                    you need to check something and wait a few seconds to see if
                    they say it again. If they don’t then the harness is most
                    likely not too tight. Ensure you are using the correct seat
                    for your child’s weight and height. A quick online search
                    for images of children in car seats reveals endless photos
                    of incorrect usage. Here are some examples of how{' '}
                    <strong>NOT</strong> to strap a child in.
                  </li>
                  <li>
                    Check the expiration date of your car seat(s). Due to wear
                    and tear of plastic and other materials, car seats lose
                    their protective ability. Here are a couple of examples of
                    expiration date labels on car seats:
                  </li>
                </ol>
                <p>
                  In summary, when using a new car seat it is incredibly
                  important to know how to install and how to strap your child
                  in well. Always remember to check the expiration date of a car
                  seat as well to ensure that you are using a seat that is still
                  safe.
                </p>
              </div>
            </div>
          </div>
        </React.Fragment>
      );

    case 'another-post':
      return (
        <React.Fragment>
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
                      <h1 className="page-title text-white">Another post</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container pt-5 pb-4">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <p>Hi! This is another post.</p>
              </div>
            </div>
          </div>
        </React.Fragment>
      );

    default:
      return <div>Post not found.</div>;
  }
}

export default BlogPost;
