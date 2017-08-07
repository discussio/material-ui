// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import keycode from 'keycode';
import { Paper, Typography, IconButton } from '../';
import Collapse from '../transitions/Collapse';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiExpansionPanel', theme => ({
  root: {
    position: 'relative',
    boxShadow: theme.shadows[1],
    margin: 0,
    transition: theme.transitions.create(['margin'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.ease,
    }),
    '&:before': {
      position: 'absolute',
      left: 0,
      top: -1,
      right: 0,
      height: 1,
      content: '""',
      opacity: 1,
      backgroundColor: theme.palette.text.divider,
      transition: theme.transitions.create('opacity', {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.ease,
      }),
    },
    '&:first-child': {
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2,
      '&:before': {
        display: 'none',
      },
    },
    '&:last-child': {
      borderBottomLeftRadius: 2,
      borderBottomRightRadius: 2,
    },
    '&$focused + &': {
      '&:before': {
        backgroundColor: theme.palette.grey[300],
      },
    },
    '&$expanded': {
      margin: [theme.spacing.unit * 2, 0],
      '&:first-child': {
        marginTop: 0,
      },
      '&:last-child': {
        marginBottom: 0,
      },
      '&:before': {
        opacity: 0,
      },
    },
    '&$expanded + &': {
      '&:before': {
        display: 'none',
      },
    },
    '&$disabled': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
    transition: theme.transitions.create(['height', 'background-color'], {
      duration: theme.transitions.duration.shortest,
    }),
    padding: [0, theme.spacing.unit * 3],
    '&:hover:not($disabled)': {
      cursor: 'pointer',
    },
    '&$focused': {
      backgroundColor: theme.palette.grey[300],
    },
    '&$expanded': {
      height: 64,
    },
    '&$disabled': {
      opacity: 0.38,
    },
  },
  headerTitle: {
    flexBasis: '25%',
    fontSize: 15,
    fontWeight: theme.typography.fontWeightRegular,
  },
  headerContent: {
    flexBasis: '50%',
    fontSize: 15,
  },
  expandButton: {
    width: 40,
    height: 40,
    marginRight: -theme.spacing.unit,
    color: theme.palette.text.icon,
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    '&$expanded': {
      transform: 'rotate(180deg)',
    },
  },
  hover: {},
  expanded: {},
  focused: {},
  disabled: {
    color: theme.palette.action.disabled,
  },
  focusHolder: {
    position: 'absolute',
    '&:focus': {
      outline: 'none',
    },
  },
}));

class ExpansionPanel extends Component {
  static defaultProps = {
    disabled: false,
    expandIcon: null,
    disableHeaderTypography: false,
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

  handleHeaderKeyUp = event => {
    const code = keycode(event);
    if (code === 'enter' || code === 'space') {
      this.handleChange();
    }
  };

  handleFocus = () => {
    this.setState({
      focused: true,
    });
  };

  handleBlur = () => {
    this.setState({
      focused: false,
    });
  };

  handleChange = () => {
    const { disabled, onChange } = this.props;
    if (disabled) {
      return;
    }
    const expand = !this.state.expanded;
    if (onChange) {
      onChange(this, expand);
    }
    if (!this.isControlled) {
      this.setState({ expanded: expand });
    }
  };

  renderHeader() {
    const ComponentProp = 'div';
    const {
      classes,
      disabled,
      disableHeaderTypography,
      expandIcon,
      headerTitle,
      headerTitleProps,
    } = this.props;
    const { expanded, focused } = this.state;
    return (
      <ComponentProp
        className={classNames(classes.header, {
          [classes.disabled]: disabled,
          [classes.expanded]: expanded,
          [classes.focused]: focused,
        })}
        onClick={this.handleChange}
      >
        {disableHeaderTypography
          ? headerTitle
          : <Typography
              type="subheading"
              className={classNames(classes.headerTitle, {
                [classes.headerDisabled]: disabled,
              })}
              {...headerTitleProps}
            >
              {headerTitle}
            </Typography>}
        {expandIcon &&
          <IconButton
            disabled={disabled}
            className={classNames(classes.expandButton, {
              [classes.expanded]: expanded,
            })}
            component="div"
            tabIndex="-1"
            onClick={this.handleChange}
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
        tabIndex={!disabled && '0'}
        onKeyUp={this.handleHeaderKeyUp}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      />
    );
  }

  render() {
    const {
      children,
      classes,
      className: classNameProp,
      defaultExpanded,
      disabled,
      disableHeaderTypography,
      expanded,
      expandIcon,
      headerTitle,
      unmountOnExit,
      ...other
    } = this.props;

    const className = classNames(
      {
        [classes.root]: true,
        [classes.focused]: this.state.focused,
        [classes.expanded]: this.state.expanded,
        [classes.disabled]: disabled,
      },
      classNameProp,
    );

    return (
      <Paper className={className} elevation={0} square {...other}>
        {this.renderHeader()}
        {this.renderKeyboardFocusHolder()}
        <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit={unmountOnExit}>
          {children}
        </Collapse>
      </Paper>
    );
  }
}

ExpansionPanel.propTypes = {
  /**
   * The content of the expansion panel.
   */
  children: PropTypes.node,
  /**
   * Allows to extend the style applied to components.
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
   * If `true`, the header title won't be wrapped by a typography component.
   * For instance, that can be usefull to can render an own component instead of h3
   */
  disableHeaderTypography: PropTypes.bool,
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
  headerTitle: PropTypes.node,
  /**
   * Properties applied to the header title Typography element.
   */
  headerTitleProps: PropTypes.object,
  /**
   * Callback fired on every expand/collapse state change.
   */
  onChange: PropTypes.func,
  /**
   * If `true`, unmounts the child elements after collapse the panel.
   */
  unmountOnExit: PropTypes.bool,
};

export default withStyles(styleSheet)(ExpansionPanel);
