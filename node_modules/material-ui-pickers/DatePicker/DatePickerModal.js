"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PropTypes = __importStar(require("prop-types"));
var React = __importStar(require("react"));
var BasePicker_1 = __importDefault(require("../_shared/BasePicker"));
var prop_types_1 = __importDefault(require("../constants/prop-types"));
var ModalWrapper_1 = __importDefault(require("../wrappers/ModalWrapper"));
var DatePicker_1 = __importDefault(require("./DatePicker"));
exports.DatePickerModal = function (props) {
    var allowKeyboardControl = props.allowKeyboardControl, animateYearScrolling = props.animateYearScrolling, autoOk = props.autoOk, disableFuture = props.disableFuture, disablePast = props.disablePast, format = props.format, forwardedRef = props.forwardedRef, labelFunc = props.labelFunc, leftArrowIcon = props.leftArrowIcon, maxDate = props.maxDate, minDate = props.minDate, initialFocusedDate = props.initialFocusedDate, onChange = props.onChange, openToYearSelection = props.openToYearSelection, renderDay = props.renderDay, rightArrowIcon = props.rightArrowIcon, shouldDisableDate = props.shouldDisableDate, value = props.value, other = __rest(props, ["allowKeyboardControl", "animateYearScrolling", "autoOk", "disableFuture", "disablePast", "format", "forwardedRef", "labelFunc", "leftArrowIcon", "maxDate", "minDate", "initialFocusedDate", "onChange", "openToYearSelection", "renderDay", "rightArrowIcon", "shouldDisableDate", "value"]);
    return (React.createElement(BasePicker_1.default, __assign({}, props), function (_a) {
        var date = _a.date, utils = _a.utils, handleAccept = _a.handleAccept, handleChange = _a.handleChange, handleClear = _a.handleClear, handleDismiss = _a.handleDismiss, handleSetTodayDate = _a.handleSetTodayDate, handleTextFieldChange = _a.handleTextFieldChange, isAccepted = _a.isAccepted;
        return (React.createElement(ModalWrapper_1.default, __assign({ disableFuture: disableFuture, disablePast: disablePast, format: format || utils.dateFormat, labelFunc: labelFunc, maxDate: maxDate, minDate: minDate, onAccept: handleAccept, onChange: handleTextFieldChange, onClear: handleClear, onDismiss: handleDismiss, onSetToday: handleSetTodayDate, ref: forwardedRef, value: value, isAccepted: isAccepted }, other),
            React.createElement(DatePicker_1.default, { date: date, allowKeyboardControl: allowKeyboardControl, animateYearScrolling: animateYearScrolling, disableFuture: disableFuture, disablePast: disablePast, leftArrowIcon: leftArrowIcon, maxDate: maxDate, minDate: minDate, onChange: handleChange, openToYearSelection: openToYearSelection, renderDay: renderDay, rightArrowIcon: rightArrowIcon, shouldDisableDate: shouldDisableDate })));
    }));
};
exports.DatePickerModal.propTypes = {
    /** Datepicker value */
    value: prop_types_1.default.date,
    /** Min selectable date */
    minDate: prop_types_1.default.date,
    /** Max selectable date */
    maxDate: prop_types_1.default.date,
    /** Initial focused date when calendar opens, if no value is provided */
    initialFocusedDate: prop_types_1.default.date,
    /** Date format string for input */
    format: PropTypes.string,
    /** Callback firing when date accepted [(date: Date) => void] */
    onChange: PropTypes.func.isRequired,
    /** Auto accept date on selection */
    autoOk: PropTypes.bool,
    /** Disable past dates */
    disablePast: PropTypes.bool,
    /** Disable future dates */
    disableFuture: PropTypes.bool,
    /** To animate scrolling to current year (with scrollIntoView) */
    animateYearScrolling: PropTypes.bool,
    /** Open datepicker from year selection */
    openToYearSelection: PropTypes.bool,
    /**
     * Allow to specify dynamic label for text field
     * [(date: Date, invalidLabel: string) => string]
     */
    labelFunc: PropTypes.func,
    /** Left arrow icon */
    leftArrowIcon: PropTypes.node,
    /** Right arrow icon */
    rightArrowIcon: PropTypes.node,
    /**
     * Custom renderer for day
     * [(date: Date, nowSelectedDate: Date, isInCurrentMonth: boolean) => ReactElement]
     */
    renderDay: PropTypes.func,
    /** Disable specific date [(date: Date) => boolean] */
    shouldDisableDate: PropTypes.func,
    /** Enables keyboard listener for moving between days in calendar */
    allowKeyboardControl: PropTypes.bool,
    forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};
exports.DatePickerModal.defaultProps = {
    value: new Date(),
    format: undefined,
    autoOk: false,
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
    initialFocusedDate: undefined,
    disableFuture: false,
    disablePast: false,
    animateYearScrolling: false,
    openToYearSelection: false,
    allowKeyboardControl: true,
    leftArrowIcon: 'keyboard_arrow_left',
    rightArrowIcon: 'keyboard_arrow_right',
    renderDay: undefined,
    labelFunc: undefined,
    shouldDisableDate: undefined,
    forwardedRef: undefined,
};
exports.default = React.forwardRef(function (props, ref) { return (React.createElement(exports.DatePickerModal, __assign({}, props, { forwardedRef: ref }))); });
