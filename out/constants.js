"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GOLANG = exports.PYTHON_IF = exports.PYTHON = void 0;
exports.PYTHON = `# Auto-generated

def main():
    print("Hello World!")

if __name__ == "__main__":
    main()
`;
exports.PYTHON_IF = `if \${1|True,False|}:
    print("True")
else:
    print("False")
`;
exports.GOLANG = `// Auto-generated

package main

import "fmt"

func main() {
    fmt.Println("Hello World!")
}
`;
//# sourceMappingURL=constants.js.map