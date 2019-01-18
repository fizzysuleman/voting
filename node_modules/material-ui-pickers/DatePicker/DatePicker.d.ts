import * as React from 'react';
import { WithUtilsProps } from '../_shared/WithUtils';
import { DateType } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date';
import { RenderDay } from './components/Calendar';
export interface BaseDatePickerProps {
    minDate?: DateType;
    maxDate?: DateType;
    initialFocusedDate?: DateType;
    disablePast?: boolean;
    disableFuture?: boolean;
    animateYearScrolling?: boolean;
    openToYearSelection?: boolean;
    leftArrowIcon?: React.ReactNode;
    rightArrowIcon?: React.ReactNode;
    renderDay?: RenderDay;
    allowKeyboardControl?: boolean;
    shouldDisableDate?: (day: MaterialUiPickersDate) => boolean;
}
export interface DatePickerProps extends BaseDatePickerProps {
    date: MaterialUiPickersDate;
    onChange: (date: MaterialUiPickersDate, isFinished?: boolean) => void;
}
export declare class DatePicker extends React.PureComponent<DatePickerProps & WithUtilsProps> {
    static propTypes: any;
    static defaultProps: {
        minDate: string;
        maxDate: string;
        disablePast: boolean;
        disableFuture: boolean;
        allowKeyboardControl: boolean;
        animateYearScrolling: undefined;
        openToYearSelection: boolean;
        children: null;
        leftArrowIcon: undefined;
        rightArrowIcon: undefined;
        renderDay: undefined;
        shouldDisableDate: undefined;
    };
    state: {
        showYearSelection: boolean;
    };
    readonly date: any;
    readonly minDate: any;
    readonly maxDate: any;
    handleYearSelect: (date: any) => void;
    openYearSelection: () => void;
    openCalendar: () => void;
    render(): JSX.Element;
}
declare const _default: React.StatelessComponent<Pick<DatePickerProps & WithUtilsProps, "date" | "onChange" | "initialFocusedDate" | "minDate" | "disablePast" | "disableFuture" | "maxDate" | "leftArrowIcon" | "rightArrowIcon" | "renderDay" | "allowKeyboardControl" | "shouldDisableDate" | "animateYearScrolling" | "openToYearSelection">>;
export default _default;
