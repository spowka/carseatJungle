import React from 'react';
import BreadCrumb from '../../components/layout/BreadCrumb';

const BlogPostAfterACarAccidentDoINeedToReplaceMyChildsCarSeat = () => (
  <main className="flex-shrink-0">
    <BreadCrumb
      history={[{text: 'Home', link: '/'}, {text: 'Blog', link: '/blog'}]}
      text={'After a car accident: do I need to replace my child’s car seat?'}
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
                  After a car accident: do I need to replace my child’s car
                  seat?
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
            There is widespread agreement that car seats work by protecting
            children in car crashes and that children are infinitely safer
            riding in a dedicated child car seat. In the event of an accident
            and assuming the seat is installed correctly, the child is well
            strapped in in a seat that fits them and their head is protected
            with a headrest. Some child car seats now come with advanced side
            impact protection (short SIP) meaning that the child is also well
            protected when there is a side crash, i.e. another vehicle drives
            into the car’s doors where your child happens to be sitting. You can
            use our Car Seat Search to filter for car seats which offer advanced
            SIP.
          </p>
          <p>
            However, surprisingly there is some debate on the Internet whether
            car seats which have been in a minor crash can still be used. For
            example, in the UK the Royal Society for the Prevention of Accidents
            states that “A child car seat that was in a car when it was involved
            in a collision should be replaced, even if there is no visible
            damage.” However, in the same article it states that car seats may
            not have to be replaced if
            (http://www.childcarseats.org.uk/choosing-using/replacing-a-child-seat-after-an-accident/):
            <br />
            <ol>
              <li>It was a very low speed impact</li>
              <li>There was no, or very little, external damage to the car</li>
              <li>
                There was no child in the child seat when the impact occurred.
              </li>
            </ol>
          </p>
          <p>
            Unfortunately this does not help much. ‘Low speed’ can be relative.
            Also, the fact that no child was present in the car seat at the time
            of the accident has little influence on the fact that the car seat
            absorbed some of the crash impact thereby weakening the materials it
            is made of.
          </p>
          <p>
            The National Highway Traffic Safety Administration (NHTSA) in the US
            provides a somewhat clearer definition of the type of crashes that
            are minor enough to keep the car seat. The NHTSA states that car
            seats which were present in cars involved in a minor accident don’t
            need to be replaced if all of the following are ticked
            (https://www.nhtsa.gov/car-seats-and-booster-seats/car-seat-use-after-crash):
            <br />
            <ol>
              <li>
                The vehicle was able to be driven away from the crash site.
              </li>
              <li>The vehicle door nearest the car seat was not damaged.</li>
              <li>
                None of the passengers in the vehicle sustained any injuries in
                the crash.
              </li>
              <li>
                If the vehicle has air bags, the air bags did not deploy during
                the crash; and
              </li>
              <li>There is no visible damage to the car seat.</li>
            </ol>
          </p>

          <p>
            It needs to be said however, that{' '}
            <strong>
              if you can afford a new car seat to replace one which has been in
              a minor crash (no matter if the child was seated in it or not),
              you probably should
            </strong>{' '}
            as there is no way of telling whether a car seat has been
            compromised or not. If your budget doesn’t allow for a new car seat
            then follow the guidelines above to reduce the risk of your child
            riding in an unsafe seat. Remember that in the event of another
            crash an expired or previously damaged seat may not perform as well.
          </p>
        </div>
      </div>
    </div>
  </main>
);

export default BlogPostAfterACarAccidentDoINeedToReplaceMyChildsCarSeat;
