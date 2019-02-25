import React from 'react';
import './userDetail.css';
import {Link } from "react-router-dom";
import fetchModel from '../../lib/fetchModelData.js'

/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    console.log('UserDetail constructor ', props);
    this.state = {
      userModel: undefined,
    };
  }

  fetchInfo() {
    let uid = this.props.match.params.userId;
    console.log("mounting and fetching:", '/user/' + uid);
    let promise = fetchModel('/user/' + uid);
    promise.then(response => {
      this.setState({userModel : JSON.parse(response)});
      this.props.logoHandler(this.state.userModel.first_name + ' ' + this.state.userModel.last_name);
    });   
  }

  componentDidMount() {
    this.fetchInfo();
  }

  componentDidUpdate(prevProbs) {
    if (this.props.match.params.userId !== prevProbs.match.params.userId) {
      this.fetchInfo();
    }
  }

  render() {
    console.log('UserDetail render ', this.props);
    return (
      <div className="center-align col s7">
        <div className="left-align collection">
          <ul>
            <li className="collection-item"> ID: {this.props.match.params.userId} </li>          
            <li className="collection-item"> Name: {this.state.userModel && this.state.userModel.first_name} {this.state.userModel && this.state.userModel.last_name}</li>
            <li className="collection-item">Location: {this.state.userModel && this.state.userModel.location}</li>
            <li className="collection-item">Occupation: {this.state.userModel && this.state.userModel.occupation}</li>
            <li className="collection-item">Description: {this.state.userModel && this.state.userModel.description}</li>
          </ul>
        </div>

        <div><Link to={`/photos/${this.props.match.params.userId}`}>Click to see this user&apos;s photos</Link></div>
      </div>
    );
  }
}

export default UserDetail;
