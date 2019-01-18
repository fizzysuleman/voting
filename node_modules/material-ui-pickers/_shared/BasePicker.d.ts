import * as React from 'react';
import { DateType } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date';
import { Utils } from '../typings/utils';
import { WithUtilsProps } from './WithUtils';
export interface BasePickerRenderArgs {
    utils: Utils<MaterialUiPickersDate>;
    date: MaterialUiPickersDate;
    isAccepted: boolean;
    handleClear: () => void;
    handleAccept: () => void;
    handleSetTodayDate: () => void;
    handleDismiss: () => void;
    changeDate: (date: MaterialUiPickersDate, callback?: any) => void;
    handleChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
    handleTextFieldChange: (date: MaterialUiPickersDate | null) => void;
    handleAcceptedChange: (isAccepted: boolean, callback?: any) => void;
    pick12hOr24hFormat: (default12hFormat: string, default24hFormat: string) => string;
}
export interface BasePickerProps {
    value: DateType;
    onChange: (date: MaterialUiPickersDate) => void;
    autoOk?: boolean;
    ampm?: boolean;
    format?: string;
    labelFunc?: (date: MaterialUiPickersDate, invalidLabel: string) => string;
    disableOpenOnEnter?: boolean;
    forwardedRef?: any;
    initialFocusedDate?: DateType;
}
export interface OuterBasePickerProps extends BasePickerProps, WithUtilsProps {
    children: (options: BasePickerRenderArgs) => React.ReactNode;
}
export declare class BasePicker extends React.Component<OuterBasePickerProps & WithUtilsProps> {
    state: {
        date: any;
        isAccepted: boolean;
    };
    componentDidUpdate(prevProps: OuterBasePickerProps): void;
    changeDate: (date: any, callback?: any) => void;
    handleAcceptedChange: (isAccepted: boolean, callback?: any) => void;
    handleClear: () => void;
    handleAccept: () => void;
    handleSetTodayDate: () => void;
    handleTextFieldChange: (date: any) => void;
    pick12hOr24hFormat: (default12hFormat: string, default24hFormat: string) => string;
    handleChange: (newDate: any, isFinish?: boolean) => void;
    handleDismiss: () => void;
    render(): React.ReactNode;
}
declare const _default: React.StatelessComponent<Pick<OuterBasePickerProps & WithUtilsProps, "children" | "value" | "onChange" | "format" | "autoOk" | "ampm" | "labelFunc" | "disableOpenOnEnter" | "forwardedRef" | "initialFocusedDate">>;
export default _default;
