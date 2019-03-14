import React from 'react';
import {Link} from 'react-router-dom';

const Blog = () => {
  const posts = [
    {
      title: 'Where do I start?',
      link: 'where-do-i-start',
      img: '',
    },
    {
      title: 'When do I need to replace my car seat?',
      link: 'when-do-i-need-to-replace-my-car-seat',
      img: '',
    },
    {
      title: "It's all about the weight and height",
      link: 'its-all-about-the-weight-and-height',
      img: '',
    },
    {
      title: 'Are you using your car seat correctly?',
      link: 'are-you-using-your-car-seat-correctly',
      img: '',
    },
    {
      title: 'After a car accident: do I need to replace my child’s car seat?',
      link: 'after-a-car-accident-do-i-need-to-replace-my-childs-car-seat',
      img: '',
    },
    {
      title: 'The Wild Wild West of Car Seat Hire',
      link: 'the-wild-wild-west-of-car-seat-hire',
      img: '',
    },
    {
      title: 'The Ultimate Guide to: extended rear-facing car seats (ERF)',
      link: 'the-ultimate-guide-to-extended-rear-facing-car-seats-ERF',
      img: '',
    },
    {
      title: 'Who recommends extended rear-facing car seats?',
      link: 'who-recommends-extended-rear-facing-car-seats',
      img: '',
    },
    {
      title: 'How are car seats tested?',
      link: 'how-are-car-seats-tested',
      img: '',
    },
  ];

  return (
    <main className="flex-shrink-0">
      <div className="container h-100">
        <Link
          to="/blog/are-you-using-your-car-seat-correctly"
          className="d-block"
          style={{
            height: '500px',
            backgroundImage: 'url(/images/blog-hero1.jpg)',
            backgroundSize: 'cover',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          <div className="row h-100">
            <div className="col-6 offset-6 h-100">
              <div className="d-table w-100 h-100">
                <div className="d-table-cell w-100 h-100 align-bottom text-white">
                  <div className="pr-5">
                    <h1 className="font-weight-bold">
                      Are you using your car seat correctly?
                    </h1>
                    <p className="py-4">
                      So you got a car seat. You are thinking: ‘Great! My
                      precious little Hugo is going to be super safe in his new
                      car seat’. Let me stop you right there. Yes, car seats are
                      great for saving lives in the event of an accident. But
                      chances are that you are installing the seat incorrectly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <div className="row my-5">
          {posts &&
            posts.map((p, i) => (
              <div className="col-4 mb-5" key={i}>
                <div className="card shadow border-0">
                  <Link
                    to={'/blog/' + p.link}
                    style={{
                      height: '200px',
                      backgroundImage: 'url(/images/blog-hero1.jpg)',
                      backgroundSize: 'cover',
                    }}
                  />
                  <div
                    className="card-body"
                    style={{minHeight: '90px', overflow: 'hidden'}}
                  >
                    <Link to={'/blog/' + p.link} className="font-weight-bold">
                      {p.title}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
};

export default Blog;
