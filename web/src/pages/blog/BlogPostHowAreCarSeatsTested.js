import React from 'react';
import BreadCrumb from '../../components/layout/BreadCrumb';

const BlogPostHowAreCarSeatsTested = () => (
  <main className="flex-shrink-0">
    <BreadCrumb
      history={[{text: 'Home', link: '/'}, {text: 'Blog', link: '/blog'}]}
      text={'How are car seats tested?'}
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
                  How are car seats tested?
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
            All car seats available for sale in the UK and Europe have passed
            the legally required testing as specified in regulations ECE R44 and
            ECE R129. The results of these tests are not freely available to the
            public and so there is no way of knowing how individual car seats
            performed. And although all car seats passed the testing criteria
            and have been awarded the same certification in reality they may
            have performed very differently. This is why independent testing is
            so important.
          </p>
          <p>
            What is independent safety testing? Consumer organisations as well
            as automobile clubs across Europe conduct hundreds of tests each
            year to examine how individual car seats perform in various crash
            tests. These tests go above an beyond of what’s required by law and
            the differences can be seen in the table below.
          </p>
          <table className="blog-table">
            <thead>
              <th colSpan="1" />
              <th colSpan="2">EU REGULATIONS</th>
              <th colSpan="3">
                INDEPENDENT TESTING <br />
                (freely available data)
              </th>
              <th colSpan="2">
                INDEPENDENT TESTING <br />
                (data behind a paywall)
              </th>
            </thead>
            <tbody>
              <tr>
                <td />
                <td>ECE R44 Certification Requirements</td>
                <td>ECE R129 (i-Size) Certification Requirements</td>
                <td>ADAC</td>
                <td>TCS</td>
                <td>OAMTC</td>
                <td>Which?</td>
                <td>Stiftung Warentest</td>
              </tr>
              <tr>
                <td>Safety: front impact</td>
                <td>50kmh</td>
                <td>50kmh</td>
                <td>64kmh</td>
                <td>64kmh</td>
                <td>N/A</td>
                <td>40mph (64kmh)</td>
                <td>64kmh</td>
              </tr>
              <tr>
                <td>Safety: side impact</td>
                <td>N/A</td>
                <td>Yes</td>
                <td>50kmh</td>
                <td>50kmh</td>
                <td>N/A</td>
                <td>30mph (48kmh)</td>
                <td>25kmh</td>
              </tr>
              <tr>
                <td>Safety: rear impact</td>
                <td>30kmh</td>
                <td>30kmh</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
              </tr>
              <tr>
                <td>Ease of use</td>
                <td>No</td>
                <td>No</td>
                <td>Yes</td>
                <td>Yes</td>
                <td>Yes</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Ergonomics</td>
                <td>No</td>
                <td>No</td>
                <td>Yes</td>
                <td>Yes</td>
                <td>Yes</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Harmful materials</td>
                <td>No</td>
                <td>No</td>
                <td>Yes</td>
                <td>Yes</td>
                <td>Yes</td>
                <td>No</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Final score</td>
                <td>Pass/Fail</td>
                <td>Pass/Fail</td>
                <td>
                  Safety (50%)
                  <br />
                  Ease of Use (40%)
                  <br />
                  Ergonomics (10%)
                </td>
                <td>
                  Safety (50%)
                  <br />
                  Ease of Use/Ergonomics (50%)
                </td>
                <td>
                  Safety (50%)
                  <br />
                  Ease of Use (40%)
                  <br />
                  Ergonomics (10%)
                </td>
                <td>
                  Safety (60%)
                  <br />
                  Ease of Use (30%)
                  <br />
                  Ergonomics (10%)
                </td>
                <td>
                  Safety (50%)
                  <br />
                  Ease of Use (40%)
                  <br />
                  Ergonomics (10%)
                </td>
              </tr>
              <tr>
                <td>Test location</td>
                <td>Varies</td>
                <td>Varies</td>
                <td>Germany</td>
                <td>Switzerland</td>
                <td>Austria</td>
                <td>UK</td>
                <td>Germany</td>
              </tr>
              <tr>
                <td>Where do the seats come from?</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>Die Produkte werden anonym am Markt eingekauft.</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>
                  Die Stiftung Warentest kauft die Kinder­sitze anonym im Handel
                  ein
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
);

export default BlogPostHowAreCarSeatsTested;
