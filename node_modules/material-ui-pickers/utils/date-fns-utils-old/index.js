"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var addDays_1 = __importDefault(require("date-fns/addDays"));
var addMonths_1 = __importDefault(require("date-fns/addMonths"));
var addYears_1 = __importDefault(require("date-fns/addYears"));
var differenceInMilliseconds_1 = __importDefault(require("date-fns/differenceInMilliseconds"));
var eachDayOfInterval_1 = __importDefault(require("date-fns/eachDayOfInterval"));
var endOfDay_1 = __importDefault(require("date-fns/endOfDay"));
var endOfMonth_1 = __importDefault(require("date-fns/endOfMonth"));
var endOfWeek_1 = __importDefault(require("date-fns/endOfWeek"));
var endOfYear_1 = __importDefault(require("date-fns/endOfYear"));
var format_1 = __importDefault(require("date-fns/format"));
var getHours_1 = __importDefault(require("date-fns/getHours"));
var getSeconds_1 = __importDefault(require("date-fns/getSeconds"));
var getYear_1 = __importDefault(require("date-fns/getYear"));
var isAfter_1 = __importDefault(require("date-fns/isAfter"));
var isBefore_1 = __importDefault(require("date-fns/isBefore"));
var isEqual_1 = __importDefault(require("date-fns/isEqual"));
var isSameDay_1 = __importDefault(require("date-fns/isSameDay"));
var isValid_1 = __importDefault(require("date-fns/isValid"));
var parse_1 = __importDefault(require("date-fns/parse"));
var setHours_1 = __importDefault(require("date-fns/setHours"));
var setMinutes_1 = __importDefault(require("date-fns/setMinutes"));
var setSeconds_1 = __importDefault(require("date-fns/setSeconds"));
var setYear_1 = __importDefault(require("date-fns/setYear"));
var startOfDay_1 = __importDefault(require("date-fns/startOfDay"));
var startOfMonth_1 = __importDefault(require("date-fns/startOfMonth"));
var startOfWeek_1 = __importDefault(require("date-fns/startOfWeek"));
var startOfYear_1 = __importDefault(require("date-fns/startOfYear"));
// date-fns < 2.0.0-alpha.8
var DateFnsUtils = /** @class */ (function () {
    function DateFnsUtils(_a) {
        var locale = (_a === void 0 ? {} : _a).locale;
        this.addDays = addDays_1.default;
        this.isValid = isValid_1.default;
        this.getDiff = differenceInMilliseconds_1.default;
        this.isAfter = isAfter_1.default;
        this.isBefore = isBefore_1.default;
        this.startOfDay = startOfDay_1.default;
        this.endOfDay = endOfDay_1.default;
        this.getHours = getHours_1.default;
        this.setHours = setHours_1.default;
        this.setMinutes = setMinutes_1.default;
        this.getSeconds = getSeconds_1.default;
        this.setSeconds = setSeconds_1.default;
        this.isSameDay = isSameDay_1.default;
        this.getStartOfMonth = startOfMonth_1.default;
        this.getYear = getYear_1.default;
        this.setYear = setYear_1.default;
        this.dateTime12hFormat = 'MMMM Do hh:mm a';
        this.dateTime24hFormat = 'MMMM Do HH:mm';
        this.time12hFormat = 'hh:mm A';
        this.time24hFormat = 'HH:mm';
        this.dateFormat = 'MMMM Do';
        this.locale = locale;
    }
    DateFnsUtils.prototype.date = function (value) {
        if (typeof value === 'undefined') {
            return new Date();
        }
        if (value === null) {
            return null;
        }
        return new Date(value);
    };
    DateFnsUtils.prototype.parse = function (value, formatString) {
        if (value === '') {
            return null;
        }
        return parse_1.default(value, formatString, new Date());
    };
    DateFnsUtils.prototype.format = function (date, formatString) {
        return format_1.default(date, formatString, { locale: this.locale });
    };
    DateFnsUtils.prototype.isEqual = function (date, comparing) {
        if (date === null && comparing === null) {
            return true;
        }
        return isEqual_1.default(date, comparing);
    };
    DateFnsUtils.prototype.isNull = function (date) {
        return date === null;
    };
    DateFnsUtils.prototype.isAfterDay = function (date, value) {
        return isAfter_1.default(date, endOfDay_1.default(value));
    };
    DateFnsUtils.prototype.isBeforeDay = function (date, value) {
        return isBefore_1.default(date, startOfDay_1.default(value));
    };
    DateFnsUtils.prototype.isBeforeYear = function (date, value) {
        return isBefore_1.default(date, startOfYear_1.default(value));
    };
    DateFnsUtils.prototype.isAfterYear = function (date, value) {
        return isAfter_1.default(date, endOfYear_1.default(value));
    };
    DateFnsUtils.prototype.formatNumber = function (num) {
        return num;
    };
    DateFnsUtils.prototype.getMinutes = function (date) {
        return date.getMinutes();
    };
    DateFnsUtils.prototype.getMonth = function (date) {
        return date.getMonth();
    };
    DateFnsUtils.prototype.getMeridiemText = function (ampm) {
        return ampm === 'am' ? 'AM' : 'PM';
    };
    DateFnsUtils.prototype.getNextMonth = function (date) {
        return addMonths_1.default(date, 1);
    };
    DateFnsUtils.prototype.getPreviousMonth = function (date) {
        return addMonths_1.default(date, -1);
    };
    DateFnsUtils.prototype.mergeDateAndTime = function (date, time) {
        return this.setMinutes(this.setHours(date, this.getHours(time)), this.getMinutes(time));
    };
    DateFnsUtils.prototype.getWeekdays = function () {
        var _this = this;
        var now = new Date();
        return eachDayOfInterval_1.default({
            start: startOfWeek_1.default(now, { locale: this.locale }),
            end: endOfWeek_1.default(now, { locale: this.locale }),
        }, {
            locale: this.locale,
        }).map(function (day) { return format_1.default(day, 'dd', { locale: _this.locale }); });
    };
    DateFnsUtils.prototype.getWeekArray = function (date) {
        var start = startOfWeek_1.default(startOfMonth_1.default(date), { locale: this.locale });
        var end = endOfWeek_1.default(endOfMonth_1.default(date), { locale: this.locale });
        var count = 0;
        var current = start;
        var nestedWeeks = [];
        while (isBefore_1.default(current, end)) {
            var weekNumber = Math.floor(count / 7);
            nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
            nestedWeeks[weekNumber].push(current);
            current = addDays_1.default(current, 1);
            count += 1;
        }
        return nestedWeeks;
    };
    DateFnsUtils.prototype.getYearRange = function (start, end) {
        var startDate = startOfYear_1.default(new Date(start));
        var endDate = endOfYear_1.default(new Date(end));
        var years = [];
        var current = startDate;
        while (isBefore_1.default(current, endDate)) {
            years.push(current);
            current = addYears_1.default(current, 1);
        }
        return years;
    };
    // displaying methpds
    DateFnsUtils.prototype.getCalendarHeaderText = function (date) {
        return format_1.default(date, 'MMMM YYYY', { locale: this.locale });
    };
    DateFnsUtils.prototype.getYearText = function (date) {
        return format_1.default(date, 'YYYY', { locale: this.locale });
    };
    DateFnsUtils.prototype.getDatePickerHeaderText = function (date) {
        return format_1.default(date, 'ddd, MMM D', { locale: this.locale });
    };
    DateFnsUtils.prototype.getDateTimePickerHeaderText = function (date) {
        return format_1.default(date, 'MMM D', { locale: this.locale });
    };
    DateFnsUtils.prototype.getDayText = function (date) {
        return format_1.default(date, 'D', { locale: this.locale });
    };
    DateFnsUtils.prototype.getHourText = function (date, ampm) {
        return format_1.default(date, ampm ? 'hh' : 'HH', { locale: this.locale });
    };
    DateFnsUtils.prototype.getMinuteText = function (date) {
        return format_1.default(date, 'mm', { locale: this.locale });
    };
    DateFnsUtils.prototype.getSecondText = function (date) {
        return format_1.default(date, 'ss', { locale: this.locale });
    };
    return DateFnsUtils;
}());
exports.default = DateFnsUtils;
