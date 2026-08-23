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
        // VALIDATE JUDGE CONFIG
        // =====================================

        if (!problem) {

            return resolve({
                success: false,
                status: "Judge Error",
                output: "Problem data was not provided to code runner."
            });

        }

        if (!problem.judge) {

            return resolve({
                success: false,
                status: "Judge Error",
                output:
                    "Judge configuration is missing for this problem."
            });

        }


        const {
            functionName,
            returnType,
            parameters = []
        } = problem.judge;


        if (!functionName) {

            return resolve({
                success: false,
                status: "Judge Error",
                output:
                    "Function name is missing."
            });

        }


        // =====================================
        // GENERATE INPUT PARSER
        // =====================================

        let parserCode = "";

        for (let i = 0; i < parameters.length; i++) {

            const parameter = parameters[i];

            const type = parameter.type;
            const name = parameter.name;


            // ---------------------------------
            // vector<int>
            // ---------------------------------

            if (type === "vector<int>") {

                parserCode += `

    vector<int> ${name};

    string ${name}Input;

    getline(cin, ${name}Input);

    // Remove spaces
    ${name}Input.erase(
        remove(
            ${name}Input.begin(),
            ${name}Input.end(),
            ' '
        ),
        ${name}Input.end()
    );

    // Remove [
    if (
        !${name}Input.empty() &&
        ${name}Input.front() == '['
    ) {
        ${name}Input.erase(0, 1);
    }

    // Remove ]
    if (
        !${name}Input.empty() &&
        ${name}Input.back() == ']'
    ) {
        ${name}Input.pop_back();
    }

    string currentNumber;

    for (char c : ${name}Input) {

        if (c == ',') {

            if (!currentNumber.empty()) {

                ${name}.push_back(
                    stoi(currentNumber)
                );

                currentNumber.clear();
            }

        } else {

            currentNumber += c;
        }
    }

    if (!currentNumber.empty()) {

        ${name}.push_back(
            stoi(currentNumber)
        );
    }

`;
            }


            // ---------------------------------
            // int
            // ---------------------------------

            else if (type === "int") {

                parserCode += `

    int ${name};

    cin >> ${name};

`;
            }


            // ---------------------------------
            // long long
            // ---------------------------------

            else if (type === "long long") {

                parserCode += `

    long long ${name};

    cin >> ${name};

`;
            }


            // ---------------------------------
            // double
            // ---------------------------------

            else if (type === "double") {

                parserCode += `

    double ${name};

    cin >> ${name};

`;
            }


            // ---------------------------------
            // string
            // ---------------------------------

            else if (type === "string") {

                parserCode += `

    string ${name};

    getline(cin, ${name});

`;
            }


            // ---------------------------------
            // vector<string>
            // ---------------------------------

            else if (type === "vector<string>") {

                parserCode += `

    vector<string> ${name};

    string ${name}Input;

    getline(cin, ${name}Input);

    if (
        !${name}Input.empty() &&
        ${name}Input.front() == '['
    ) {
        ${name}Input.erase(0, 1);
    }

    if (
        !${name}Input.empty() &&
        ${name}Input.back() == ']'
    ) {
        ${name}Input.pop_back();
    }

    string currentValue;

    for (char c : ${name}Input) {

        if (c == ',') {

            ${name}.push_back(
                currentValue
            );

            currentValue.clear();

        } else {

            currentValue += c;
        }
    }

    if (!currentValue.empty()) {

        ${name}.push_back(
            currentValue
        );
    }

`;
            }


            // ---------------------------------
            // vector<vector<int>>
            // ---------------------------------

            else if (type === "vector<vector<int>>") {

                parserCode += `

    vector<vector<int>> ${name};

    string ${name}Input;

    getline(cin, ${name}Input);

    // Example:
    // [[1,2],[3,4]]

    if (
        !${name}Input.empty() &&
        ${name}Input.front() == '['
    ) {
        ${name}Input.erase(0, 1);
    }

    if (
        !${name}Input.empty() &&
        ${name}Input.back() == ']'
    ) {
        ${name}Input.pop_back();
    }

    vector<int> currentVector;

    string currentNumber;

    bool insideVector = false;

    for (char c : ${name}Input) {

        if (c == '[') {

            insideVector = true;

            currentVector.clear();

        }

        else if (c == ',') {

            if (
                insideVector &&
                !currentNumber.empty()
            ) {

                currentVector.push_back(
                    stoi(currentNumber)
                );

                currentNumber.clear();
            }

        }

        else if (c == ']') {

            if (
                !currentNumber.empty()
            ) {

                currentVector.push_back(
                    stoi(currentNumber)
                );

                currentNumber.clear();
            }

            if (insideVector) {

                ${name}.push_back(
                    currentVector
                );

                currentVector.clear();

                insideVector = false;
            }

        }

        else if (c != ' ') {

            currentNumber += c;
        }
    }

`;
            }


            // ---------------------------------
            // UNSUPPORTED
            // ---------------------------------

            else {

                return resolve({
                    success: false,
                    status: "Judge Error",
                    output:
                        `Unsupported parameter type: ${type}`
                });

            }

        }


        // =====================================
        // FUNCTION ARGUMENTS
        // =====================================

        const functionArguments =
            parameters
                .map(parameter => parameter.name)
                .join(", ");


        // =====================================
        // FUNCTION CALL
        // =====================================

        const functionCall = `

    Solution solution;

    ${returnType} result =
        solution.${functionName}(
            ${functionArguments}
        );

`;


        // =====================================
        // OUTPUT GENERATOR
        // =====================================

        let outputCode = "";


        // vector<int>
        if (returnType === "vector<int>") {

            outputCode = `

    cout << "[";

    for (
        int i = 0;
        i < result.size();
        i++
    ) {

        if (i > 0) {
            cout << ",";
        }

        cout << result[i];
    }

    cout << "]";

`;
        }


        // vector<string>
        else if (returnType === "vector<string>") {

            outputCode = `

    cout << "[";

    for (
        int i = 0;
        i < result.size();
        i++
    ) {

        if (i > 0) {
            cout << ",";
        }

        cout << result[i];
    }

    cout << "]";

`;
        }


        // int
        else if (returnType === "int") {

            outputCode = `

    cout << result;

`;
        }


        // long long
        else if (returnType === "long long") {

            outputCode = `

    cout << result;

`;
        }


        // double
        else if (returnType === "double") {

            outputCode = `

    cout << result;

`;
        }


        // string
        else if (returnType === "string") {

            outputCode = `

    cout << result;

`;
        }


        // bool
        else if (returnType === "bool") {

            outputCode = `

    cout << (result ? "true" : "false");

`;
        }


        // vector<vector<int>>
        else if (
            returnType ===
            "vector<vector<int>>"
        ) {

            outputCode = `

    cout << "[";

    for (
        int i = 0;
        i < result.size();
        i++
    ) {

        if (i > 0) {
            cout << ",";
        }

        cout << "[";

        for (
            int j = 0;
            j < result[i].size();
            j++
        ) {

            if (j > 0) {
                cout << ",";
            }

            cout << result[i][j];
        }

        cout << "]";
    }

    cout << "]";

`;
        }


        // ---------------------------------
        // UNSUPPORTED RETURN TYPE
        // ---------------------------------

        else {

            return resolve({
                success: false,
                status: "Judge Error",
                output:
                    `Unsupported return type: ${returnType}`
            });

        }


        // =====================================
        // CREATE COMPLETE C++ PROGRAM
        // =====================================

        const driverCode = `

#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;


// =====================================
// USER SOLUTION
// =====================================

${code}


// =====================================
// DRIVER
// =====================================

int main() {

${parserCode}

${functionCall}

${outputCode}

    return 0;
}

`;


        // =====================================
        // WRITE FILE
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

                        status:
                            "Compilation Error",

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

                    (
                        runError,
                        stdout,
                        stderr
                    ) => {

                        cleanup(
                            cppFile,
                            exeFile
                        );


                        if (runError) {

                            return resolve({

                                success: false,

                                status:
                                    "Runtime Error",

                                output:
                                    stderr ||
                                    runError.message

                            });

                        }


                        resolve({

                            success: true,

                            status:
                                "Success",

                            output:
                                stdout.trim()

                        });

                    }
                );


                // =====================================
                // SEND INPUT
                // =====================================

                if (input) {

                    child.stdin.write(
                        input
                    );

                }

                child.stdin.end();

            }
        );

    });
}


// =====================================
// CLEANUP
// =====================================

function cleanup(
    cppFile,
    exeFile
) {

    try {

        if (
            fs.existsSync(cppFile)
        ) {

            fs.unlinkSync(
                cppFile
            );

        }

        if (
            fs.existsSync(exeFile)
        ) {

            fs.unlinkSync(
                exeFile
            );

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
