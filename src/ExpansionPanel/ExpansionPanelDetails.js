// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = (theme: Object) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    padding: [theme.spacing.unit, theme.spacing.unit * 3, theme.spacing.unit * 3],
  },
});

function ExpansionPanelDetails(props) {
  const { classes, children, className, ...other } = props;

  return (
    <div className={classNames(classes.root, className)} {...other}>
      {children}
    </div>
  );
}

ExpansionPanelDetails.propTypes = {
  /**
   * The content of the expansion panel details.
   */
  children: PropTypes.node,
  /**
   * Allows to [extend the style](#css-api) applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
};

export default withStyles(styles, { name: 'MuiExpansionPanelDetails' })(ExpansionPanelDetails);
