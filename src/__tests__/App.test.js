import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { mount } from 'enzyme'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('contains banner', () => {
  const wrapper = mount(<App />)
  expect(wrapper.find('#banner').hasClass('banner')).toEqual(true);
})

it('contains banner logo', () => {
  const wrapper = mount(<App />)
  expect(wrapper.find('img').first().prop('src')).toEqual('/logo-white-text.png');
})

it('contains user title', () => {
  const wrapper = mount(<App />)
  expect(wrapper.find("#user-title").hasClass('title')).toEqual(true);
})