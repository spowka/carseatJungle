import React from 'react';
import BreadCrumb from '../../components/layout/BreadCrumb';

const BlogPostItsAllAboutTheWeightAndHeight = () => (
  <main className="flex-shrink-0">
    <BreadCrumb
      history={[{text: 'Home', link: '/'}, {text: 'Blog', link: '/blog'}]}
      text={"It's all about the weight and height"}
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
                  It&#39;s all about the weight and height
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
            Car seats are commonly categorised by manufacturers by one or more
            of the following criteria: weight, height and/or age of the child
            and assigned to the corresponding car seat group, like this:
          </p>
          <p>
            So, what you really need to remember from this article is that you
            must know the height and weight of your child when buying a car
            seat.
          </p>
          <p>
            Why is weight and height so important? Strict weight and/or height
            measurements are used to determine whether car seats are safe or
            not. So please be a good parent/grandparent/carer and weigh and
            measure your child.
          </p>
          <p>
            Let’s take a look at a few examples which will help explain why this
            is so important:
          </p>

          <table className="blog-table">
            <thead>
              <th style={{width: '20%'}}>Manufacturer</th>
              <th style={{width: '20%'}}>Car seat model</th>
              <th style={{width: '20%'}}>Manufacturer recommended age</th>
              <th style={{width: '20%'}}>Child weight</th>
              <th style={{width: '20%'}}>Child height</th>
            </thead>
            <tbody>
              <tr>
                <td>Maxi Cosi</td>
                <td>AxissFix Air</td>
                <td>From approx. 4 months up to 4 years</td>
                <td>Up to 19kg</td>
                <td>From 61 to 105 cm</td>
              </tr>
              <tr>
                <td>Cybex</td>
                <td>Sirona Q i-Size</td>
                <td>Up to approx. 4 years </td>
                <td>Up to 18 kg</td>
                <td>From 45 to 105 cm</td>
              </tr>
              <tr>
                <td>Britax Römer</td>
                <td>Dualfix M i-Size</td>
                <td>From 3 months - 4 years</td>
                <td>Up to 18 kg</td>
                <td>From 61 to 105 </td>
              </tr>
            </tbody>
          </table>
          <br />

          <p>
            As you can see, there is some age variation between manufacturers.
            In the i-Size seat examples above (if you don’t know what i-Size is,
            please check out this post) Maxi-Cosi recommend their car seat to be
            used from approximately 4 months, while Britax Römer say 3 months.
            Also, note that age is more often than not given as an approximation
            (more on this below).
          </p>
          <p>
            That’s why you should pay less attention to the age recommendation
            for car seats and focus on your child’s height or weight instead.
            Age should really be ever only used as a guideline. It was adopted
            as an easy reference as you always know what exact age your child is
            and you may not know their exact height or weight. But if you want
            to use car seats correctly, which really just means that you want to
            make sure your child is safe, you need to go by their weight (for
            non i-Size compliant seats) or their height (for i-Size seats) of
            the child. Why? Because car seats are manufactured and tested
            against weight or height and not age. Two children at the same age
            can have very different weights or heights. The below growth charts
            are used by healthcare professionals to monitor boys’ and girls’
            weight gain. If we look at 4 years old boys’ range it sits between
            12 and 23 kg with a median of over 16kg. For girls, the range is
            between 11 and 24 kg with a median of 16kg.
          </p>
          <p>
            These are pretty big ranges! Combine this with the fact that car
            seats are tested for weight or height, using age as an indicator not
            only doesn’t make sense but can be dangerous. That’s why you should
            simply weigh and/or measure your child to ensure you have the
            correct car seat.
            <br />
            <br />
            <a
              href="https://www.rcpch.ac.uk/sites/default/files/Boys_0-4_years_growth_chart.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.rcpch.ac.uk/sites/default/files/Boys_0-4_years_growth_chart.pdf
            </a>
            <br />
            <a
              href="https://www.rcpch.ac.uk/sites/default/files/Girls_0-4_years_growth_chart.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.rcpch.ac.uk/sites/default/files/Girls_0-4_years_growth_chart.pdf
            </a>
            <br />
            <br />
            Check out this article for an explanation of the i-Size standard and
            why height is a better indicator than weight.
          </p>
        </div>
      </div>
    </div>
  </main>
);

export default BlogPostItsAllAboutTheWeightAndHeight;
