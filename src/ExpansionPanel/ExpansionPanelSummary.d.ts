import { StyledComponent } from '..';

export type ExpansionPanelSummaryProps = {
    disabled?: boolean,
    expanded?: boolean,
    expandIcon?: Element,
    onChange?: Function,
};

export default class ExpansionPanelSummary extends StyledComponent<ExpansionPanelSummaryProps> {}
