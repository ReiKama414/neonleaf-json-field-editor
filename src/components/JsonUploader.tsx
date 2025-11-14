import { useState, useRef } from "react";
import { Upload, FileJson, AlertCircle } from "lucide-react";
import { type VersionData } from "./MainEditor";

interface JsonUploaderProps {
	onJsonLoad: (data: VersionData[], fileName: string) => void;
}

export default function JsonUploader({ onJsonLoad }: JsonUploaderProps) {
	const [isDragging, setIsDragging] = useState(false);
	const [error, setError] = useState<string>("");
	const [isProcessing, setIsProcessing] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const validateJson = (data: unknown): data is VersionData[] => {
		if (!Array.isArray(data)) return false;
		return data.every(
			(item) =>
				typeof item === "object" &&
				item !== null &&
				"version" in item &&
				"date" in item &&
				"content" in item &&
				typeof item.version === "string" &&
				typeof item.date === "string" &&
				Array.isArray(item.content)
		);
	};

	const processFile = async (file: File) => {
		setError("");
		setIsProcessing(true);

		try {
			const text = await file.text();
			const data = JSON.parse(text);

			if (validateJson(data)) {
				setTimeout(() => {
					onJsonLoad(data, file.name);
					setIsProcessing(false);
				}, 800);
			} else {
				setError("Invalid JSON structure. Expected array of {version, date, content}");
				setIsProcessing(false);
			}
		} catch {
			setError("Failed to parse JSON file");
			setIsProcessing(false);
		}
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);

		const file = e.dataTransfer.files[0];
		if (file && file.type === "application/json") {
			processFile(file);
		} else {
			setError("Please upload a valid JSON file");
		}
	};

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			processFile(file);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-8">
			<div className="max-w-2xl w-full">
				<div className="text-center mb-12 animate-fadeIn">
					<h1 className="text-5xl font-bold text-[#4CFFB3] mb-4">NeonLeaf Editor</h1>
					<p className="text-[#A7FFD8] text-lg">Upload your JSON file to begin editing</p>
				</div>

				<div
					onDragOver={(e) => {
						e.preventDefault();
						setIsDragging(true);
					}}
					onDragLeave={() => setIsDragging(false)}
					onDrop={handleDrop}
					className={`relative border-4 border-dashed rounded-3xl p-16 transition-all duration-300 ${
						isDragging
							? "border-[#4CFFB3] bg-[#4CFFB3]/10 shadow-[0_0_50px_rgba(76,255,179,0.4)]"
							: "border-[#4CFFB3]/40 bg-[#0F1410]"
					} ${isProcessing ? "animate-glow" : ""}`}>
					{isProcessing ? (
						<div className="text-center animate-fadeIn">
							<div className="inline-flex items-center justify-center w-24 h-24 bg-[#4CFFB3]/20 rounded-full mb-6 animate-pulse">
								<FileJson className="w-12 h-12 text-[#4CFFB3]" />
							</div>
							<p className="text-[#4CFFB3] text-xl font-semibold">Processing JSON...</p>
							<div className="flex justify-center gap-2 mt-4">
								{[...Array(3)].map((_, i) => (
									<div
										key={i}
										className="w-3 h-3 bg-[#4CFFB3] rounded-full animate-float"
										style={{ animationDelay: `${i * 0.2}s` }}
									/>
								))}
							</div>
						</div>
					) : (
						<>
							<input ref={fileInputRef} type="file" accept=".json" onChange={handleFileSelect} className="hidden" />

							<div className="text-center">
								<div className="inline-flex items-center justify-center w-24 h-24 bg-[#4CFFB3]/10 rounded-full mb-6 shadow-[0_0_30px_rgba(76,255,179,0.3)]">
									<Upload className="w-12 h-12 text-[#4CFFB3]" />
								</div>

								<h2 className="text-2xl font-semibold text-[#E8E8E8] mb-4">Drop your JSON file here</h2>
								<p className="text-[#A7FFD8] mb-8">or</p>

								<button
									onClick={() => fileInputRef.current?.click()}
									className="px-8 py-4 bg-[#0C0F0D] border-2 border-[#4CFFB3] rounded-xl text-[#4CFFB3] font-semibold hover:bg-[#4CFFB3]/10 hover:shadow-[0_0_30px_rgba(76,255,179,0.6)] transition-all duration-300 active:scale-95">
									Browse Files
								</button>
							</div>
						</>
					)}

					{error && (
						<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-red-500/20 border border-red-500 text-red-400 px-6 py-3 rounded-xl animate-fadeIn">
							<AlertCircle className="w-5 h-5" />
							<span>{error}</span>
						</div>
					)}
				</div>

				<div className="mt-8 bg-[#0F1410] border border-[#4CFFB3]/30 rounded-2xl p-6 animate-fadeIn">
					<h3 className="text-[#4CFFB3] font-semibold mb-3">Expected JSON Format:</h3>
					<pre className="text-[#A7FFD8] text-sm overflow-x-auto">
						{`[
  {
    "version": "v1.0.0",
    "date": "2025-01-15",
    "content": ["Feature 1", "Feature 2"]
  }
]`}
					</pre>
				</div>
			</div>
		</div>
	);
}
