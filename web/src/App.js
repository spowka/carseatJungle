import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from './components/layout/Header.js';
import Footer from './components/layout/Footer.js';
import Home from './pages/home/Home.js';
import CarseatList from './pages/carseat/CarseatList.js';
import CarseatDetails from './pages/carseat/CarseatDetails';
import Filter1 from './pages/filter/Filter1.js';
import Filter2 from './pages/filter/Filter2.js';
import Filter3 from './pages/filter/Filter3.js';
import Filter4 from './pages/filter/Filter4.js';
import Filter5 from './pages/filter/Filter5.js';
import Login from './pages/user/Login.js';
import CarseatGroupList from './pages/admin/CarseatGroupList.js';
import ShopList from './pages/admin/ShopList.js';
import CarseatTypeList from './pages/admin/CarseatTypeList';
import OriginList from './pages/admin/OriginList.js';
import ChildHeightGroupList from './pages/admin/ChildHeightGroupList.js';
import ChildWeightGroupList from './pages/admin/ChildWeightGroupList.js';
import Blog from './pages/blog/Blog.js';
import BlogPostWhereDoIStart from './pages/blog/BlogPostWhereDoIStart.js';
import BlogPostWhenDoINeedToReplaceMyCarSeat from './pages/blog/BlogPostWhenDoINeedToReplaceMyCarSeat.js';
import BlogPostAreYouUsingYourCarSeatCorrectly from './pages/blog/BlogPostAreYouUsingYourCarSeatCorrectly.js';
import BlogPostItsAllAboutTheWeightAndHeight from './pages/blog/BlogPostItsAllAboutTheWeightAndHeight.js';
import BlogPostTheWildWildWestOfCarSeatHire from './pages/blog/BlogPostTheWildWildWestOfCarSeatHire.js';
import BlogPostAfterACarAccidentDoINeedToReplaceMyChildsCarSeat from './pages/blog/BlogPostAfterACarAccidentDoINeedToReplaceMyChildsCarSeat.js';
import BlogPostTheUltimateGuideToExtendedRearFacingCarSeats from './pages/blog/BlogPostTheUltimateGuideToExtendedRearFacingCarSeats.js';
import BlogPostWhoRecommendsExtendedRearFacingCarSeats from './pages/blog/BlogPostWhoRecommendsExtendedRearFacingCarSeats.js';
import BlogPostHowAreCarSeatsTested from './pages/blog/BlogPostHowAreCarSeatsTested.js';
import BrandList from './pages/admin/BrandList.js';
import RankingProviderList from './pages/admin/RankingProviderList.js';
import RankingValueList from './pages/admin/RankingValueList.js';
import AdminCarseatList from './pages/admin/CarseatList.js';
import About from './pages/about/About.js';
import FAQ from './pages/faq/FAQ.js';
import PrivacyPolicy from './pages/privacy/PrivacyPolicy.js';
import Contact from './pages/contact/Contact.js';
import TermsAndConditions from './pages/terms/TermsAndConditions.js';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/admin/carseats" component={AdminCarseatList} />
        <Route path="/admin/carseat-groups" component={CarseatGroupList} />
        <Route path="/admin/shops" component={ShopList} />
        <Route path="/admin/carseat-types" component={CarseatTypeList} />
        <Route path="/admin/origins" component={OriginList} />
        <Route path="/admin/brands" component={BrandList} />
        <Route
          path="/admin/child-height-groups"
          component={ChildHeightGroupList}
        />
        <Route
          path="/admin/child-weight-groups"
          component={ChildWeightGroupList}
        />
        <Route
          path="/admin/ranking-providers"
          component={RankingProviderList}
        />
        <Route path="/admin/ranking-values" component={RankingValueList} />
        <Route exact path="/admin" component={AdminCarseatList} />
        <React.Fragment>
          <Header />
          <Switch>
            <Route path="/carseat/:id" component={CarseatDetails} />
            <Route path="/filter" component={Filter1} />
            <Route path="/filter2" component={Filter2} />
            <Route path="/filter3" component={Filter3} />
            <Route path="/filter4" component={Filter4} />
            <Route path="/filter5" component={Filter5} />
            <Route
              path="/blog/where-do-i-start"
              component={BlogPostWhereDoIStart}
            />
            <Route
              path="/blog/when-do-i-need-to-replace-my-car-seat"
              component={BlogPostWhenDoINeedToReplaceMyCarSeat}
            />
            <Route
              path="/blog/are-you-using-your-car-seat-correctly"
              component={BlogPostAreYouUsingYourCarSeatCorrectly}
            />
            <Route
              path="/blog/where-do-i-start"
              component={BlogPostWhereDoIStart}
            />
            <Route
              path="/blog/its-all-about-the-weight-and-height"
              component={BlogPostItsAllAboutTheWeightAndHeight}
            />
            <Route
              path="/blog/after-a-car-accident-do-i-need-to-replace-my-childs-car-seat"
              component={
                BlogPostAfterACarAccidentDoINeedToReplaceMyChildsCarSeat
              }
            />
            <Route
              path="/blog/the-wild-wild-west-of-car-seat-hire"
              component={BlogPostTheWildWildWestOfCarSeatHire}
            />
            <Route
              path="/blog/the-ultimate-guide-to-extended-rear-facing-car-seats-ERF"
              component={BlogPostTheUltimateGuideToExtendedRearFacingCarSeats}
            />
            <Route
              path="/blog/who-recommends-extended-rear-facing-car-seats"
              component={BlogPostWhoRecommendsExtendedRearFacingCarSeats}
            />
            <Route
              path="/blog/how-are-car-seats-tested"
              component={BlogPostHowAreCarSeatsTested}
            />
            <Route path="/blog" component={Blog} />
            <Route path="/library" component={CarseatList} />
            <Route path="/about" component={About} />
            <Route path="/faq" component={FAQ} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/terms" component={TermsAndConditions} />
            <Route path="/contact" component={Contact} />
            <Route path="/" component={Home} />
          </Switch>
          <Footer />
        </React.Fragment>
      </Switch>
    );
  }
}
