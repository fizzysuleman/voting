import { Utils } from '../typings/utils';
export declare const getHours: (offsetX: number, offsetY: number, ampm: boolean) => number;
export declare const getMinutes: (offsetX: number, offsetY: number, step?: number) => number;
export declare const convertToMeridiem: (time: any, meridiem: "am" | "pm", ampm: boolean, utils: Utils<any>) => any;
