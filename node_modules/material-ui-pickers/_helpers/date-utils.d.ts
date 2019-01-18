import { DateType } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date';
import { Utils } from '../typings/utils';
interface FindClosestDateParams {
    date: MaterialUiPickersDate;
    utils: Utils<MaterialUiPickersDate>;
    minDate: DateType;
    maxDate: DateType;
    disableFuture: boolean;
    disablePast: boolean;
    shouldDisableDate: (date: MaterialUiPickersDate) => boolean;
}
export declare const findClosestEnabledDate: ({ date, utils, minDate, maxDate, disableFuture, disablePast, shouldDisableDate, }: FindClosestDateParams) => any;
export {};
