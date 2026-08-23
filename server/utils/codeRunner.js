const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");

function runCppCode(code, input = "") {

    return new Promise((resolve) => {

        const tempDir = path.join(__dirname, "../temp");

        // Create temp folder
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
        // GENERATE C++ DRIVER
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
// MAIN DRIVER
// =====================================

int main() {

    vector<int> nums;
    int target;

    /*
     * Input format:
     *
     * [2,7,11,15]
     * 9
     */

    string arrayInput;

    getline(cin, arrayInput);

    // Remove '[' and ']'
    if (!arrayInput.empty() && arrayInput.front() == '[') {
        arrayInput.erase(0, 1);
    }

    if (!arrayInput.empty() && arrayInput.back() == ']') {
        arrayInput.pop_back();
    }


    // Parse numbers
    string currentNumber;

    for (char c : arrayInput) {

        if (c == ',') {

            if (!currentNumber.empty()) {

                nums.push_back(
                    stoi(currentNumber)
                );

                currentNumber.clear();
            }

        } else if (c != ' ') {

            currentNumber += c;
        }
    }


    // Add last number
    if (!currentNumber.empty()) {

        nums.push_back(
            stoi(currentNumber)
        );
    }


    // Read target
    cin >> target;


    // =====================================
    // CALL USER FUNCTION
    // =====================================

    Solution solution;

    vector<int> result =
        solution.twoSum(
            nums,
            target
        );


    // =====================================
    // OUTPUT FORMAT
    // =====================================

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


    return 0;
}
`;


        // =====================================
        // WRITE CPP FILE
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
                // RUN PROGRAM
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

                                status:
                                    "Runtime Error",

                                output:
                                    stderr ||
                                    runError.message

                            });
                        }


                        resolve({

                            success: true,

                            status: "Success",

                            output:
                                stdout.trim()

                        });

                    }
                );


                // =====================================
                // SEND TEST CASE INPUT
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

        if (fs.existsSync(cppFile)) {

            fs.unlinkSync(
                cppFile
            );
        }

        if (fs.existsSync(exeFile)) {

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
