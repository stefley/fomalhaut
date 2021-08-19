import React, { useState } from 'react';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import Transition from './components/Transition/transition';
import { CSSTransition } from 'react-transition-group';
import { AutoComplate } from './components/AutoComplete/autoComplete';
function App() {
    var data = ["apple", "banale", "pear", "coat", "shirt", "paint"];
    var handleFetch = function (str) {
        return data.filter(function (name) { return name.includes(str); }).map(function (name) { return ({ value: name }); });
    };
    var _a = useState(false), show = _a[0], setShow = _a[1];
    return (React.createElement("div", { className: "App" },
        React.createElement("header", { className: "App-header" },
            React.createElement(Icon, { icon: "bug", size: "2x", theme: "primary" }),
            React.createElement(Button, { disabled: true }, "Hello"),
            React.createElement(Button, { disabled: true }, "default"),
            React.createElement(Button, { onClick: function () { return alert(111); } }, "default"),
            React.createElement(Button, { btnType: "primary", size: "lg" }, "primary"),
            React.createElement(Button, { btnType: "link", href: "www.baidu.com" }, "Baidu Link"),
            React.createElement(Button, { btnType: "danger", size: "sm" }, "Small Button"),
            React.createElement("p", null,
                "Edit ",
                React.createElement("code", null, "src/App.tsx"),
                " and save to reload."),
            React.createElement(Menu, null,
                React.createElement(MenuItem, { index: "0" }, "menu0"),
                React.createElement(MenuItem, { index: "1" }, "menu1"),
                React.createElement(MenuItem, { index: "2", disabled: true }, "menu2"),
                React.createElement(SubMenu, { title: "dropdown" },
                    React.createElement(MenuItem, null, "dropdown1"),
                    React.createElement(MenuItem, null, "dropdown2"))),
            React.createElement(Button, { size: "lg", onClick: function () { return setShow(!show); } }, " Toggle "),
            React.createElement(CSSTransition, { in: show, timeout: 300, appear: true, unmountOnExit: true, classNames: "zoom-in-top" },
                React.createElement("div", { style: { width: '100px', height: '100px', background: 'red' } })),
            React.createElement(Transition, { in: show, timeout: 300, animation: "zoom-in-top" },
                React.createElement("div", { style: { width: '100px', height: '100px', background: 'red' } })),
            React.createElement(AutoComplate, { value: "v", fetchSuggestions: handleFetch }))));
}
export default App;
