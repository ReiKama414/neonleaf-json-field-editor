import { useState } from "react";
import JsonUploader from "./JsonUploader";
import EditorView from "./EditorView";

export interface VersionData {
	version: string;
	date: string;
	content: string[];
}

export default function MainEditor() {
	const [jsonData, setJsonData] = useState<VersionData[] | null>(null);
	const [fileName, setFileName] = useState<string>("");

	const handleJsonLoad = (data: VersionData[], name: string) => {
		setJsonData(data);
		setFileName(name);
	};

	const handleJsonUpdate = (data: VersionData[]) => {
		setJsonData(data);
	};

	const handleReset = () => {
		setJsonData(null);
		setFileName("");
	};

	return (
		<>
			{!jsonData ? (
				<JsonUploader onJsonLoad={handleJsonLoad} />
			) : (
				<EditorView data={jsonData} fileName={fileName} onDataUpdate={handleJsonUpdate} onReset={handleReset} />
			)}
		</>
	);
}
