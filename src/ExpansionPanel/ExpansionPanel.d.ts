import { StyledComponent } from '..';

export type ExpansionPanelProps = {
  collapseProps?: Object,
  defaultExpanded?: boolean,
  disabled?: boolean,
  expanded?: boolean,
  onChange?: Function,
};

export default class ExpansionPanel extends StyledComponent<ExpansionPanelProps> {}
