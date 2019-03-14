import React from 'react';
import BreadCrumb from '../../components/layout/BreadCrumb';

const BlogPostAreYouUsingYourCarSeatCorrectly = () => (
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
            So you got a car seat. You are thinking: ‘Great! My precious little
            Hugo is going to be super safe in his new car seat’. Let me stop you
            right there. Yes, car seats are great for saving lives in the event
            of an accident. But chances are that you are installing the seat
            incorrectly.
          </p>
          <p>
            <strong>
              Around 70% of car seats in Europe are installed or used
              incorrectly.
            </strong>{' '}
            The EU Commissions program CASPER (Child Advanced Safety Project for
            European Roads) reported that the use and misuse studies which are
            regularly performed in Europe &quot;show that the global situation
            is more or less stable and that according to the definitions used by
            the investigators the rate of incorrect use varies between 60 and
            75% but rarely reach a lower level than this&quot;.
          </p>
          <p>
            This is confirmed by a recent Which? investigation which found that
            even the people who are supposed to be experts fail to install car
            seats correctly. They used the car fitting service available at
            Mamas &amp; Papas, BabiesRUs and Mothercare. Shockingly, out of the
            42 car seats fitted across these retailers, only 4 were fitted
            correctly.
          </p>
          <p>
            That’s massive! So what can you do to make sure you are using your
            car seat as intended?
          </p>
          <ol>
            <li>
              Follow the manual. As boring as it is, read the few pages which
              explain how to correctly install the seat. Some manufacturers have
              even made videos of how to install their car seats. You can
              download the manual and check whether an installation video is
              available in our Car Seat Library [LINK]. If there is, watch it at
              least three times to make sure you don’t miss a trick.
            </li>
            <li>
              Strap your child in well. Don’t let the harness slide off your
              child’s shoulders. Make it tight enough so they can’t wriggle out.
              When they scream “It’s too tight!!!” tell them you need to check
              something and wait a few seconds to see if they say it again. If
              they don’t then the harness is most likely not too tight. Ensure
              you are using the correct seat for your child’s weight and height.
              A quick online search for images of children in car seats reveals
              endless photos of incorrect usage. Here are some examples of how{' '}
              <strong>NOT</strong> to strap a child in.
            </li>
            <li>
              Check the expiration date of your car seat(s). Due to wear and
              tear of plastic and other materials, car seats lose their
              protective ability. Here are a couple of examples of expiration
              date labels on car seats:
            </li>
          </ol>
          <p>
            In summary, when using a new car seat it is incredibly important to
            know how to install and how to strap your child in well. Always
            remember to check the expiration date of a car seat as well to
            ensure that you are using a seat that is still safe.
          </p>
        </div>
      </div>
    </div>
  </main>
);

export default BlogPostAreYouUsingYourCarSeatCorrectly;
