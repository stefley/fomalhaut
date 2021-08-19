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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React, { useRef, useState } from "react";
import axios from "axios";
import UploadList from "./uploadList";
import Dragger from "./dragger";
export var Upload = function (props) {
    var action = props.action, defaultList = props.defaultList, beforeUpload = props.beforeUpload, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange, onRemove = props.onRemove, name = props.name, headers = props.headers, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, children = props.children, drag = props.drag;
    var fileInput = useRef(null);
    var _a = useState(defaultList || []), fileList = _a[0], setFileList = _a[1];
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (preList) {
            return preList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var handleClick = function () {
        var _a;
        (_a = fileInput === null || fileInput === void 0 ? void 0 : fileInput.current) === null || _a === void 0 ? void 0 : _a.click();
    };
    var handleChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = "";
        }
    };
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                post(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (result !== false) {
                    post(file);
                }
            }
        });
    };
    var handleRemove = function (file) {
        var _a;
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        (_a = props.onRemove) === null || _a === void 0 ? void 0 : _a.call(props, file);
    };
    var post = function (file) {
        var _file = {
            uid: Date.now() + "upload-file",
            status: "ready",
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file,
        };
        setFileList(function (prevList) {
            return __spreadArray([_file], prevList);
        });
        var formData = new FormData();
        formData.append(name !== null && name !== void 0 ? name : "file", file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios
            .post(action, formData, {
            headers: __assign(__assign({}, headers), { "Content-Type": "multipart/form-data" }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: "uploading" });
                    if (onProgress) {
                        onProgress(percentage, _file);
                    }
                }
            },
        })
            .then(function (resp) {
            var _a;
            updateFileList(_file, { status: "success", response: resp.data });
            if (onSuccess) {
                onSuccess(resp.data, _file);
            }
            (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, _file);
        })
            .catch(function (err) {
            var _a;
            updateFileList(_file, { status: "error", error: err });
            if (onError) {
                onError(err, _file);
            }
            (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, _file);
        });
    };
    return (React.createElement("div", { className: "fomalhaut-upload-wrapper" },
        React.createElement("div", { className: "fomalhaut-upload-input", onClick: handleClick },
            drag ? React.createElement(Dragger, { onFile: function (files) { uploadFiles(files); } }, children) : children,
            React.createElement("input", { type: "file", hidden: true, className: "fomalhaut-file-input", ref: fileInput, onChange: handleChange, accept: accept, multiple: multiple })),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
Upload.defaultProps = {
// name: 'file'
};
export default Upload;
