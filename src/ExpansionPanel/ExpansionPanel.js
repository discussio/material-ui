// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { codes } from 'keycode';
import { Card, Typography, IconButton } from '../';
import Collapse from '../transitions/Collapse';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiExpansionPanel', theme => ({
  root: {
    margin: 0,
    transition: theme.transitions.create('margin', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  disabled: {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.text.disabled,
  },
  expanded: {
    margin: [theme.spacing.unit * 2, 0],
    '&:first-child': {
      marginTop: 0,
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
    transition: theme.transitions.create('height', {
      duration: theme.transitions.duration.shortest,
    }),
    padding: [0, theme.spacing.unit * 3],
  },
  headerFocused: {
    backgroundColor: theme.palette.grey[300],
  },
  headerExpanded: {
    height: 64,
  },
  headerHover: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  headerDisabled: {
    opacity: 0.38,
  },
  expandButton: {
    width: 40,
    height: 40,
    marginRight: -theme.spacing.unit * 2,
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandButtonOpen: {
    transform: 'rotate(180deg)',
  },
  focusHolder: {
    position: 'absolute',
    '&:focus': {
      outline: 'none',
    },
  },
}));

const enableTabbing = '0';
const disableTabbing = '-1';

class ExpansionPanel extends Component {
  static defaultProps = {
    disabled: false,
    expandIcon: null,
    onChange: () => {},
    unmountOnExit: false,
  };

  state = {
    expanded: false,
    focused: false,
  };

  componentWillMount() {
    const { expanded, defaultExpanded } = this.props;
    this.isControlled = expanded !== undefined;
    this.setState({
      expanded: this.isControlled ? expanded : defaultExpanded,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.isControlled) {
      this.setState({
        expanded: nextProps.expanded,
      });
    }
  }

  isControlled = null;

  onHeaderKeyUp({ keyCode }) {
    if (keyCode === codes.enter || keyCode === codes.space) {
      this.handleExpand();
    }
  }

  handleFocus() {
    this.setState({
      focused: true,
    });
  }

  handleBlur() {
    this.setState({
      focused: false,
    });
  }

  handleExpand = () => {
    const { disabled, onChange } = this.props;
    if (disabled) {
      return;
    }
    const expand = !this.state.expanded;
    onChange(this, expand);
    if (!this.isControlled) {
      this.setState({ expanded: expand });
    }
  };

  renderHeader() {
    const ComponentProp = 'div';
    const { classes, disabled, expandIcon, headerTitle, headerTitleProps } = this.props;
    const { expanded, focused } = this.state;
    return (
      <ComponentProp
        className={classNames(classes.header, {
          [classes.headerHover]: !disabled,
          [classes.headerExpanded]: expanded,
          [classes.headerFocused]: focused,
        })}
        onClick={this.handleExpand}
      >
        <Typography
          type="body2"
          component="span"
          className={classNames(classes.headerTitle, {
            [classes.headerDisabled]: disabled,
          })}
          {...headerTitleProps}
        >
          {headerTitle}
        </Typography>
        {expandIcon &&
          <IconButton
            disabled={disabled}
            className={classNames(classes.expandButton, {
              [classes.expandButtonOpen]: expanded,
            })}
            component="div"
            tabIndex={disableTabbing}
            onClick={this.handleExpand}
          >
            {expandIcon}
          </IconButton>}
      </ComponentProp>
    );
  }

  renderKeyboardFocusHolder() {
    const ComponentProp = 'div';
    const { classes, disabled } = this.props;
    return (
      <ComponentProp
        className={classes.focusHolder}
        tabIndex={!disabled && enableTabbing}
        onKeyUp={e => this.onHeaderKeyUp(e)}
        onFocus={() => this.handleFocus()}
        onBlur={() => this.handleBlur()}
      />
    );
  }

  render() {
    const { children, classes, className, disabled, unmountOnExit } = this.props;
    const { expanded } = this.state;
    return (
      <Card
        className={classNames(className, classes.root, {
          [classes.disabled]: disabled,
          [classes.expanded]: expanded,
        })}
      >
        {this.renderHeader()}
        {this.renderKeyboardFocusHolder()}
        <Collapse in={expanded} transitionDuration="auto" unmountOnExit={unmountOnExit}>
          {children}
        </Collapse>
      </Card>
    );
  }
}

ExpansionPanel.propTypes = {
  /**
   * The content of the expansion panel.
   */
  children: PropTypes.element,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, expands the panel by default.
   */
  defaultExpanded: PropTypes.bool,
  /**
   * If `true`, the panel should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, expands the panel, otherwise collapse it.
   * Setting this prop enables control over the panel.
   */
  expanded: PropTypes.bool,
  /**
   * The icon to display as the expand indicator.
   */
  expandIcon: PropTypes.element,
  /**
   * Sets the title of the panel header.
   */
  headerTitle: PropTypes.element,
  /**
   * Properties applied to the header title Typography element.
   */
  headerTitleProps: PropTypes.object,
  /**
   * Callback fired on every expand/collapse state change.
   */
  onChange: PropTypes.func,
  /**
   * Unmounts the child elements after collapse the panel.
   */
  unmountOnExit: PropTypes.bool,
};

export default withStyles(styleSheet)(ExpansionPanel);
