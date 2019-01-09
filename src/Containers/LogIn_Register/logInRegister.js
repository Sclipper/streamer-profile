import React from 'react';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class LogInRegister extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: true,
    };
  }

  handleClose = () => {
    this.setState({ open: false });


  };

  handleLogIn = () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    const promise = firebase.auth().signInWithEmailAndPassword(email, pass);

    /**
     * Catches imput errors by the user like badly formatted email etc...
     * This is the worst way to deal with a problem, but due time issues it had to be done
     * **/
    //TODO Add Redux To The Project
    promise
      .catch(e => {alert(e.message); window.location.reload();});

    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        console.log(firebaseUser);
        localStorage.setItem('user', firebaseUser.email);
        alert('Log In successful');
      }
      else
        console.log('Could nto sign in');
    });

    this.handleClose();
  }

  handleSignIn = () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    const promise = firebase.auth().createUserWithEmailAndPassword(email, pass);

    /**
     * Catches imput errors by the user like badly formatted email etc...
     * This is the worst way to deal with a problem, but due time issues it had to be done
     * **/
    //TODO Add Redux To The Project
    promise
      .catch(e => {alert(e.message); window.location.reload();});

    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        console.log(firebaseUser);
        localStorage.setItem('user', firebaseUser.email);
        alert('SignIn successful');
      }
      else
        console.log('Could nto sign in');
    });

    this.handleClose();
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Log In</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Log in or Sign In with email and password.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleLogIn} color="primary">
                Log In
            </Button>
            <Button onClick={this.handleSignIn} color="primary">
              Sign In
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default LogInRegister;
