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
import React from 'react';
import Input from './input';
import { render, fireEvent } from '@testing-library/react';
var defaultProps = {
    onChange: jest.fn(),
    placeholder: 'test-input'
};
describe("test Input component", function () {
    it("should render the correct default Input", function () {
        var wrapper = render(React.createElement(Input, __assign({}, defaultProps)));
        var testNode = wrapper.getByPlaceholderText("test-input");
        expect(testNode).toBeInTheDocument();
        expect(testNode).toHaveClass("fomalhaut-input");
        fireEvent.change(testNode, { target: { value: "3" } });
        expect(defaultProps.onChange).toHaveBeenCalled();
        expect(testNode.value).toEqual("3");
    });
    it("should render the disabled Input on disabled property", function () {
        var wrapper = render(React.createElement(Input, { disabled: true, placeholder: "test-input" }));
        var testNode = wrapper.getByPlaceholderText("test-input");
        expect(testNode.disabled).toBeTruthy();
    });
    it("should render different Input size on size property", function () {
        var wrapper = render(React.createElement(Input, { size: "lg", placeholder: "input-size" }));
        var testContainer = wrapper.container.querySelector(".fomalhaut-input-wrapper");
        expect(testContainer).toHaveClass("input-lg");
    });
    it("should render prepand and append element on prepand/append property", function () {
        var _a = render(React.createElement(Input, { prepand: "prepand", append: "append" })), queryByText = _a.queryByText, container = _a.container;
        var testContainer = container.querySelector(".fomalhaut-input-wrapper");
        expect(testContainer).toHaveClass("input-group input-group-prepand input-group-append");
        expect(queryByText("prepand")).toBeInTheDocument();
        expect(queryByText("append")).toBeInTheDocument();
    });
});
