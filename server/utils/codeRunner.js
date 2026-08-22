const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");

function runCppCode(code, input = "") {

    return new Promise((resolve) => {

        const tempDir = path.join(__dirname, "../temp");

        // Create temp folder if it doesn't exist
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

        // Write C++ code to file
        fs.writeFileSync(
            cppFile,
            code,
            "utf8"
        );

        // Compile C++ code
        execFile(
            "g++",
            [
                cppFile,
                "-o",
                exeFile
            ],
            {
                timeout: 10000
            },
            (compileError, stdout, stderr) => {

                if (compileError) {

                    cleanup(cppFile, exeFile);

                    return resolve({
                        success: false,
                        status: "Compilation Error",
                        output: stderr || compileError.message
                    });

                }

                // Run compiled program
                const child = execFile(
                    exeFile,
                    {
                        timeout: 5000
                    },
                    (runError, stdout, stderr) => {

                        cleanup(cppFile, exeFile);

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
                            output: stdout
                        });

                    }
                );

                // Send input to program
                if (input) {
                    child.stdin.write(input);
                }

                child.stdin.end();

            }
        );

    });
}


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


module.exports = {
    runCppCode
};