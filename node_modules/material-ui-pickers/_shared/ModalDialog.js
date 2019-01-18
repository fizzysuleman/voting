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
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
var DialogActions_1 = __importDefault(require("@material-ui/core/DialogActions"));
var DialogContent_1 = __importDefault(require("@material-ui/core/DialogContent"));
var withStyles_1 = __importDefault(require("@material-ui/core/styles/withStyles"));
var classnames_1 = __importDefault(require("classnames"));
var PropTypes = __importStar(require("prop-types"));
var React = __importStar(require("react"));
var react_event_listener_1 = __importDefault(require("react-event-listener"));
var dialogWidth = 310;
var dialogHeight = 405;
exports.styles = {
    dialogRoot: {
        minWidth: dialogWidth,
        minHeight: dialogHeight,
    },
    dialog: {
        width: dialogWidth,
        minHeight: dialogHeight,
        overflow: 'hidden',
        '&:first-child': {
            padding: 0,
        },
    },
    dialogActions: {
        // set justifyContent to default value to fix IE11 layout bug
        // see https://github.com/dmtrKovalenko/material-ui-pickers/pull/267
        justifyContent: 'flex-start',
    },
    clearableDialogAction: {
        '&:first-child': {
            marginRight: 'auto',
        },
    },
    todayDialogAction: {
        '&:first-child': {
            marginRight: 'auto',
        },
    },
    dialogAction: {
    // empty but may be needed for override
    },
};
exports.ModalDialog = function (_a) {
    var children = _a.children, classes = _a.classes, onKeyDown = _a.onKeyDown, onAccept = _a.onAccept, onDismiss = _a.onDismiss, onClear = _a.onClear, onSetToday = _a.onSetToday, okLabel = _a.okLabel, cancelLabel = _a.cancelLabel, clearLabel = _a.clearLabel, todayLabel = _a.todayLabel, dialogContentClassName = _a.dialogContentClassName, clearable = _a.clearable, showTodayButton = _a.showTodayButton, other = __rest(_a, ["children", "classes", "onKeyDown", "onAccept", "onDismiss", "onClear", "onSetToday", "okLabel", "cancelLabel", "clearLabel", "todayLabel", "dialogContentClassName", "clearable", "showTodayButton"]);
    var _b;
    return (React.createElement(Dialog_1.default, __assign({ onClose: onDismiss, classes: { paper: classes.dialogRoot }, role: "dialog" }, other),
        React.createElement(react_event_listener_1.default, { target: "window", onKeyDown: onKeyDown }),
        React.createElement(DialogContent_1.default, { className: classnames_1.default(classes.dialog, dialogContentClassName) }, children),
        React.createElement(DialogActions_1.default, { classes: {
                root: clearable || showTodayButton ? classes.dialogActions : undefined,
                action: classnames_1.default(classes.dialogAction, (_b = {},
                    _b[classes.clearableDialogAction] = clearable,
                    _b[classes.todayDialogAction] = !clearable && showTodayButton,
                    _b)),
            } },
            clearable && (React.createElement(Button_1.default, { color: "primary", onClick: onClear }, clearLabel)),
            !clearable &&
                showTodayButton && (React.createElement(Button_1.default, { color: "primary", onClick: onSetToday }, todayLabel)),
            React.createElement(Button_1.default, { color: "primary", onClick: onDismiss }, cancelLabel),
            React.createElement(Button_1.default, { color: "primary", onClick: onAccept }, okLabel))));
};
exports.ModalDialog.displayName = 'ModalDialog';
exports.ModalDialog.propTypes = {
    children: PropTypes.node.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    dialogContentClassName: PropTypes.string,
    okLabel: PropTypes.node.isRequired,
    cancelLabel: PropTypes.node.isRequired,
    clearLabel: PropTypes.node.isRequired,
    clearable: PropTypes.bool.isRequired,
    todayLabel: PropTypes.node.isRequired,
    showTodayButton: PropTypes.bool.isRequired,
    onSetToday: PropTypes.func.isRequired,
};
exports.ModalDialog.defaultProps = {
    dialogContentClassName: '',
};
exports.default = withStyles_1.default(exports.styles, { name: 'MuiPickersModal' })(exports.ModalDialog);
