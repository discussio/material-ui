// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import ExpansionPanel from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import { CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

const styleSheet = createStyleSheet({
  root: {
    marginTop: 30,
    width: '100%',
  },
  content: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 24,
  },
});

class ControlledExpansionPanels extends Component {
  state = {
    expanded: null,
  };

  handleChange = (panel, expand) => {
    this.setState({
      expanded: expand ? panel.props.id : false,
    });
  };

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <ExpansionPanel
          headerTitle="Expansion panel #1"
          expandIcon={<ExpandMoreIcon />}
          id="p1"
          expanded={this.state.expanded === 'p1'}
          onChange={this.handleChange}
        >
          <Typography className={classes.content} type="body1" component="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
          <CardActions>
            <Button dense color="primary">
              Share
            </Button>
            <Button dense color="primary">
              Learn More
            </Button>
          </CardActions>
        </ExpansionPanel>
        <ExpansionPanel
          headerTitle="Expansion panel #2"
          expandIcon={<ExpandMoreIcon />}
          id="p2"
          expanded={this.state.expanded === 'p2'}
          onChange={this.handleChange}
        >
          <Typography className={classes.content} type="body1" component="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanel>
        <ExpansionPanel
          headerTitle="Expansion panel #3"
          expandIcon={<ExpandMoreIcon />}
          id="p3"
          expanded={this.state.expanded === 'p3'}
          onChange={this.handleChange}
        >
          <Typography className={classes.content} type="body1" component="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanel>
      </div>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(ControlledExpansionPanels);
