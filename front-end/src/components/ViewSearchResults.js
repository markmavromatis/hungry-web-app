import React, {Component} from 'react';
import '../css/App.css';

class ViewSearchResults extends Component {

    render() {
        return (
    <div className={this.props.formDisplay ? '' : 'hide-component'}>
        <p>Search Results</p>
    </div>
  );
}
}

export default ViewSearchResults;
