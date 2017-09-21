// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import HelpOutlineIcon from 'material-ui-icons/HelpOutline';
import Chip from 'material-ui/Chip';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 4,
    width: '100%',
  },
  header: {
    fontSize: 15,
  },
  secondary: {
    fontSize: 15,
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.3%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.text.lightDivider}`,
    padding: [theme.spacing.unit, theme.spacing.unit * 2],
  },
});

function DetailedExpansionPanel(props) {
  const classes = props.classes;
  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <Typography className={classes.header} gutterBottom>
              Location
            </Typography>
            <Typography default type="caption">
              Optional
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondary}>
              Select trip destination <HelpOutlineIcon className={classes.icon} />
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>
            <TextField label="Name" placeholder="Enter the name" />
          </div>
          <div className={classes.column}>
            <Chip label="Barbados" className={classes.chip} onRequestDelete={() => {}} />
          </div>
          <div className={classes.column}>
            <Typography type="caption" component="p" className={classes.helper}>
              Enter your destination of choice
            </Typography>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button>Cancel</Button>
          <Button color="primary">Save</Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}

DetailedExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailedExpansionPanel);
