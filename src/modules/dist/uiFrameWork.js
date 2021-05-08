"use strict";
exports.__esModule = true;
exports.install = void 0;
var ant_design_vue_1 = require("ant-design-vue");
exports.install = function (_a) {
    var app = _a.app;
    app.use(ant_design_vue_1.Button);
    app.use(ant_design_vue_1.Popover);
    app.use(ant_design_vue_1.Modal);
    app.use(ant_design_vue_1.InputNumber);
    app.use(ant_design_vue_1.Comment);
    app.use(ant_design_vue_1.Typography);
    app.use(ant_design_vue_1.Input);
};
