import React from 'react';

// import globals from '../../globals';
import BaseComponent from './BaseComponent';
import PollutantRow from './PollutantRow';
import superagent from 'superagent';

class Pollutants extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
        data: []
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
        this.setState({ data: data });
      }.bind(this))
  }

  render() {
    if (!this.state.data.length) return null;

    var content = this.state.data.map((item, index) => {
      return <PollutantRow data={item} key={index}/>
    });

    return (
      <div>{content}</div>
    );

  }

}

export default Pollutants;
