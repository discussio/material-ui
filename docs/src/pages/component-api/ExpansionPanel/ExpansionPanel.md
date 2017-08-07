<!--- This documentation is automatically generated, do not try to edit it. -->

# ExpansionPanel



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | The content of the expansion panel. |
| classes | object |  | Allows to [extend the style](#css-api) applied to components. |
| defaultExpanded | bool |  | If `true`, expands the panel by default. |
| disableHeaderTypography | bool | false | If `true`, the header title won't be wrapped by a typography component. For instance, that can be usefull to render an own component instead of h3 |
| disabled | bool | false | If `true`, the panel will be displayed in a disabled state. |
| expandIcon | element | null | The icon to display as the expand indicator. |
| expanded | bool |  | If `true`, expands the panel, otherwise collapse it. Setting this prop enables control over the panel. |
| headerTitle | node |  | Sets the title of the panel header. |
| headerTitleProps | object |  | Properties applied to the header title Typography element. |
| onChange | function |  | Callback fired on every expand/collapse state change. |
| unmountOnExit | bool | false | If `true`, unmounts the child elements after collapse the panel. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `header`
- `headerTitle`
- `expandButton`
- `hover`
- `expanded`
- `focused`
- `disabled`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiExpansionPanel`.
