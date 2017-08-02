// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import ExpansionPanel from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

const styleSheet = createStyleSheet({
  root: {
    marginTop: 30,
    width: '100%',
  },
  content: {
    padding: 24,
  },
});

function SimpleExpansionPanel(props) {
  const classes = props.classes;
  return (
    <div className={classes.root}>
      <ExpansionPanel headerTitle="Expansion panel title" expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.content} component="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget.
        </Typography>
      </ExpansionPanel>
    </div>
  );
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(SimpleExpansionPanel);
