import React from 'react';
import '../styles/login.css'
import Login from '../components/Login';
import Home from '../components/Home';
import Signup from '../components/Signup';
import Menu from '../components/Menu';
import Tracker from "../components/Tracker"
import AddItem from "../components/AddItem";
import { getLoginStatus } from '../actions/getLoginStatus';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

class App extends React.Component {

  componentDidMount() {
    getLoginStatus()
  };

  render() {
    const user = this.props.user;
    const items = this.props.items;
    return (
      <div className='homewrap'>
        <Router>
          <Switch>
            <Route exact path="/"               render={ props => (<Home     {...props} loggedInStatus={this.props.isLoggedIn}/> )} />
            <Route exact path="/login"          render={ props => (<Login    {...props} loginUser={this.props.loginUser} loggedInStatus={this.props.isLoggedIn} /> )} />
            <Route exact path="/signup"         render={ props => (<Signup   {...props} loginUser={this.props.loginUser} loggedInStatus={this.props.isLoggedIn}/> )} />
            <Route exact path="/menu"           render={ props => (<Menu     {...props} user={this.props.user} loggedInStatus={this.props.isLoggedIn} logoutUser={this.props.logoutUser}  /> )} />
            <Route exact path="/tracker"        render={ props => (<Tracker  {...props} addItems={this.props.addItems} logoutUser={this.props.logoutUser} /> )} />
            <Route exact path="/add_item"       render={ props => (<AddItem  {...props} user={user} /> )} />
          </Switch>
        </Router>
      </div>
    )
  };


};

const mapStateToProps = state => ({isLoggedIn: state.isLoggedIn, user: state.user, items: state.items})

const mapDispatchToProps = dispatch => ({
  loginUser: (isLoggedIn, user) => dispatch({type: "LOG_IN", isLoggedIn: isLoggedIn, user:user }),
  logoutUser: (isLoggedIn, user) => dispatch({type: "LOG_OUT", isLoggedIn: isLoggedIn, user: user}),
  addItems: (isLoggedIn, items) => dispatch({type: "ADD_ITEMS", isLoggedIn: isLoggedIn, items: items})
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
