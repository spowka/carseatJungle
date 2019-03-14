import {combineReducers} from 'redux';
import app from '../data/app/AppReducer.js';
import user from '../data/user/UserReducer.js';
import carseat from '../data/carseat/CarseatReducer.js';
import carseatGroup from '../data/carseatGroup/CarseatGroupReducer.js';
import shop from '../data/shop/ShopReducer.js';
import carseatType from '../data/carseatType/CarseatTypeReducer';
import origin from '../data/origin/OriginReducer.js';
import brand from '../data/brand/BrandReducer.js';
import childHeightGroup from '../data/childHeightGroup/ChildHeightGroupReducer.js';
import childWeightGroup from '../data/childWeightGroup/ChildWeightGroupReducer.js';
import rankingProvider from '../data/rankingProvider/RankingProviderReducer.js';
import rankingValue from '../data/rankingValue/RankingValueReducer.js';

export default combineReducers({
  app,
  user,
  carseat,
  carseatGroup,
  shop,
  carseatType,
  origin,
  brand,
  childHeightGroup,
  childWeightGroup,
  rankingProvider,
  rankingValue,
});
