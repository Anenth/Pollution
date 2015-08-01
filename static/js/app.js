import M from 'material-design-lite/material';
import _ from 'underscore';
import Utils from './Utils'

import React from 'react';
import Pollutants from './Pollutants'

var app = {
  boot() {
    if (Utils.$('.js-app')) {
      this.render();
    }
  },

  render() {
    React.render(
      <Pollutants />,
      Utils.$('.js-app')
   );
  }
}

app.boot();
