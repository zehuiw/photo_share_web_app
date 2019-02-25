import React from 'react';
import './userList.css';
import {Link } from "react-router-dom";
import fetchModel from '../../lib/fetchModelData.js'

/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList:undefined,
    };
  }

  componentDidMount() {
    let promise = fetchModel('/user/list');
    promise.then(response => {
      this.setState({userList : JSON.parse(response)});
    });
  }


  render() {
    return (
      <div className="userlist collection col s4 z-depth-2">
        This is the user list.
        The materialize collection class should contain items with the class
        name collection-item like so    
           <ul>
           {this.state.userList && this.state.userList.map((i) => 
             <li className="collection-item" key={i._id}>
              <Link to={`/users/${i._id}`}> {i.first_name} {i.last_name}
              </Link>
             </li>)}
           </ul>
      </div>
    );
  }
}

export default UserList;
