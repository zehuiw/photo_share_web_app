import React from 'react';
import './TopBar.css';
import fetchModel from '../../lib/fetchModelData.js'

/**
 * Define TopBar, a React componment of CS142 project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      version:undefined,
    }
  }


  componentDidMount() {
    let promise = fetchModel('/test/info');
    promise.then(response => {
      this.setState({version : JSON.parse(response).__v});
    });  
  }


  render() {
    return (
      <nav>
        <div>
          <div className="nav-wrapper">
            <div className="brand-logo left"> 
               Zehui { this.state.version !== undefined && <span className="top-bar-version">version {this.state.version} </span>}
            </div>
            <div className="brand-logo right"> 
              {this.props.photo? "Photos of " + this.props.userName : this.props.userName} 
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default TopBar;
