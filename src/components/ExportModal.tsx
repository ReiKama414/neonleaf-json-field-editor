import { X, Download, Copy, Check } from "lucide-react";
import { type VersionData } from "./MainEditor";
import { useState } from "react";

interface ExportModalProps {
	data: VersionData[];
	fileName: string;
	onClose: () => void;
}

export default function ExportModal({ data, fileName, onClose }: ExportModalProps) {
	const [copied, setCopied] = useState(false);
	const jsonString = JSON.stringify(data, null, 2);

	const handleDownload = () => {
		const blob = new Blob([jsonString], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = fileName.replace(".json", "") + "_edited.json";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const handleCopy = async () => {
		await navigator.clipboard.writeText(jsonString);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-8 animate-fadeIn">
			<div className="bg-[#0F1410] border-2 border-[#4CFFB3] rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] flex flex-col shadow-[0_0_40px_rgba(76,255,179,0.4)] animate-slideUp">
				<div className="flex items-center justify-between mb-6">
					<div>
						<h2 className="text-2xl font-bold text-[#4CFFB3]">Export JSON</h2>
						<p className="text-[#A7FFD8] text-sm mt-1">Preview and download your edited JSON file</p>
					</div>
					<button
						onClick={onClose}
						className="p-2 bg-[#0C0F0D] border-2 border-[#4CFFB3]/40 rounded-lg text-[#A7FFD8] hover:border-[#4CFFB3] hover:text-[#4CFFB3] transition-all duration-300">
						<X className="w-5 h-5" />
					</button>
				</div>

				<div className="flex-1 overflow-auto mb-6">
					<div className="h-full bg-[#0C0F0D] border-2 border-[#4CFFB3]/40 rounded-xl p-6 ">
						<pre className="text-[#A7FFD8] text-sm font-mono whitespace-pre overflow-auto">{jsonString}</pre>
					</div>
				</div>

				<div className="flex gap-4">
					<button
						onClick={handleDownload}
						className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#4CFFB3]/20 border-2 border-[#4CFFB3] rounded-xl text-[#4CFFB3] font-semibold hover:bg-[#4CFFB3]/30 hover:shadow-[0_0_20px_rgba(76,255,179,0.5)] transition-all duration-300">
						<Download className="w-5 h-5" />
						Download JSON
					</button>
					<button
						onClick={handleCopy}
						className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#0C0F0D] border-2 border-[#4CFFB3]/40 rounded-xl text-[#A7FFD8] hover:border-[#4CFFB3] hover:text-[#4CFFB3] transition-all duration-300">
						{copied ? (
							<>
								<Check className="w-5 h-5" />
								Copied!
							</>
						) : (
							<>
								<Copy className="w-5 h-5" />
								Copy to Clipboard
							</>
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
