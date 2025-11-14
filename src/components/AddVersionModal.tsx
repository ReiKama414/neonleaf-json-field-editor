import { useState } from "react";
import { X, Plus } from "lucide-react";
import { type VersionData } from "./MainEditor";

interface AddVersionModalProps {
	onAdd: (version: VersionData, addToStart: boolean) => void;
	onClose: () => void;
}

export default function AddVersionModal({ onAdd, onClose }: AddVersionModalProps) {
	const [newVersion, setNewVersion] = useState<VersionData>({
		version: "",
		date: new Date().toISOString().split("T")[0],
		content: [],
	});
	const [addToStart, setAddToStart] = useState(true);
	const [error, setError] = useState("");

	const handleAddContent = () => {
		setNewVersion({
			...newVersion,
			content: [...newVersion.content, ""],
		});
	};

	const handleRemoveContent = (index: number) => {
		setNewVersion({
			...newVersion,
			content: newVersion.content.filter((_, i) => i !== index),
		});
	};

	const handleContentChange = (index: number, value: string) => {
		const newContent = [...newVersion.content];
		newContent[index] = value;
		setNewVersion({
			...newVersion,
			content: newContent,
		});
	};

	const handleSubmit = () => {
		if (!newVersion.version.trim()) {
			setError("Version is required");
			return;
		}

		if (!newVersion.date) {
			setError("Date is required");
			return;
		}

		onAdd(newVersion, addToStart);
	};

	return (
		<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-8 animate-fadeIn">
			<div className="bg-[#0F1410] border-2 border-[#4CFFB3] rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_40px_rgba(76,255,179,0.4)] animate-slideUp">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-bold text-[#4CFFB3]">Add New Version</h2>
					<button
						onClick={onClose}
						className="p-2 bg-[#0C0F0D] border-2 border-[#4CFFB3]/40 rounded-lg text-[#A7FFD8] hover:border-[#4CFFB3] hover:text-[#4CFFB3] transition-all duration-300">
						<X className="w-5 h-5" />
					</button>
				</div>

				<div className="space-y-6">
					<div className="flex items-center gap-2">
						<input
							type="checkbox"
							checked={addToStart}
							onChange={(e) => setAddToStart(e.target.checked)}
							id="addToStart"
							className="w-5 h-5 bg-[#0C0F0D] border-2 border-[#4CFFB3]/40 rounded-lg accent-[#4CFFB3] focus:outline-none focus:border-[#4CFFB3] focus:shadow-[0_0_15px_rgba(76,255,179,0.3)] transition-all duration-300"
						/>
						<label htmlFor="addToStart" className="text-[#A7FFD8] text-sm select-none">
							Add to top of list
						</label>
					</div>
					<div>
						<label className="text-[#A7FFD8] text-sm mb-2 block font-semibold">
							Version <span className="text-red-400">*</span>
						</label>
						<input
							type="text"
							value={newVersion.version}
							onChange={(e) => {
								setNewVersion({ ...newVersion, version: e.target.value });
								setError("");
							}}
							placeholder="e.g., v1.0.0"
							className="w-full px-4 py-3 bg-[#0C0F0D] border-2 border-[#4CFFB3]/40 rounded-xl text-[#E8E8E8] placeholder-[#4CFFB3]/30 focus:outline-none focus:border-[#4CFFB3] focus:shadow-[0_0_15px_rgba(76,255,179,0.3)] transition-all duration-300"
						/>
					</div>

					<div>
						<label className="text-[#A7FFD8] text-sm mb-2 block font-semibold">
							Date <span className="text-red-400">*</span>
						</label>
						<input
							type="date"
							value={newVersion.date}
							onChange={(e) => setNewVersion({ ...newVersion, date: e.target.value })}
							className="w-full px-4 py-3 bg-[#0C0F0D] border-2 border-[#4CFFB3]/40 rounded-xl text-[#E8E8E8] focus:outline-none focus:border-[#4CFFB3] focus:shadow-[0_0_15px_rgba(76,255,179,0.3)] transition-all duration-300"
						/>
					</div>

					<div>
						<div className="flex items-center justify-between mb-2">
							<label className="text-[#A7FFD8] text-sm font-semibold">Content Items</label>
							<button
								onClick={handleAddContent}
								className="flex items-center gap-1 px-3 py-1 bg-[#4CFFB3]/20 border border-[#4CFFB3] rounded-lg text-[#4CFFB3] text-sm hover:bg-[#4CFFB3]/30 hover:shadow-[0_0_10px_rgba(76,255,179,0.5)] transition-all duration-300">
								<Plus className="w-4 h-4" />
								Add Item
							</button>
						</div>

						{newVersion.content.length === 0 ? (
							<div className="px-4 py-8 bg-[#0C0F0D] border-2 border-dashed border-[#4CFFB3]/30 rounded-xl text-[#A7FFD8]/50 text-center">
								No content items yet. Click "Add Item" to create one.
							</div>
						) : (
							<div className="space-y-3">
								{newVersion.content.map((item, index) => (
									<div key={index} className="flex items-start gap-2">
										<textarea
											value={item}
											onChange={(e) => handleContentChange(index, e.target.value)}
											placeholder={`Content item ${index + 1}`}
											rows={2}
											className="flex-1 px-4 py-3 bg-[#0C0F0D] border-2 border-[#4CFFB3]/40 rounded-xl text-[#E8E8E8] placeholder-[#4CFFB3]/30 focus:outline-none focus:border-[#4CFFB3] focus:shadow-[0_0_15px_rgba(76,255,179,0.3)] transition-all duration-300 resize-none"
										/>
										<button
											onClick={() => handleRemoveContent(index)}
											className="p-2 bg-red-500/20 border-2 border-red-500 rounded-lg text-red-400 hover:bg-red-500/30 hover:shadow-[0_0_10px_rgba(239,68,68,0.5)] transition-all duration-300"
											title="Remove">
											<X className="w-4 h-4" />
										</button>
									</div>
								))}
							</div>
						)}
					</div>

					{error && (
						<div className="px-4 py-3 bg-red-500/20 border border-red-500 rounded-xl text-red-400 animate-fadeIn">
							{error}
						</div>
					)}

					<div className="flex gap-4 pt-4">
						<button
							onClick={handleSubmit}
							className="flex-1 px-6 py-4 bg-[#4CFFB3]/20 border-2 border-[#4CFFB3] rounded-xl text-[#4CFFB3] font-semibold hover:bg-[#4CFFB3]/30 hover:shadow-[0_0_20px_rgba(76,255,179,0.5)] transition-all duration-300">
							Add Version
						</button>
						<button
							onClick={onClose}
							className="flex-1 px-6 py-4 bg-[#0C0F0D] border-2 border-[#4CFFB3]/40 rounded-xl text-[#A7FFD8] hover:border-[#4CFFB3] hover:text-[#4CFFB3] transition-all duration-300">
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
