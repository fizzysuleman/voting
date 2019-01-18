"use strict";
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
var createStyles_1 = __importDefault(require("@material-ui/core/styles/createStyles"));
var withStyles_1 = __importDefault(require("@material-ui/core/styles/withStyles"));
var PropTypes = __importStar(require("prop-types"));
var React = __importStar(require("react"));
var PickerToolbar_1 = __importDefault(require("../../_shared/PickerToolbar"));
var ToolbarButton_1 = __importDefault(require("../../_shared/ToolbarButton"));
var WithUtils_1 = require("../../_shared/WithUtils");
var DateTimePickerView_1 = __importDefault(require("../../constants/DateTimePickerView"));
exports.DateTimePickerHeader = function (props) {
    var date = props.date, classes = props.classes, openView = props.openView, meridiemMode = props.meridiemMode, onOpenViewChange = props.onOpenViewChange, setMeridiemMode = props.setMeridiemMode, theme = props.theme, utils = props.utils, ampm = props.ampm;
    var changeOpenView = function (view) { return function () {
        return onOpenViewChange(view);
    }; };
    var rtl = theme.direction === 'rtl';
    var hourMinuteClassName = rtl
        ? classes.hourMinuteLabelReverse
        : classes.hourMinuteLabel;
    return (React.createElement(PickerToolbar_1.default, { className: classes.toolbar },
        React.createElement("div", { className: classes.dateHeader },
            React.createElement(ToolbarButton_1.default, { variant: "subtitle1", onClick: changeOpenView(DateTimePickerView_1.default.YEAR), selected: openView === DateTimePickerView_1.default.YEAR, label: utils.getYearText(date) }),
            React.createElement(ToolbarButton_1.default, { variant: "h4", onClick: changeOpenView(DateTimePickerView_1.default.DATE), selected: openView === DateTimePickerView_1.default.DATE, label: utils.getDateTimePickerHeaderText(date) })),
        React.createElement("div", { className: classes.timeHeader },
            React.createElement("div", { className: hourMinuteClassName },
                React.createElement(ToolbarButton_1.default, { variant: "h3", onClick: changeOpenView(DateTimePickerView_1.default.HOUR), selected: openView === DateTimePickerView_1.default.HOUR, label: utils.getHourText(date, ampm) }),
                React.createElement(ToolbarButton_1.default, { variant: "h3", label: ":", selected: false, className: classes.separator }),
                React.createElement(ToolbarButton_1.default, { variant: "h3", onClick: changeOpenView(DateTimePickerView_1.default.MINUTES), selected: openView === DateTimePickerView_1.default.MINUTES, label: utils.getMinuteText(date) })),
            ampm && (React.createElement("div", { className: classes.ampmSelection },
                React.createElement(ToolbarButton_1.default, { className: classes.ampmLabel, selected: meridiemMode === 'am', variant: "subtitle1", label: utils.getMeridiemText('am'), onClick: setMeridiemMode('am') }),
                React.createElement(ToolbarButton_1.default, { className: classes.ampmLabel, selected: meridiemMode === 'pm', variant: "subtitle1", label: utils.getMeridiemText('pm'), onClick: setMeridiemMode('pm') }))))));
};
exports.DateTimePickerHeader.propTypes = {
    date: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    meridiemMode: PropTypes.string.isRequired,
    openView: PropTypes.string.isRequired,
    onOpenViewChange: PropTypes.func.isRequired,
    setMeridiemMode: PropTypes.func.isRequired,
    utils: PropTypes.object.isRequired,
    ampm: PropTypes.bool,
    innerRef: PropTypes.any,
};
exports.DateTimePickerHeader.defaultProps = {
    ampm: true,
};
var styles = function () {
    return createStyles_1.default({
        toolbar: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 16,
            paddingRight: 16,
            justifyContent: 'space-around',
        },
        separator: {
            margin: '0 4px 0 2px',
            cursor: 'default',
        },
        ampmSelection: {
            marginLeft: 10,
            marginRight: -10,
        },
        ampmLabel: {
            fontSize: 18,
        },
        hourMinuteLabel: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
        },
        hourMinuteLabelReverse: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            flexDirection: 'row-reverse',
        },
        dateHeader: {
            height: 65,
        },
        timeHeader: {
            height: 65,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
        },
    });
};
exports.default = withStyles_1.default(styles, { withTheme: true })(WithUtils_1.withUtils()(exports.DateTimePickerHeader));
