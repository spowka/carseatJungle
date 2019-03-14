import React from 'react';

class FAQ extends React.Component {
  render() {
    return (
      <main className="flex-shrink-0">
        <div className="container py-5">
          <h1 className="page-title mb-4">FAQ</h1>

          <h3 className="section-title mb-3">General car seat questions</h3>
          <div className="accordion" id="accordionGeneralCardSeatQuestions">
            <div className="card">
              <div className="card-header">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#c1"
                  >
                    There are so many car seats to choose from and an endless
                    list of features. Where do I even start?
                  </button>
                </h2>
              </div>
              <div
                id="c1"
                className="collapse"
                data-parent="#accordionGeneralCardSeatQuestions"
              >
                <div className="card-body">
                  <p className="p-3 m-0">
                    If it feels like you need a degree in car seats to know your
                    way around, you are not alone! Car seats are extremely
                    complicated and it takes a lot of research to find the one
                    that meets your needs. Read our 5-step guide to know how to
                    get started.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#c2"
                  >
                    What car seats does Car Seat Jungle recommend?
                  </button>
                </h2>
              </div>
              <div
                id="c2"
                className="collapse"
                data-parent="#accordionGeneralCardSeatQuestions"
              >
                <div className="card-body">
                  <p className="p-3 m-0">
                    At the moment we don’t provide recommendations. However, we
                    believe that when you are considering your options, you
                    should always look at car seat safety as the highest
                    priority. The whole point of buying a car seat is to keep
                    your child safe in the event of a car accident and you
                    should want to know how a car seat performs in a front, rear
                    and side impact crash. Car Seat Jungle focuses on analysing
                    freely available data from independent car crash testing
                    organisations such as the ADAC in Germany, TCS in
                    Switzerland, OAMTC in Austria and Which? in the UK*. These
                    independent testing houses publish their crash testing
                    results giving us a glimpse at the differences between
                    seemingly similar car seats.
                  </p>
                  <p className="p-3 m-0">
                    These testing organisations are extremely important because
                    right now, there is very little transparency with regards to
                    car seat approval. We know how they are tested from a
                    regulatory perspective but we know very little who awards
                    the safety certificates and how each car seat performed in
                    these tests. This should be considered questionable given
                    the fact that car seats are required by law, yet basic
                    information is hard to find for the average consumer.
                  </p>
                  <p className="p-3 m-0">
                    With the above in mind, the only suggestion we make is to
                    rear-face your child for as long as possible. This is the
                    safest way to travel for children. If you are concerned that
                    older children are uncomfortable or are not able to look out
                    the window, be assured that this has been proven incorrect
                    by thousands of parents who rear-face their children up
                    until they are 25kgs.
                  </p>
                  <p className="p-3 mb-0">
                    <i>
                      * Which? is a subscription service and therefore we can’t
                      share their data results. Instead we use resources that
                      are available for free on the Which? website, such as
                      their ‘Don’t Buy’ lists and safety warnings.
                    </i>
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#c3"
                  >
                    What is i-size?
                  </button>
                </h2>
              </div>
              <div
                id="c3"
                className="collapse"
                data-parent="#accordionGeneralCardSeatQuestions"
              >
                <div className="card-body">
                  <p className="p-3 m-0">
                    I-size is the name of the newest EU regulation which aims to
                    increase child safety in cars. Car seats which conform to
                    the new i-size regulation are:
                    <ol type="a" className="d-block pt-2 pb-0 m-0">
                      <li>
                        safer in a side impact collision than the older seats
                        due to additional side impact crash testing during
                        certification procedures
                      </li>
                      <li>rearward-facing until 15 months is mandatory</li>
                      <li>
                        height based, not weight as was the case in previous
                        years
                      </li>
                      <li>
                        isofix only which substantially decreases the risk of
                        the seat being improperly installed
                      </li>
                    </ol>
                  </p>
                  <p className="p-3 m-0">
                    The i-size law is the first of three phases and
                    manufacturers are mostly making i-size seats in groups 0+
                    and 1 at the moment.
                  </p>
                  <p className="p-3 m-0">
                    The i-size regulation number is ECE R129 and it did not
                    overturn the previous R44 regulation. This means that you
                    are free to choose whether to use an i-size seat or not. The
                    main thing to remember is that i-size is designed to be
                    safer.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#c4"
                  >
                    What happens to car seat regulations after Brexit?
                  </button>
                </h2>
              </div>
              <div
                id="c4"
                className="collapse"
                data-parent="#accordionGeneralCardSeatQuestions"
              >
                <div className="card-body">
                  <p className="p-3 m-0">
                    Nobody knows at this point in time. Car Seat Jungle will be
                    closely following any proposed changes and updates to the
                    current UK car seat laws. For now, we will assume current
                    rules to still apply.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#c5"
                  >
                    What is ISOFIX?
                  </button>
                </h2>
              </div>
              <div
                id="c5"
                className="collapse"
                data-parent="#accordionGeneralCardSeatQuestions"
              >
                <div className="card-body">
                  <p className="p-3 m-0">
                    ISOFIX is a system of securing a car seat in the car. It is
                    comprised of two anchors built into the car seat or into a
                    car seat ISOFIX base and two metal hooks which are part of
                    the car’s structure. An ISOFIX car seat simply clicks into
                    place.
                  </p>
                  <p className="p-3 m-0">
                    If you’ve read about ISOFIX being as safe as belted
                    installations and are wondering if this is true, then please
                    read on. Technically speaking ISOFIX provides the same
                    safety as belted installations but this assumed that the
                    belted installation has been done correctly. This is a
                    problem because around 70% of car seats in Europe are used
                    incorrectly and belted installations are a significant part
                    of this problem. By using an ISOFIX base for infant seats or
                    ISOFIX attachment points in car seats for older children,
                    you are reducing the risk of installing the seat
                    incorrectly. Once ISOFIX attachment points have been pushed
                    into place and the supporting tether or foot leg have been
                    installed (if applicable), the car seat is well secured. In
                    other words, ISOFIX is safer in practical terms.
                  </p>
                  <p className="p-3 m-0">
                    ISOFIX is a European standard. A similar system called LATCH
                    is used in America.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#c6"
                  >
                    What car seats will fit my car?
                  </button>
                </h2>
              </div>
              <div
                id="c6"
                className="collapse"
                data-parent="#accordionGeneralCardSeatQuestions"
              >
                <div className="card-body">
                  <p className="p-3 m-0">
                    When choosing a car seat you not only have to consider the
                    seat itself (its safety, type, ISOFIX connection, swivel
                    etc.) but also the car model(s) it will be fitted into.
                    There are certain cars which will not fit certain car seat
                    models very well. This is often due to the available space
                    in the car, the angle of ISOFIX fitting points, underfloor
                    storage in the car or other.
                  </p>
                  <p className="p-3 m-0">
                    The best way of knowing whether your chosen seat is right
                    for your car is to have it fitted by a specialist. We
                    recommend{' '}
                    <a
                      href="https://incarsafetycentre.co.uk/services/car-seat-fitting/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      In Car Safety Centre
                    </a>
                    or{' '}
                    <a href="https://www.goodeggcarsafety.com/fitting-a-car-seat.html">
                      Good Egg Car Safety
                    </a>
                    as well as independent specialists. Leading retailers are
                    not recommended because the independent{' '}
                    <a href="https://www.which.co.uk/reviews/child-car-seats/article/fitting-a-baby-or-child-car-seat/car-seat-fitting-which-retailer-is-best">
                      Which? review
                    </a>
                    showed that car seat fitting services are poor and 9 out of
                    10 times incorrect advice is given. This is consistent with
                    our own experiences.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#c7"
                  >
                    Are all car seats installed in the same way?
                  </button>
                </h2>
              </div>
              <div
                id="c7"
                className="collapse"
                data-parent="#accordionGeneralCardSeatQuestions"
              >
                <div className="card-body">
                  <p className="p-3 m-0">
                    No. In fact, based on the data we hold, we’ve found that
                    there are 16 ways of installing a car seat combined with how
                    the child is secured. This is dependent on the direction of
                    travel, tether/ISOFIX/support leg combinations of installing
                    a seat, harness type of the car seat and more. Always make
                    sure to read your car seat manual to know the correct
                    installation for your car seat.
                  </p>
                  <p className="p-3 m-0">
                    Please also note that for certain car seats, multiple
                    installation procedures will be in place. For example, the
                    Britax-Römer Advansafix IV R is a group 1/2/3 car seat and
                    is installed in three different ways depending on the weight
                    of the child and the presence of ISOFIX in the car:
                  </p>
                  <p className="p-3 m-0">
                    The ADVANSAFIX IV R is approved for three different
                    intsllation methods:
                    <table className="table mt-2">
                      <thead>
                        <tr>
                          <th>Group</th>
                          <th>Installation method</th>
                          <th>Approval type</th>
                          <th>Section of user instructions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1 (9&minus;18 kg)</td>
                          <td>ISOFIX + Top tether</td>
                          <td>universal</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>2/3 (15&minus;36 kg)</td>
                          <td>ISOFIT + car seat belt</td>
                          <td>semi&minus;universal</td>
                          <td>B1</td>
                        </tr>
                        <tr>
                          <td>2/3 (15&minus;36 kg)</td>
                          <td>Car seat belt</td>
                          <td>universal</td>
                          <td>B2</td>
                        </tr>
                      </tbody>
                    </table>
                    <small>
                      Source:{' '}
                      <a href="https://www.britax-roemer.co.uk/on/demandware.static/-/Library-Sites-BritaxSharedLibrary/default/dw27c5205b/userinstructions/9006/ADVANSAFIXIVR_EN.pdf">
                        Britax-Römer
                      </a>
                    </small>
                  </p>
                  <p className="p-3 m-0">
                    So please remember:{' '}
                    <strong>always check your car seat manual!</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h3 className="section-title mt-5 mb-3">Car seat data</h3>
          <div className="accordion" id="accordionCarSeatData">
            <div className="card">
              <div className="card-header">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#c8"
                  >
                    How many car seats are there in the Car Seat Jungle
                    database?
                  </button>
                </h2>
              </div>
              <div
                id="c8"
                className="collapse"
                data-parent="#accordionCarSeatData"
              >
                <div className="card-body">
                  <p className="p-3 m-0">
                    We have over 400 car seats in our database but not all will
                    be displayed due to availability on the UK market. Worth
                    noting is that we display only single car seats. This means
                    that at the moment we don’t cover the Multimac range.
                    Multimac is a great solution for families with 3 or 4
                    children.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#c9"
                  >
                    What are the data sources for your infographics and blog
                    posts?
                  </button>
                </h2>
              </div>
              <div
                id="c9"
                className="collapse"
                data-parent="#accordionCarSeatData"
              >
                <div className="card-body">
                  <p className="p-3 m-0">
                    All of our written material is based on the databases that
                    we hold, unless explicitly stated otherwise. If we draw on
                    other sources we always make a clear reference to where the
                    information stems from. We use respected and reliable
                    sources and conduct our own research. This includes freely
                    available information from car seat manufacturers, EU
                    legislation (Regulations 14, 16, 44 and 129 in particular),
                    research houses as well as academic papers accessed via
                    university libraries. When you see analysis of car seats on
                    our site please note that totals usually exclude data from
                    Multimac car seats.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#c10"
                  >
                    How up to date is the information on Car Seat Jungle?
                  </button>
                </h2>
              </div>
              <div
                id="c10"
                className="collapse"
                data-parent="#accordionCarSeatData"
              >
                <div className="card-body">
                  <p className="p-3 m-0">
                    Car seat availability and models change and we strive to
                    update our databases at least once a month.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#c11"
                  >
                    Can I export my final car seat search list?
                  </button>
                </h2>
              </div>
              <div
                id="c11"
                className="collapse"
                data-parent="#accordionCarSeatData"
              >
                <div className="card-body">
                  <p className="p-3 m-0">Yes, just click the export button.</p>
                </div>
              </div>
            </div>
          </div>

          <h3 className="section-title mt-5 mb-3">About Car Seat Jungle</h3>
          <div className="accordion" id="accordionAboutCarSeatJungle">
            <div className="card">
              <div className="card-header">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#c12"
                  >
                    How does Car Seat Jungle work?
                  </button>
                </h2>
              </div>
              <div
                id="c12"
                className="collapse"
                data-parent="#accordionCarSeatJungle"
              >
                <div className="card-body">
                  <p className="p-3 m-0">
                    In the background we’ve created a huge database of all
                    available car seat data we could find. This database is
                    continually updated to reflect the most up to date features
                    and availability, however as of now we are unable to show
                    real-time data.
                  </p>
                  <p className="p-3 m-0">
                    While every effort is made to keep the information up to
                    date, changes may occur which are not immediately reflected
                    on Car Seat Jungle.
                  </p>
                  <p className="p-3 m-0">
                    We are working on adding further data points for an even
                    easier car seat search of the future. Stay tuned.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#c13"
                  >
                    How is Car Seat Jungle funded?
                  </button>
                </h2>
              </div>
              <div
                id="c13"
                className="collapse"
                data-parent="#accordionCarSeatJungle"
              >
                <div className="card-body">
                  <p className="p-3 m-0">
                    Car Seat Jungle is an independent company registered in
                    Scotland and is funded entirely through affiliate marketing
                    and advertising on the website. Because we are not
                    financially tied to anyone, we don’t have to meet growth or
                    revenue targets, meaning that we can concentrate on
                    providing truthful and fact-checked information. You won’t
                    find clickbait or sensational headings aimed at generating
                    traffic at the cost of inaccurate information.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#c14"
                  >
                    Do you provide a car seat fitting service?
                  </button>
                </h2>
              </div>
              <div
                id="c14"
                className="collapse"
                data-parent="#accordionCarSeatJungle"
              >
                <div className="card-body">
                  <p className="p-3 m-0">
                    No. Our mission is to use available car seat data and
                    organise it in a user friendly way. There are specialists in
                    the UK with decades of experience in fitting car seats and
                    we recommend using specialists such as the
                    InCarSafetyCentre.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#c15"
                  >
                    When will Car Seat Jungle be available in other countries?
                  </button>
                </h2>
              </div>
              <div
                id="c15"
                className="collapse"
                data-parent="#accordionCarSeatJungle"
              >
                <div className="card-body">
                  <p className="p-3 m-0">
                    Car seat availability and models can differ from country to
                    country. The current version of Car Seat Jungle is tailored
                    to the UK market, however, we will be introducing the same
                    functionalities to other markets. We’re currently
                    registering interest for other countries so please let us
                    know through the <a href="/contact">Contact form</a> where
                    you would like to see Car Seat Jungle next.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <strong className="d-block mt-5">
            Question not listed? <a href="/contact">Contact us here</a>.
          </strong>
        </div>
      </main>
    );
  }
}

export default FAQ;
