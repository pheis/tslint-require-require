import * as Lint from "tslint";
import * as ts from "typescript";
import { findImports, ImportKind } from "tsutils";

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: "require-require",
    description: Lint.Utils.dedent`
            Requires requires.`,
    rationale: Lint.Utils.dedent`
            Missing files are no good.`,
    optionsDescription: "None",
    type: "functionality",
    options: {},
    typescriptOnly: false
  };

  public static FAILURE_STRING = "Require require";

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithFunction(sourceFile, walk);
  }
}

function walk(ctx: Lint.WalkContext) {
  for (const name of findImports(ctx.sourceFile, ImportKind.Require)) {
    const { text } = name;
    ctx.addFailure(
      name.getStart(ctx.sourceFile) + 1,
      name.end - 1,
      Rule.FAILURE_STRING
    );
  }
}
