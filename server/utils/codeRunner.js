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

        /*
         * ==========================================
         * CREATE DRIVER CODE
         * ==========================================
         *
         * The user writes LeetCode-style code:
         *
         * class Solution {
         * public:
         *     vector<int> twoSum(...);
         * };
         *
         * We automatically add:
         *
         * - required headers
         * - using namespace std
         * - main()
         * - test case input
         * - function call
         */

        const driverCode = `
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

${code}

int main() {

    vector<int> nums;
    int target;

    int n;

    cin >> n;

    for (int i = 0; i < n; i++) {

        int x;
        cin >> x;

        nums.push_back(x);
    }

    cin >> target;

    Solution solution;

    vector<int> result =
        solution.twoSum(nums, target);

    for (int i = 0; i < result.size(); i++) {

        if (i > 0)
            cout << " ";

        cout << result[i];
    }

    return 0;
}
`;

        // Write generated C++ file
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
                // SEND TEST INPUT
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
