import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter, Route, Switch
} from 'react-router-dom';

// import necessary components
import TopBar from './components/topBar/TopBar';
import UserDetail from './components/userDetail/UserDetail';
import UserList from './components/userList/UserList';
import UserPhotos from './components/userPhotos/UserPhotos';

import './node_modules/materialize-css/dist/css/materialize.css';
import './styles/main.css';

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName:undefined,
      displayPhoto:false,
    }
    this.userDetailHandler = this.userDetailHandler.bind(this);
    this.userPhotoHandler = this.userPhotoHandler.bind(this);
  }

  userDetailHandler(name){
    this.setState({
      userName:name,
      displayPhoto:false,
    });
  }

  userPhotoHandler(name) {
    this.setState({
      userName:name,
      displayPhoto:true,
    });
  }

  render() {
    return (
      <HashRouter>
      <div>
        <TopBar userName = {this.state.userName} photo = {this.state.displayPhoto}/>
        <div className="row">
          <UserList />
          <div className="center-align">
            <Switch>
              <Route path="/users/:userId"
                render={ props => <UserDetail {...props} logoHandler={this.userDetailHandler}/> }
               />
              <Route path="/photos/:userId"
                render ={ props => <UserPhotos {...props} logoHandler={this.userPhotoHandler} /> }
              />
              <Route path="/users" component={UserList}  />
            </Switch>
          </div>
        </div>
      </div>
    </HashRouter>
    );
  }
}


ReactDOM.render(
  <PhotoShare />,
  document.getElementById('photoshareapp'),
);
