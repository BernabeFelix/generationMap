import React from 'react';
import { shallow } from 'enzyme';
import AppWrapper from './Container';

test('store is correctly set to favorites', () => {
  const wrapper = shallow(<AppWrapper />);
  // all stores are initialized in isFavorite = false
  wrapper.instance().toggleStoreToFavorites(2);
  expect(wrapper.state('stores')[2].isFavorite).toBe(true);
});

test('store is correctly toggle to favorites', () => {
  const wrapper = shallow(<AppWrapper />);
  // all stores are initialized in isFavorite = false
  wrapper.instance().toggleStoreToFavorites(2);
  wrapper.instance().toggleStoreToFavorites(2);
  expect(wrapper.state('stores')[2].isFavorite).toBe(false);
});
