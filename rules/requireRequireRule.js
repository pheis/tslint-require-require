"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Lint = require("tslint");
var tsutils_1 = require("tsutils");
var fs = require("fs");
var path = require("path");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    };
    Rule.metadata = {
        ruleName: "require-require",
        description: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            Requires requires."], ["\n            Requires requires."]))),
        rationale: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n            Missing files are no good."], ["\n            Missing files are no good."]))),
        optionsDescription: "None",
        type: "functionality",
        options: {},
        typescriptOnly: false
    };
    Rule.FAILURE_STRING = "File not found";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    for (var _i = 0, _a = tsutils_1.findImports(ctx.sourceFile, tsutils_1.ImportKind.Require); _i < _a.length; _i++) {
        var name_1 = _a[_i];
        var base = name_1.text;
        var dir = path.dirname(ctx.sourceFile.fileName);
        var filePath = path.join(dir, base);
        if (!fs.existsSync(filePath)) {
            ctx.addFailure(name_1.getStart(ctx.sourceFile) + 1, name_1.end - 1, Rule.FAILURE_STRING);
        }
    }
}
var templateObject_1, templateObject_2;
//# sourceMappingURL=requireRequireRule.js.map