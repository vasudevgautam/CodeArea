const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");

function runCppCode(code, input = "", problem) {

    return new Promise((resolve) => {

        const tempDir = path.join(__dirname, "../temp");

        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        const fileName = `solution_${Date.now()}`;

        const cppFile = path.join(
            tempDir,
            `${fileName}.cpp`
        );

        const exeFile = path.join(
            tempDir,
            `${fileName}.exe`
        );


        // =====================================
        // GET JUDGE INFORMATION
        // =====================================

        if (!problem || !problem.judge) {

            return resolve({
                success: false,
                status: "Compilation Error",
                output: "Judge configuration is missing for this problem."
            });

        }

        const {
            functionName,
            returnType,
            parameters
        } = problem.judge;


        if (!functionName) {

            return resolve({
                success: false,
                status: "Compilation Error",
                output: "Function name is missing in judge configuration."
            });

        }


        // =====================================
        // CURRENTLY SUPPORT:
        //
        // vector<int>
        // int
        // =====================================

        const parameterNames =
            parameters.map(param => param.name);


        // =====================================
        // GENERATE FUNCTION CALL
        // =====================================

        const functionArguments =
            parameterNames.join(", ");


        const functionCall = `
    ${returnType} result =
        solution.${functionName}(${functionArguments});
`;


        // =====================================
        // GENERATE OUTPUT
        // =====================================

        let outputCode = "";


        if (returnType === "vector<int>") {

            outputCode = `
    cout << "[";

    for (int i = 0; i < result.size(); i++) {

        if (i > 0) {
            cout << ",";
        }

        cout << result[i];
    }

    cout << "]";
`;
        }

        else if (returnType === "int") {

            outputCode = `
    cout << result;
`;
        }

        else if (returnType === "string") {

            outputCode = `
    cout << result;
`;
        }

        else if (returnType === "bool") {

            outputCode = `
    cout << (result ? "true" : "false");
`;
        }

        else {

            return resolve({
                success: false,
                status: "Compilation Error",
                output:
                    `Unsupported return type: ${returnType}`
            });

        }


        // =====================================
        // GENERATE INPUT PARSER
        // =====================================

        let parserCode = "";

        for (const parameter of parameters) {

            if (parameter.type === "vector<int>") {

                parserCode += `

    vector<int> ${parameter.name};

    string ${parameter.name}Input;

    getline(cin, ${parameter.name}Input);

    if (!${parameter.name}Input.empty() &&
        ${parameter.name}Input.front() == '[') {

        ${parameter.name}Input.erase(0, 1);
    }

    if (!${parameter.name}Input.empty() &&
        ${parameter.name}Input.back() == ']') {

        ${parameter.name}Input.pop_back();
    }

    string currentNumber;

    for (char c : ${parameter.name}Input) {

        if (c == ',') {

            if (!currentNumber.empty()) {

                ${parameter.name}.push_back(
                    stoi(currentNumber)
                );

                currentNumber.clear();
            }

        } else if (c != ' ') {

            currentNumber += c;
        }
    }

    if (!currentNumber.empty()) {

        ${parameter.name}.push_back(
            stoi(currentNumber)
        );
    }

`;
            }

            else if (parameter.type === "int") {

                parserCode += `

    int ${parameter.name};

    cin >> ${parameter.name};

`;
            }

            else if (parameter.type === "string") {

                parserCode += `

    string ${parameter.name};

    getline(cin, ${parameter.name});

`;
            }

            else {

                return resolve({
                    success: false,
                    status: "Compilation Error",
                    output:
                        `Unsupported parameter type: ${parameter.type}`
                });

            }
        }


        // =====================================
        // COMPLETE C++ DRIVER
        // =====================================

        const driverCode = `
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;


// =====================================
// USER CODE
// =====================================

${code}


// =====================================
// DRIVER
// =====================================

int main() {

${parserCode}

    Solution solution;

${functionCall}

${outputCode}

    return 0;
}
`;


        // =====================================
        // WRITE C++ FILE
        // =====================================

        fs.writeFileSync(
            cppFile,
            driverCode,
            "utf8"
        );


        // =====================================
        // COMPILE
        // =====================================

        execFile(
            "g++",
            [
                cppFile,
                "-std=c++17",
                "-o",
                exeFile
            ],
            {
                timeout: 10000
            },

            (compileError, stdout, stderr) => {

                if (compileError) {

                    cleanup(
                        cppFile,
                        exeFile
                    );

                    return resolve({
                        success: false,
                        status: "Compilation Error",
                        output:
                            stderr ||
                            compileError.message
                    });
                }


                // =====================================
                // RUN
                // =====================================

                const child = execFile(
                    exeFile,
                    {
                        timeout: 5000
                    },

                    (runError, stdout, stderr) => {

                        cleanup(
                            cppFile,
                            exeFile
                        );

                        if (runError) {

                            return resolve({
                                success: false,
                                status: "Runtime Error",
                                output:
                                    stderr ||
                                    runError.message
                            });
                        }

                        resolve({
                            success: true,
                            status: "Success",
                            output: stdout.trim()
                        });

                    }
                );


                // =====================================
                // SEND INPUT
                // =====================================

                if (input) {
                    child.stdin.write(input);
                }

                child.stdin.end();

            }
        );

    });
}


// =====================================
// CLEANUP
// =====================================

function cleanup(cppFile, exeFile) {

    try {

        if (fs.existsSync(cppFile)) {
            fs.unlinkSync(cppFile);
        }

        if (fs.existsSync(exeFile)) {
            fs.unlinkSync(exeFile);
        }

    } catch (error) {

        console.error(
            "Cleanup error:",
            error.message
        );
    }
}


// =====================================
// EXPORT
// =====================================

module.exports = {
    runCppCode
};
