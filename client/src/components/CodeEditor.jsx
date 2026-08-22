import Editor from "@monaco-editor/react";

function CodeEditor({ code, setCode }) {

    return (
        <Editor
            height="100%"
            defaultLanguage="cpp"
            language="cpp"
            value={code}
            onChange={(value) => setCode(value || "")}
            theme="vs-dark"
            options={{
                fontSize: 15,
                minimap: {
                    enabled: false
                },
                automaticLayout: true,
                padding: {
                    top: 15
                },
                scrollBeyondLastLine: false,
                wordWrap: "on",
                tabSize: 4
            }}
        />
    );
}

export default CodeEditor;