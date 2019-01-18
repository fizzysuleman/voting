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
exports.DateTimePickerView = function (_a) {
    var selected = _a.selected, children = _a.children, classes = _a.classes;
    if (!selected) {
        return null;
    }
    return React.createElement("div", { className: classes.view }, children);
};
exports.DateTimePickerView.propTypes = {
    selected: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
};
var styles = createStyles_1.default({
    view: {
        zIndex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
    },
});
exports.default = withStyles_1.default(styles, { name: 'MuiPickerDTPickerView ' })(exports.DateTimePickerView);
