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
var Icon_1 = __importDefault(require("@material-ui/core/Icon"));
var Paper_1 = __importDefault(require("@material-ui/core/Paper"));
var withStyles_1 = __importDefault(require("@material-ui/core/styles/withStyles"));
var withTheme_1 = __importDefault(require("@material-ui/core/styles/withTheme"));
var Tab_1 = __importDefault(require("@material-ui/core/Tab"));
var Tabs_1 = __importDefault(require("@material-ui/core/Tabs"));
var PropTypes = __importStar(require("prop-types"));
var React = __importStar(require("react"));
var DateTimePickerView_1 = __importDefault(require("../../constants/DateTimePickerView"));
var viewToTabIndex = function (openView) {
    if (openView === DateTimePickerView_1.default.DATE ||
        openView === DateTimePickerView_1.default.YEAR) {
        return 'date';
    }
    return 'time';
};
var tabIndexToView = function (tab) {
    if (tab === 'date') {
        return DateTimePickerView_1.default.DATE;
    }
    return DateTimePickerView_1.default.HOUR;
};
exports.DateTimePickerTabs = function (props) {
    var view = props.view, onChange = props.onChange, classes = props.classes, theme = props.theme, dateRangeIcon = props.dateRangeIcon, timeIcon = props.timeIcon;
    var indicatorColor = theme.palette.type === 'light' ? 'secondary' : 'primary';
    var handleChange = function (e, value) {
        if (value !== viewToTabIndex(view)) {
            onChange(tabIndexToView(value));
        }
    };
    return (React.createElement(Paper_1.default, null,
        React.createElement(Tabs_1.default, { fullWidth: true, value: viewToTabIndex(view), onChange: handleChange, className: classes.tabs, indicatorColor: indicatorColor },
            React.createElement(Tab_1.default, { value: "date", icon: React.createElement(Icon_1.default, null, dateRangeIcon) }),
            React.createElement(Tab_1.default, { value: "time", icon: React.createElement(Icon_1.default, null, timeIcon) }))));
};
exports.DateTimePickerTabs.propTypes = {
    view: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    dateRangeIcon: PropTypes.node.isRequired,
    timeIcon: PropTypes.node.isRequired,
};
var styles = function (theme) { return ({
    tabs: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.type === 'light'
            ? theme.palette.primary.main
            : theme.palette.background.default,
    },
}); };
exports.default = withTheme_1.default()(withStyles_1.default(styles, { name: 'MuiPickerDTTabs' })(exports.DateTimePickerTabs));
