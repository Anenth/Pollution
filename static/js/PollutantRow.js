import React from 'react';
import classNames from 'classnames';
import BaseComponent from './BaseComponent';
import _ from 'underscore';
import moment from 'moment';

const PARAMETER = {
    CO: 'Carbon Monoxide',
    PM2: 'PM 2.5',
    SO2: 'Sulfur Dioxide',
    O3: 'Ozone'
  };

var messages = {
    O3: ['Minimal Impact',
          'Unusually sensitive individuals may experience respiratory symptoms. ',
          'Increasing likelihood of respiratory symptoms and breathing discomfort in active children and adults and people with lung disease, such as asthma.',
          'Greater likelihood of respiratory symptoms and breathing difficulty in active children and adults and people with lung disease, such as asthma; possible respiratory effects in general population.',
          'Increasingly severe symptoms and impaired breathing likely in active children and adults and people with lung disease, such as asthma; increasing likelihood of respiratory effects in general population.',
          'Severe respiratory effects and impaired breathing likely in active children and adults and people with lung disease, such as asthma; increasingly severe respiratory effects likely in general population.'],
    PM2: ['Minimal Impact',
          'Respiratory symptoms possible in unusually sensitive individuals, possible aggravation of heart or lung disease in people with cardiopulmonary disease and older adults.',
          'Increasing likelihood of respiratory symptoms in sensitive individuals, aggravation of heart or lung disease and premature mortality in people with cardiopulmonary disease and older adults.',
          'Increased aggravation of heart or lung disease and premature mortality in people with cardiopulmonary disease and older adults; increased respiratory effects in general population.',
          'Significant aggravation of heart or lung disease and premature mortality in people with cardiopulmonary disease and older adults; significant increase in respiratory effects in general population.',
          'Serious aggravation of heart or lung disease and premature mortality in people with cardiopulmonary disease and older adults; serious risk of respiratory effects in general population.'],
    CO: ['Minimal Impact',
          'Minimal Impact',
          'Increasing likelihood of reduced exercise tolerance due to increased cardiovascular symptoms, such as chest pain, in people with heart disease',
          'Reduced exercise tolerance due to increased cardiovascular symptoms, such as chest pain, in people with heart disease.',
          'Significant aggravation of cardiovascular symptoms, such as chest pain, in people with heart disease.',
          'Serious aggravation of cardiovascular symptoms, such as chest pain, in people with heart disease; impairment of strenuous activities in general population.'],
    SO2: ['Minimal Impact',
          'Minimal Impact',
          'Increasing likelihood of respiratory symptoms, such as chest tightness and breathing discomfort, in people with asthma.',
          'Increased respiratory symptoms, such as chest tightness and wheezing in people with asthma; possible aggravation of heart or lung disease.',
          'Significant increase in respiratory symptoms, such as wheezing and shortness of breath, in people with asthma; aggravation of heart or lung disease.',
          'Severe respiratory symptoms, such as wheezing and shortness of breath, in people with asthma; increased aggravation of heart or lung disease; possible respiratory effects in general population.'],
    D: ['Minimal Impact',
        'Minor breathing discomfort to sensitive people',
        'Minor breathing discomfort to sensitive people',
        'Breathing discomfort to the people with asthama, lungs and heart diseases',
        'Breathing discomfort to most people on prolonged exposure',
        'Affects heatlthy people and seriously impacts those with existing diseases']

  };

class Pollutant extends BaseComponent {
  getLevel(AQI) {
    if (AQI <= 50) {
      return 1
    }else if (AQI > 51 && AQI < 100) {
      return 2
    }else if (AQI > 101 && AQI < 200) {
      return 3
    }else if (AQI > 201 && AQI < 300) {
      return 4
    }else if (AQI > 301 && AQI < 400) {
      return 5
    }else if (AQI > 401) {
      return 6
    }
  }

  getMessage(parameters, level) {
    parameters = _.invert(PARAMETER)[parameters]
    return messages[parameters][level - 1];
  }

  render() {
    let data = this.props.data;
    let date = new Date(data.time);
    date.setHours(date.getHours() + date.getTimezoneOffset() / 60);
    let dateTitle = moment(date).format('h:mm a');
    let dateAgo = moment(date).toNow();
    let level = this.getLevel(data.index);
    let summary = this.getMessage(data.parameters, level);
    let mainLevelClass = 'pollutant-location--' + level;
    let mainClass = classNames('mdl-cell mdl-cell--10-col box pollutant-location', mainLevelClass);
    return (
      <div className='mdl-grid'>
        <div className='mdl-cell mdl-cell--1-col'></div>
        <article className={mainClass}>
          <h2 className='pollutant-location__location'>
            {data.datapoint.name[0]} <small> ({data.datapoint.name[1]}) </small>
          </h2>
          <h3 className='pollutant-location__parameter'>
            {data.parameters}&nbsp;
            <span className='pollutant-location__parameter__value'>
              AQI {Math.round(data.index)}
            </span>
          </h3>
          <p className='pollutant-location__summary'>
            {summary}
          </p>
          <div className='pollutant-location__time' title={dateTitle}>
            {dateAgo}
          </div>
        </article>
      </div>

    );

  }

}

export default Pollutant;
