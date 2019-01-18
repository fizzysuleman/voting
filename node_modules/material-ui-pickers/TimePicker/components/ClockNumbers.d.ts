/// <reference types="react" />
import { Utils } from '../../typings/utils';
export declare const getHourNumbers: ({ ampm, utils, date, }: {
    ampm: boolean;
    utils: Utils<any>;
    date: any;
}) => JSX.Element[];
export declare const getMinutesNumbers: ({ value, utils, }: {
    value: number;
    utils: Utils<any>;
}) => JSX.Element[];
