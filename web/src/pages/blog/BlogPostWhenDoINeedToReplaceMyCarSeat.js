import React from 'react';
import BreadCrumb from '../../components/layout/BreadCrumb';

const BlogPostWhenDoINeedToReplaceMyCarSeat = () => (
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
                When the car seat has been in a crash (note that this applies to
                accidents where there was a child in the car seat as well as
                when the car seat was empty)
              </li>
              <li>When a car seat has reached its expiration date</li>
            </ol>
          </p>
          <p>
            Most blogs or experts on the topic will say something along the
            lines of “Always refer to the user manual of the car seat you have”.
            Additionally, certain bodies or institutions will provide their own
            guidelines, such as the NHS in the UK, the Which? organisation or
            the National Highway Traffic Safety Administration (NHTSA) in the
            US.
          </p>
          <p>
            It is generally accepted that user manuals take precedence over any
            other recommendations or guidelines provided by bodies or
            institutions dealing with child car safety. If you are not a fan of
            reading user manuals (we can’t blame you!) call the manufacturer and
            ask your question(s).
          </p>
        </div>
      </div>
    </div>
  </main>
);

export default BlogPostWhenDoINeedToReplaceMyCarSeat;
