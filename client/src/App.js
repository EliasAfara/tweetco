import React, { Fragment, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

//Redux
import { Provider } from 'react-redux';
import store from './store';

//Components Imports
import Header from './components/layout/Header';
import Timeline from './components/post/Timeline';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/profile/Profile';
import UserSearchList from './components/users/UserSearchList';
import UserProfile from './components/users/UserProfile';
import Followers from './components/profile/Followers';
import Following from './components/profile/Following';
import Comments from './components/post/comments/Comments';

import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Header />
          <div className=' max-w-screen-md container overflow-hidden shadow-lg mx-auto'>
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => <Redirect to='/login' />}
              />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/home' component={Timeline} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/search' component={UserSearchList} />
              <Route exact path='/user' component={UserProfile} />
              <Route exact path='/followers' component={Followers} />
              <Route exact path='/following' component={Following} />
              <Route exact path='/comments' component={Comments} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
