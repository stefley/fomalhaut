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
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon/icon';
export var Input = function (props) {
    var _a;
    // 取出属性
    var disabled = props.disabled, size = props.size, icon = props.icon, prepand = props.prepand, append = props.append, style = props.style, restProps = __rest(props
    // 根据属性计算不同的className
    , ["disabled", "size", "icon", "prepand", "append", "style"]);
    // 根据属性计算不同的className
    var classes = classNames("fomalhaut-input-wrapper", (_a = {
            "is-disabled": disabled
        },
        _a["input-" + size] = size,
        _a["input-group"] = prepand || append,
        _a["input-group-prepand"] = !!prepand,
        _a["input-group-append"] = !!append,
        _a));
    var fixControlledValue = function (value) {
        if (typeof value === 'undefined' || value === null) {
            return '';
        }
        return value;
    };
    if ('value' in props) {
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(props.value);
    }
    return (React.createElement("div", { className: classes, style: style },
        prepand && React.createElement("div", { className: "fomalhaut-input-prepand" }, prepand),
        icon && React.createElement("div", { className: "icon-wrapper" },
            React.createElement(Icon, { icon: icon, title: "title-" + icon })),
        React.createElement("input", __assign({ className: "fomalhaut-input", disabled: disabled }, restProps)),
        append && React.createElement("div", { className: "fomalhaut-input-append" }, append)));
};
Input.defaultProps = {
    size: 'lg',
    disabled: false
};
export default Input;
