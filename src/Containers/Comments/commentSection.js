import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Comments from './PureComponents/comments';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    float: 'right',
  },
  input: {
    display: 'none',
  },
});

class CommentSection extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      display: 'none',
      comments: [],
    };
  }

  cancel = () => {
    document.getElementById('textField').value = '';
    this.setState(() => {
      return {display: 'none'};
    });
  }

  comment = () => {
    /**
     * Adds the user's Email and comment immutably to an object, would help if we need to store data in a database
     * **/
    let text = document.getElementById('textField').value;
    let user = localStorage.getItem('user');
    var temp = {
      text: text,
      name: user,
    };
    let state = this.state.comments;
    let newObj = state.concat(temp);
    if(this.state.comments.length == 0){
      this.setState(prevState => ({
        ...prevState,
        comments: newObj
      }));
    }
    else {
      this.setState(prevState => ({
        ...prevState,
        comments: newObj
      }));
    }
    this.cancel();
  }

  showButtons = () => {
    /**
     * Took the idea from youtube, when the user clicks on the comment field then we render the buttons
     * **/
    this.setState(() => {
      return {display: ''};
    });
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.comment();
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <TextField
          className={'textField'}
          onKeyPress={this.handleKeyPress}
          onClick={this.showButtons}
          id="textField"
          style={{ margin: 8 }}
          placeholder="Add Comment"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button onClick={this.comment} style={{display: `${this.state.display}`}} variant="contained" color="primary" className={classes.button}>
          Comment
        </Button>
        <Button onClick={this.cancel} style={{display: `${this.state.display}`}} variant="contained" className={classes.button}>
          Cancel
        </Button>

        <Comments text={this.state.comments}/>
      </div>
    );
  }
}

CommentSection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommentSection);
