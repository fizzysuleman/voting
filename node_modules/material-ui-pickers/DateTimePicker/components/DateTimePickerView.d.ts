import { WithStyles } from '@material-ui/core/styles/withStyles';
import * as React from 'react';
export interface DateTimePickerViewProps extends WithStyles<typeof styles> {
    selected: boolean;
    children: React.ReactChild;
}
export declare const DateTimePickerView: React.SFC<DateTimePickerViewProps>;
declare const styles: Record<"view", import("@material-ui/core/styles/withStyles").CSSProperties>;
declare const _default: React.ComponentType<Pick<DateTimePickerViewProps & {
    children?: React.ReactNode;
}, "children" | "selected"> & import("@material-ui/core/styles/withStyles").StyledComponentProps<"view">>;
export default _default;
