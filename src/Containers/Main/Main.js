import React, { Component } from 'react';
import '../../App.css';
import firebase from 'firebase';
import Avatar from './PureComponents/avatar';
import Rating from './PureComponents/starRating';
import PopUp from '../PopUp/popUp';
import streamer from '../streamer.jpg';
import CommentSection from '../Comments/commentSection';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LogInRegister from '../LogIn_Register/logInRegister';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    position: 'absolute',
    top: '0px',
    right: '0px',
  },
  buttonLogOut: {
    margin: theme.spacing.unit,
    position: 'absolute',
    top: '2.3vw',
    right: '0px',
  },
});


class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      rated: false,
      logged: false,
      user: localStorage.getItem('user'),
      value: 2,
    };
  }

  componentDidMount() {

    /**
     * Firebase Configuration
     * **/

    var config = {
      apiKey: 'AIzaSyDKDkXJSksAOSLeFEWj4lQrDTtCb5PiXVE',
      authDomain: 'streamer-profile.firebaseapp.com',
      databaseURL: 'https://streamer-profile.firebaseio.com',
      projectId: 'streamer-profile',
      storageBucket: '',
      messagingSenderId: '657217072906'
    };
    firebase.initializeApp(config);

    /**
     * Since i am not using Redux due to time issues i added this interval to check for changes in the local store
     * **/

    setInterval(() => this.setState({ user: localStorage.getItem('user')}), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  ratingChanged = (newRating) => {
    this.setState(() => {
      return {
        rated: true,
        value: newRating
      };
    });
  }

  logIn = () => {
    this.setState(() => {
      return {logged: true};
    });
  }

  logOut = () => {
    /**
     * Using the firebase build in signOut function
     * **/
    firebase.auth().signOut();
    localStorage.removeItem('user');
    this.setState(() => {
      return {user: ''};
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <Avatar image={streamer} text={'Ivan Ivanov'}/>
        <Rating value={this.state.value} ratingChanged={this.ratingChanged}/>
        <CommentSection/>
        {
          this.state.rated ?
            <PopUp/>
            :
            ''
        }
        {
          this.state.user ?
            <div>
              <h1 className={classes.button}>{this.state.user}</h1>
              <Button onClick={this.logOut} variant="contained" color="primary" className={classes.buttonLogOut}>
                Log Out
              </Button>
            </div>
            :
            <Button onClick={this.logIn} variant="contained" color="primary" className={classes.button}>
              Log In/Sign In
            </Button>
        }

        {
          this.state.logged ?
            <LogInRegister open={true}/>
            :
            ''
        }
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Main);
