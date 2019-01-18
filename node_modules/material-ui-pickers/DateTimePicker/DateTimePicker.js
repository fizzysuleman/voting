"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var withStyles_1 = __importDefault(require("@material-ui/core/styles/withStyles"));
var PropTypes = __importStar(require("prop-types"));
var React = __importStar(require("react"));
var time_utils_1 = require("../_helpers/time-utils");
var Calendar_1 = __importDefault(require("../DatePicker/components/Calendar"));
var YearSelection_1 = __importDefault(require("../DatePicker/components/YearSelection"));
var TimePickerView_1 = __importDefault(require("../TimePicker/components/TimePickerView"));
var DateTimePickerHeader_1 = __importDefault(require("./components/DateTimePickerHeader"));
var DateTimePickerTabs_1 = __importDefault(require("./components/DateTimePickerTabs"));
var DateTimePickerView_1 = __importDefault(require("./components/DateTimePickerView"));
var createStyles_1 = __importDefault(require("@material-ui/core/styles/createStyles"));
var WithUtils_1 = require("../_shared/WithUtils");
var DateTimePickerView_2 = __importDefault(require("../constants/DateTimePickerView"));
var prop_types_1 = __importDefault(require("../constants/prop-types"));
var DateTimePicker = /** @class */ (function (_super) {
    __extends(DateTimePicker, _super);
    function DateTimePicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            openView: _this.props.openTo,
            meridiemMode: _this.props.utils.getHours(_this.props.date) >= 12 ? 'pm' : 'am',
        };
        _this.onChange = function (time, isFinish, nextView) {
            if (isFinish === void 0) { isFinish = true; }
            _this.handleChange(time);
            if (isFinish && _this.props.autoSubmit) {
                _this.handleViewChange(nextView);
            }
        };
        _this.setMeridiemMode = function (mode) { return function () {
            _this.setState({ meridiemMode: mode }, function () {
                return _this.handleChange(_this.props.date, false);
            });
        }; };
        _this.handleViewChange = function (view) {
            _this.setState({ openView: view });
        };
        _this.handleChange = function (time, isFinish) {
            if (isFinish === void 0) { isFinish = false; }
            var withMeridiem = time_utils_1.convertToMeridiem(time, _this.state.meridiemMode, Boolean(_this.props.ampm), _this.props.utils);
            _this.props.onChange(withMeridiem, isFinish);
        };
        _this.handleYearChange = function (date) {
            _this.onChange(date, false, DateTimePickerView_2.default.DATE);
        };
        _this.handleDayChange = function (date, isFinish) {
            _this.onChange(date, isFinish, DateTimePickerView_2.default.HOUR);
        };
        _this.handleHourChange = function (time, isFinish) {
            _this.onChange(time, isFinish, DateTimePickerView_2.default.MINUTES);
        };
        return _this;
    }
    DateTimePicker.prototype.render = function () {
        var _a = this.state, openView = _a.openView, meridiemMode = _a.meridiemMode;
        var _b = this.props, date = _b.date, minDate = _b.minDate, maxDate = _b.maxDate, showTabs = _b.showTabs, disablePast = _b.disablePast, disableFuture = _b.disableFuture, leftArrowIcon = _b.leftArrowIcon, rightArrowIcon = _b.rightArrowIcon, dateRangeIcon = _b.dateRangeIcon, timeIcon = _b.timeIcon, renderDay = _b.renderDay, ampm = _b.ampm, shouldDisableDate = _b.shouldDisableDate, animateYearScrolling = _b.animateYearScrolling, classes = _b.classes, allowKeyboardControl = _b.allowKeyboardControl, ViewContainerComponent = _b.ViewContainerComponent;
        var Container = ViewContainerComponent;
        var ViewContainerComponentProps = typeof ViewContainerComponent === 'string'
            ? {}
            : { openView: openView, onChange: this.onChange };
        return (React.createElement(React.Fragment, null,
            React.createElement(DateTimePickerHeader_1.default, { date: date, openView: openView, meridiemMode: meridiemMode, setMeridiemMode: this.setMeridiemMode, onOpenViewChange: this.handleViewChange, ampm: ampm }),
            showTabs && (React.createElement(DateTimePickerTabs_1.default, { view: openView, onChange: this.handleViewChange, dateRangeIcon: dateRangeIcon, timeIcon: timeIcon })),
            React.createElement(Container, __assign({ className: classes.viewContainer }, ViewContainerComponentProps),
                React.createElement(DateTimePickerView_1.default, { selected: openView === DateTimePickerView_2.default.YEAR },
                    React.createElement(YearSelection_1.default, { date: date, minDate: minDate, maxDate: maxDate, onChange: this.handleYearChange, disablePast: disablePast, disableFuture: disableFuture, animateYearScrolling: animateYearScrolling })),
                React.createElement(DateTimePickerView_1.default, { selected: openView === DateTimePickerView_2.default.DATE },
                    React.createElement(Calendar_1.default, { allowKeyboardControl: allowKeyboardControl, date: date, minDate: minDate, maxDate: maxDate, onChange: this.handleDayChange, disablePast: disablePast, disableFuture: disableFuture, leftArrowIcon: leftArrowIcon, rightArrowIcon: rightArrowIcon, renderDay: renderDay, shouldDisableDate: shouldDisableDate })),
                React.createElement(DateTimePickerView_1.default, { selected: openView === DateTimePickerView_2.default.HOUR ||
                        openView === DateTimePickerView_2.default.MINUTES },
                    React.createElement(TimePickerView_1.default, { date: date, type: openView, onHourChange: this.handleHourChange, onMinutesChange: this.handleChange, onSecondsChange: this.handleChange, ampm: ampm })))));
    };
    DateTimePicker.propTypes = {
        allowKeyboardControl: PropTypes.bool,
        ampm: PropTypes.bool,
        animateYearScrolling: PropTypes.bool,
        autoSubmit: PropTypes.bool,
        classes: PropTypes.object.isRequired,
        date: PropTypes.object.isRequired,
        initialFocusedDate: PropTypes.any,
        innerRef: PropTypes.any,
        dateRangeIcon: PropTypes.node,
        disableFuture: PropTypes.bool,
        disablePast: PropTypes.bool,
        leftArrowIcon: PropTypes.node,
        maxDate: prop_types_1.default.date.isRequired,
        minDate: prop_types_1.default.date.isRequired,
        onChange: PropTypes.func.isRequired,
        openTo: PropTypes.oneOf(Object.keys(DateTimePickerView_2.default).map(function (key) { return DateTimePickerView_2.default[key]; })).isRequired,
        renderDay: PropTypes.func,
        rightArrowIcon: PropTypes.node,
        shouldDisableDate: PropTypes.func,
        showTabs: PropTypes.bool,
        timeIcon: PropTypes.node,
        utils: PropTypes.object.isRequired,
        ViewContainerComponent: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
            PropTypes.object,
        ]),
    };
    DateTimePicker.defaultProps = {
        allowKeyboardControl: false,
        ampm: true,
        animateYearScrolling: false,
        autoSubmit: true,
        dateRangeIcon: undefined,
        disableFuture: false,
        disablePast: false,
        leftArrowIcon: undefined,
        renderDay: undefined,
        rightArrowIcon: undefined,
        shouldDisableDate: undefined,
        showTabs: true,
        timeIcon: undefined,
        ViewContainerComponent: 'div',
    };
    return DateTimePicker;
}(React.Component));
exports.DateTimePicker = DateTimePicker;
var styles = createStyles_1.default({
    viewContainer: {
        minHeight: 300,
        position: 'relative',
    },
});
exports.default = withStyles_1.default(styles, {
    name: 'MuiPickersDateTimePicker',
})(WithUtils_1.withUtils()(DateTimePicker));
