import React from "react";
export var Progress = function (props) {
    var percent = props.percent, strokeHeight = props.strokeHeight, showText = props.showText, styles = props.styles, theme = props.theme;
    return (React.createElement("div", { className: "fomalhaut-progress-bar", style: styles },
        React.createElement("div", { className: "fomalhaut-progress-bar-outer", style: { height: strokeHeight + "px" } },
            React.createElement("div", { className: "fomalhaut-progress-bar-inner color-" + theme, style: { width: percent + "%" } }, showText && React.createElement("span", { className: "inner-text" }, percent + "%")))));
};
Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: "primary",
};
export default Progress;
