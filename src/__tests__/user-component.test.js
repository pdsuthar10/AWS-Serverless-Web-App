import React from 'react';
import ReactDOM from 'react-dom';
import UserComponent from '../user-component'
import { mount } from 'enzyme'

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<UserComponent />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('contains user div', () => {
    const wrapper = mount(<UserComponent />)
    expect(wrapper.find('div').first().hasClass('user-div')).toEqual(true);
  })

  it('contains user table', () => {
    const wrapper = mount(<UserComponent />)
    expect(wrapper.find('table')).toHaveLength(1);
  })

  it('user table contains content class', () => {
    const wrapper = mount(<UserComponent />)
    expect(wrapper.find('table').first().hasClass('table-content')).toEqual(true);
  })

  