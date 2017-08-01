// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Card, Typography, IconButton, CardActions, CardContent } from '../';
import Collapse from '../transitions/Collapse';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';

const styleSheet = createStyleSheet('ExpansionPanel', theme => ({
  card: {
    margin: 0,
    transition: theme.transitions.create('margin', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  cardDisabled: {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.text.disabled,
  },
  cardExpanded: {
    margin: [16, 0],
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
    padding: [0, 24],
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  headerFocused: {
    backgroundColor: theme.palette.grey[200],
  },
  headerExpanded: {
    height: 64,
  },
  headerClickable: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  headerTitle: {
    fontSize: 16,
    color: theme.palette.text.primary,
  },
  content: {
    padding: 0,
    '&:last-child': {},
  },
  expand: {
    width: 40,
    height: 40,
    marginRight: -16,
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
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

/**
 * Non-visible element to manage an interactive keyboard focus state
 * for the ExpansionPanel component
 */
const KeyboardFocusHolder = props => <div {...props} />;

class ExpansionPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO: fix this
      expanded: props.expanded,
      focused: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      expanded: nextProps.expanded,
    });
  }

  onHeaderKeyUp({ keyCode }) {
    // TODO: handle ENTER or SPACE pressed
    if (keyCode === 13 || keyCode === 32) {
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
    this.setState({ expanded: expand });
  };

  handleContentClick = () => {
    const { disabled, onContentClick } = this.props;
    if (!disabled) {
      onContentClick(this);
    }
  };

  render() {
    const {
      children,
      classes,
      className,
      disabled,
      expandIcon,
      headerTitle,
      unmountOnExit,
    } = this.props;

    const { expanded, focused } = this.state;

    return (
      <Card
        className={classNames(className, classes.card, {
          [classes.cardDisabled]: disabled,
          [classes.cardExpanded]: expanded,
        })}
      >
        <CardContent
          className={classNames(classes.header, {
            [classes.headerClickable]: !disabled,
            [classes.headerExpanded]: expanded,
            [classes.headerFocused]: focused,
          })}
          onClick={this.handleExpand}
        >
          <Typography className={classes.headerTitle}>
            <span className={disabled && classes.cardDisabled}>
              {headerTitle}
            </span>
          </Typography>
          <CardActions className={classes.actions}>
            <IconButton
              disabled={disabled}
              className={classNames(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              tabIndex={disableTabbing}
              onClick={this.handleExpand}
            >
              {expandIcon}
            </IconButton>
          </CardActions>
        </CardContent>
        <KeyboardFocusHolder
          className={classes.focusHolder}
          tabIndex={!disabled && enableTabbing}
          onKeyUp={e => this.onHeaderKeyUp(e)}
          onFocus={() => this.handleFocus()}
          onBlur={() => this.handleBlur()}
        />
        <Collapse in={expanded} transitionDuration="auto" unmountOnExit={unmountOnExit}>
          <CardContent className={classes.content} onClick={this.handleContentClick}>
            {children}
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

ExpansionPanel.propTypes = {
  /**
   * Pass child components
   */
  children: PropTypes.object,
  /**
   * Pass css classes definitions
   */
  classes: PropTypes.object,
  /**
   * Sets the class name of the root element
   */
  className: PropTypes.string,
  /**
   * Sets disable state of the panel
   */
  disabled: PropTypes.bool,
  /**
   * Expands or collapses the panel
   */
  expanded: PropTypes.bool,
  /**
   * Sets the title of the panel header
   */
  headerTitle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /**
   * Unmounts the child elements after collapse the panel
   * Pay attention to (redux) forms
   */
  unmountOnExit: PropTypes.bool,
  /**
   * Fired on every expand/collapse state change
   */
  onChange: PropTypes.func,
  /**
   * Fired when the user clicks on expanded content of the panel
   */
  onContentClick: PropTypes.func,
};

ExpansionPanel.defaultProps = {
  children: null,
  classes: {},
  className: '',
  disabled: false,
  expanded: false,
  headerTitle: '',
  unmountOnExit: false,
  onChange: () => true,
  onContentClick: () => {},
};

export default withStyles(styleSheet)(ExpansionPanel);
