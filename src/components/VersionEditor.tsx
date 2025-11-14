import { useState } from "react";
import { Edit2, Trash2, Plus, X, Save } from "lucide-react";
import { type VersionData } from "./MainEditor";

interface VersionEditorProps {
	version: VersionData;
	onUpdate: (version: VersionData) => void;
	onDelete: (version: string) => void;
}

export default function VersionEditor({ version, onUpdate, onDelete }: VersionEditorProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [editedVersion, setEditedVersion] = useState<VersionData>(version);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

	const handleSave = () => {
		onUpdate(editedVersion);
		setIsEditing(false);
	};

	const handleCancel = () => {
		setEditedVersion(version);
		setIsEditing(false);
	};

	const handleAddContent = () => {
		setEditedVersion({
			...editedVersion,
			content: [...editedVersion.content, ""],
		});
	};

	const handleRemoveContent = (index: number) => {
		setEditedVersion({
			...editedVersion,
			content: editedVersion.content.filter((_, i) => i !== index),
		});
	};

	const handleContentChange = (index: number, value: string) => {
		const newContent = [...editedVersion.content];
		newContent[index] = value;
		setEditedVersion({
			...editedVersion,
			content: newContent,
		});
	};

	return (
		<div
			id={`version-${version.version}`}
			className="bg-[#0F1410] border-2 border-[#4CFFB3]/30 rounded-2xl p-6 shadow-[0_4px_20px_rgba(76,255,179,0.1)] hover:border-[#4CFFB3]/50 transition-all duration-300 animate-slideUp">
			<div className="flex items-start justify-between mb-6">
				<div className="flex-1">
					{isEditing ? (
						<input
							type="text"
							value={editedVersion.version}
							onChange={(e) => setEditedVersion({ ...editedVersion, version: e.target.value })}
							className="w-full px-4 py-2 bg-[#0C0F0D] border-2 border-[#4CFFB3]/40 rounded-xl text-[#4CFFB3] text-xl font-bold focus:outline-none focus:border-[#4CFFB3] focus:shadow-[0_0_15px_rgba(76,255,179,0.3)] transition-all duration-300"
						/>
					) : (
						<h3 className="text-2xl font-bold text-[#4CFFB3]">{version.version}</h3>
					)}
				</div>

				<div className="flex items-center gap-2 ml-4">
					{isEditing ? (
						<>
							<button
								onClick={handleSave}
								className="p-2 bg-[#4CFFB3]/20 border-2 border-[#4CFFB3] rounded-lg text-[#4CFFB3] hover:bg-[#4CFFB3]/30 hover:shadow-[0_0_15px_rgba(76,255,179,0.5)] transition-all duration-300"
								title="Save">
								<Save className="w-5 h-5" />
							</button>
							<button
								onClick={handleCancel}
								className="p-2 bg-[#0C0F0D] border-2 border-[#4CFFB3]/40 rounded-lg text-[#A7FFD8] hover:border-[#4CFFB3] hover:text-[#4CFFB3] transition-all duration-300"
								title="Cancel">
								<X className="w-5 h-5" />
							</button>
						</>
					) : (
						<>
							<button
								onClick={() => setIsEditing(true)}
								className="p-2 bg-[#4CFFB3]/20 border-2 border-[#4CFFB3] rounded-lg text-[#4CFFB3] hover:bg-[#4CFFB3]/30 hover:shadow-[0_0_15px_rgba(76,255,179,0.5)] transition-all duration-300"
								title="Edit">
								<Edit2 className="w-5 h-5" />
							</button>
							<button
								onClick={() => setShowDeleteConfirm(true)}
								className="p-2 bg-red-500/20 border-2 border-red-500 rounded-lg text-red-400 hover:bg-red-500/30 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all duration-300"
								title="Delete">
								<Trash2 className="w-5 h-5" />
							</button>
						</>
					)}
				</div>
			</div>

			<div className="space-y-4">
				<div>
					<label className="text-[#A7FFD8] text-sm mb-2 block font-semibold">Date</label>
					{isEditing ? (
						<input
							type="date"
							value={editedVersion.date}
							onChange={(e) => setEditedVersion({ ...editedVersion, date: e.target.value })}
							className="w-full px-4 py-3 bg-[#0C0F0D] border-2 border-[#4CFFB3]/40 rounded-xl text-[#E8E8E8] focus:outline-none focus:border-[#4CFFB3] focus:shadow-[0_0_15px_rgba(76,255,179,0.3)] transition-all duration-300"
						/>
					) : (
						<div className="px-4 py-3 bg-[#0C0F0D] border-2 border-[#4CFFB3]/20 rounded-xl text-[#E8E8E8]">
							{version.date}
						</div>
					)}
				</div>

				<div>
					<div className="flex items-center justify-between mb-2">
						<label className="text-[#A7FFD8] text-sm font-semibold">Content</label>
						{isEditing && (
							<button
								onClick={handleAddContent}
								className="flex items-center gap-1 px-3 py-1 bg-[#4CFFB3]/20 border border-[#4CFFB3] rounded-lg text-[#4CFFB3] text-sm hover:bg-[#4CFFB3]/30 hover:shadow-[0_0_10px_rgba(76,255,179,0.5)] transition-all duration-300">
								<Plus className="w-4 h-4" />
								Add Item
							</button>
						)}
					</div>

					<div className="space-y-3">
						{(isEditing ? editedVersion.content : version.content).length === 0 ? (
							<div className="px-4 py-3 bg-[#0C0F0D] border-2 border-[#4CFFB3]/20 rounded-xl text-[#A7FFD8]/50 italic">
								No content items
							</div>
						) : (
							(isEditing ? editedVersion.content : version.content).map((item, index) => (
								<div key={index} className="flex items-start gap-2">
									{isEditing ? (
										<>
											<textarea
												value={item}
												onChange={(e) => handleContentChange(index, e.target.value)}
												rows={2}
												className="flex-1 px-4 py-3 bg-[#0C0F0D] border-2 border-[#4CFFB3]/40 rounded-xl text-[#E8E8E8] focus:outline-none focus:border-[#4CFFB3] focus:shadow-[0_0_15px_rgba(76,255,179,0.3)] transition-all duration-300 resize-none"
											/>
											<button
												onClick={() => handleRemoveContent(index)}
												className="p-2 bg-red-500/20 border-2 border-red-500 rounded-lg text-red-400 hover:bg-red-500/30 hover:shadow-[0_0_10px_rgba(239,68,68,0.5)] transition-all duration-300"
												title="Remove">
												<X className="w-4 h-4" />
											</button>
										</>
									) : (
										<div className="flex-1 px-4 py-3 bg-[#0C0F0D] border-2 border-[#4CFFB3]/20 rounded-xl text-[#E8E8E8]">
											<div className="flex items-start gap-2">
												<span className="text-[#4CFFB3] font-semibold min-w-[24px]">{index + 1}.</span>
												<span>{item}</span>
											</div>
										</div>
									)}
								</div>
							))
						)}
					</div>
				</div>
			</div>

			{showDeleteConfirm && (
				<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fadeIn">
					<div className="bg-[#0F1410] border-2 border-red-500 rounded-2xl p-8 max-w-md shadow-[0_0_40px_rgba(239,68,68,0.4)] animate-slideUp">
						<h3 className="text-xl font-bold text-red-400 mb-4">Confirm Delete</h3>
						<p className="text-[#E8E8E8] mb-6">
							Are you sure you want to delete version <strong className="text-[#4CFFB3]">{version.version}</strong>?
							This action cannot be undone.
						</p>
						<div className="flex gap-4">
							<button
								onClick={() => {
									onDelete(version.version);
									setShowDeleteConfirm(false);
								}}
								className="flex-1 px-6 py-3 bg-red-500/20 border-2 border-red-500 rounded-xl text-red-400 font-semibold hover:bg-red-500/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all duration-300">
								Delete
							</button>
							<button
								onClick={() => setShowDeleteConfirm(false)}
								className="flex-1 px-6 py-3 bg-[#0C0F0D] border-2 border-[#4CFFB3]/40 rounded-xl text-[#A7FFD8] hover:border-[#4CFFB3] hover:text-[#4CFFB3] transition-all duration-300">
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
