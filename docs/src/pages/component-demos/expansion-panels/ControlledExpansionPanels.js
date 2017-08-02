// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import ExpansionPanel from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import { CardActions } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

const styleSheet = createStyleSheet({
  root: {
    marginTop: 30,
    width: '100%',
  },
  content: {
    padding: 24,
  },
  actions: {
    height: 64,
    padding: [0, 8],
    justifyContent: 'flex-end',
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
          id="panel1"
          expanded={this.state.expanded === 'panel1'}
          onChange={this.handleChange}
          unmountOnExit
        >
          <Typography className={classes.content} component="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
          <Divider />
          <CardActions className={classes.actions}>
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
          id="panel2"
          expanded={this.state.expanded === 'panel2'}
          onChange={this.handleChange}
        >
          <Typography className={classes.content} component="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanel>
        <ExpansionPanel
          headerTitle="Expansion panel #3"
          expandIcon={<ExpandMoreIcon />}
          id="panel3"
          expanded={this.state.expanded === 'panel3'}
          onChange={this.handleChange}
        >
          <Typography className={classes.content} component="p">
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
