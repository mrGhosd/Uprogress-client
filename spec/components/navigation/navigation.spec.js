import { Navigation } from 'components/navigation/Navigation';

import React from 'react'
import expect from 'expect';
import { shallow } from 'enzyme'

function setup() {
  const props = {
    directions: [{ id: 1, title: '1' }, { id: 2, title: '1' }, { id: 3, title: '1' }],
    dispatch: () => {}
  }

  const enzymeWrapper = shallow(<Navigation {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('Navigation component', () => {
  it('should render itself and subcomponents', () => {
    const { enzymeWrapper, props } = setup();

    expect(enzymeWrapper.find('.navigation-item').length).toEqual(props.directions.length);
  });
});
