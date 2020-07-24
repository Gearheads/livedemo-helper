"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const constants_1 = require("./constants");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "helloworld" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const python = vscode.commands.registerCommand('extension.python', () => __awaiter(this, void 0, void 0, function* () {
        // The code you place here will be executed every time your command is executed
        try {
            createDemo("demo.py", constants_1.PYTHON, "Python");
        }
        catch (e) {
            console.error(`Error: ${e}`);
        }
    }));
    const golang = vscode.commands.registerCommand('extension.golang', () => __awaiter(this, void 0, void 0, function* () {
        try {
            createDemo("demo.go", constants_1.GOLANG, "GoLang");
        }
        catch (e) {
            console.error(`Error: ${e}`);
        }
    }));
    const pythonHelper = vscode.languages.registerCompletionItemProvider('python', {
        provideCompletionItems(document, position, token, context) {
            // a completion item that inserts its text as snippet,
            // the `insertText`-property is a `SnippetString` which will be
            // honored by the editor.
            const snippetCompletion = new vscode.CompletionItem('if/else');
            snippetCompletion.insertText = new vscode.SnippetString(constants_1.PYTHON_IF);
            snippetCompletion.documentation = new vscode.MarkdownString("Inserts an if/else Python snippet.");
            // a completion item that retriggers IntelliSense when being accepted,
            // the `command`-property is set which the editor will execute after 
            // completion has been inserted. Also, the `insertText` is set so that 
            // a space is inserted after `new`
            const commandCompletion = new vscode.CompletionItem('new');
            commandCompletion.kind = vscode.CompletionItemKind.Keyword;
            commandCompletion.insertText = 'new ';
            commandCompletion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };
            // return all completion items as array
            return [
                snippetCompletion,
                commandCompletion
            ];
        }
    });
    // Register functions
    context.subscriptions.push(python, golang, pythonHelper);
}
exports.activate = activate;
const createDemo = (fileName, fileContents, program) => {
    if (vscode.workspace.workspaceFolders) {
        const folderPath = vscode.workspace.workspaceFolders[0].uri.toString().split(":")[1];
        fs.writeFile(path.join(folderPath, fileName), fileContents, err => {
            if (err) {
                console.error(err);
                return vscode.window.showErrorMessage(`Failed to create ${program} demo file`);
            }
            // Display a message box to the user
            vscode.window.showInformationMessage(`Created ${program} Demo file! Happy coding :).`);
        });
    }
    else {
        vscode.window.showErrorMessage('Please open an existing folder');
    }
};
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map