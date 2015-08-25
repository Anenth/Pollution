import React from 'react';
import ClassNames from 'classnames';
import superagent from 'superagent';

import BaseComponent from './BaseComponent';
import PollutantRow from './PollutantRow';

class Pollutants extends BaseComponent {
  constructor(props) {
    super(props);

    var dummyData = {
      _id:1,
      parameters:'PM 2.5',
      date:'25/08/2015',
      time:'2015-08-25T16:30:00.000Z',
      concentration:111,
      unit:'µg/m3',
      index:270,
      datapoint:{station:'BTM',name:['South Bengaluru','BTM'] },
    };

    var dummyDatas = [];
    dummyDatas.push(dummyData, dummyData, dummyData);

    this.state = {
        loading: true,
        data: dummyDatas,
      };

  }

  componentWillMount() {
    this.getRecentData();
  }

  getRecentData() {
    let url = '/api/recent';
    superagent.get(url)
      .end(function(err, response) {
        var data = JSON.parse(response.text);
        this.setState({
          data: data,
          loading: false,
        });
      }.bind(this));
  }

  render() {
    var wrapperClass = ClassNames({'loading-block': this.state.loading});

    var content = this.state.data.map((item, index) => {
      return <PollutantRow data={item} key={index} id={index}/>;
    });

    return (
      <div className={wrapperClass}>{content}</div>
    );

  }

}

export default Pollutants;
