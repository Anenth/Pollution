import React from 'react';
import classNames from 'classnames';
import BaseComponent from './BaseComponent';

class Pollutant extends BaseComponent {
  render() {
    let data = this.props.data;
    return (
      <div className='mdl-grid'>
        <div className='mdl-cell mdl-cell--2-col'></div>
        <div className='mdl-cell mdl-cell--8-col box pollutant-location'>
          <div className='pollutant-location__location'>
            {data.datapoint.name} ({data.datapoint.station}) is
          </div>
          <div className='pollutant-location__parameter'>
            {data.parameters}
            <div className='pollutant-location__parameter__value'>
              AIQ {data.index}
            </div>
          </div>
          <p className='pollutant-location__summary'>
            {data.summary}
          </p>
          <div className='pollutant-location__time'>
            Data captured at:
            {data.time}
          </div>
        </div>
      </div>

    );

  }

}

export default Pollutant;
