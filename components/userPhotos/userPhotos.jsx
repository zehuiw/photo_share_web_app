import React from 'react';
import './userPhotos.css';
import {Link } from "react-router-dom";
import fetchModel from '../../lib/fetchModelData.js'

/**
 * Define UserPhotos, a React componment of CS142 project #5
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoModel:undefined,
    }
  }

  fetchInfo() {
    let uid = this.props.match.params.userId;
    let promisePhoto = fetchModel('/photosOfUser/' + uid);
    promisePhoto.then(response => {
      this.setState({photoModel : JSON.parse(response)});
      this.props.logoHandler(this.state.userModel.first_name + ' ' + this.state.userModel.last_name);
    });
    let promiseName = fetchModel('/user/' + uid);
    promiseName.then(response =>{
      let userModel = JSON.parse(response);
      this.props.logoHandler(userModel.first_name + ' ' + userModel.last_name);
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
    return (
      <div className="col s7">
        <div className="left-align collection">
          <ul>
            {this.state.photoModel && this.state.photoModel.map((i) =>
                <li className="collection-item" key={i._id}> 
                  <ul>
                    <li className="collection-item">
                      <div><img src={"images/" + i.file_name} alt=""/></div>
                      <div className="right-align"> {i.date_time} </div>
                    </li>
                    <li className="collection-item">
                      <ul>
                        {i.comments && i.comments.map((c) =>
                          <li className="collection-item" key={c._id}>
                            <div className="user-photos-user">
                              <Link to={`/users/${c.user._id}`}> {c.user.first_name} {c.user.last_name}</Link> commented at {c.date_time}</div>
                            <div className="user-photos-comment">{c.comment}</div>
                          </li>
                          )}
                      </ul>
                    </li>
                  </ul>
                </li>
                )
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default UserPhotos;
