export const PYTHON = `# Auto-generated

def main():
    print("Hello World!")

if __name__ == "__main__":
    main()
`;

export const PYTHON_IF = `if \${1|True,False|}:
    print("True")
else:
    print("False")
`;

export const GOLANG = `// Auto-generated

package main

import "fmt"

func main() {
    fmt.Println("Hello World!")
}
`;