import { useState, useMemo } from "react";
import { Download, Upload, Plus } from "lucide-react";
import { type VersionData } from "./MainEditor";
import Sidebar from "./Sidebar";
import VersionEditor from "./VersionEditor";
import ExportModal from "./ExportModal";
import AddVersionModal from "./AddVersionModal";

interface EditorViewProps {
	data: VersionData[];
	fileName: string;
	onDataUpdate: (data: VersionData[]) => void;
	onReset: () => void;
}

export default function EditorView({ data, fileName, onDataUpdate, onReset }: EditorViewProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
	const [dateFilter, setDateFilter] = useState({ from: "", to: "" });
	const [hasContentFilter, setHasContentFilter] = useState<boolean | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [showExportModal, setShowExportModal] = useState(false);
	const [showAddModal, setShowAddModal] = useState(false);
	const itemsPerPage = 5;

	const filteredData = useMemo(() => {
		return data.filter((item) => {
			if (searchTerm && !item.version.toLowerCase().includes(searchTerm.toLowerCase())) {
				return false;
			}

			if (selectedVersion && item.version !== selectedVersion) {
				return false;
			}

			if (dateFilter.from && item.date < dateFilter.from) {
				return false;
			}

			if (dateFilter.to && item.date > dateFilter.to) {
				return false;
			}

			if (hasContentFilter !== null) {
				const hasContent = item.content.length > 0;
				if (hasContentFilter !== hasContent) {
					return false;
				}
			}

			return true;
		});
	}, [data, searchTerm, selectedVersion, dateFilter, hasContentFilter]);

	const paginatedData = useMemo(() => {
		const start = (currentPage - 1) * itemsPerPage;
		return filteredData.slice(start, start + itemsPerPage);
	}, [filteredData, currentPage]);

	const totalPages = Math.ceil(filteredData.length / itemsPerPage);

	const handleUpdate = (updatedVersion: VersionData) => {
		const newData = data.map((item) => (item.version === updatedVersion.version ? updatedVersion : item));
		onDataUpdate(newData);
	};

	const handleDelete = (version: string) => {
		const newData = data.filter((item) => item.version !== version);
		onDataUpdate(newData);
	};

	const handleAdd = (newVersion: VersionData, addToStart: boolean) => {
		const newData = addToStart ? [newVersion, ...data] : [...data, newVersion];
		onDataUpdate(newData);
		setShowAddModal(false);
	};

	return (
		<div className="min-h-screen flex flex-col">
			<header className="bg-[#0F1410] border-b-2 border-[#4CFFB3]/30 px-8 py-4 shadow-[0_4px_20px_rgba(76,255,179,0.2)]">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-[#4CFFB3]">NeonLeaf Editor</h1>
						<p className="text-[#A7FFD8] text-sm mt-1">Editing: {fileName}</p>
					</div>

					<div className="flex items-center gap-4">
						<button
							onClick={() => setShowAddModal(true)}
							className="flex items-center gap-2 px-6 py-3 bg-[#4CFFB3]/10 border-2 border-[#4CFFB3] rounded-xl text-[#4CFFB3] font-semibold hover:bg-[#4CFFB3]/20 hover:shadow-[0_0_20px_rgba(76,255,179,0.5)] transition-all duration-300">
							<Plus className="w-5 h-5" />
							Add Version
						</button>

						<button
							onClick={() => setShowExportModal(true)}
							className="flex items-center gap-2 px-6 py-3 bg-[#4CFFB3]/10 border-2 border-[#4CFFB3] rounded-xl text-[#4CFFB3] font-semibold hover:bg-[#4CFFB3]/20 hover:shadow-[0_0_20px_rgba(76,255,179,0.5)] transition-all duration-300">
							<Download className="w-5 h-5" />
							Export JSON
						</button>

						<button
							onClick={onReset}
							className="flex items-center gap-2 px-6 py-3 bg-[#0C0F0D] border-2 border-[#4CFFB3]/40 rounded-xl text-[#A7FFD8] hover:border-[#4CFFB3] hover:text-[#4CFFB3] transition-all duration-300">
							<Upload className="w-5 h-5" />
							New File
						</button>
					</div>
				</div>
			</header>

			<div className="flex-1 flex">
				<Sidebar
					data={data}
					searchTerm={searchTerm}
					onSearchChange={setSearchTerm}
					selectedVersion={selectedVersion}
					onVersionSelect={setSelectedVersion}
					dateFilter={dateFilter}
					onDateFilterChange={setDateFilter}
					hasContentFilter={hasContentFilter}
					onHasContentFilterChange={setHasContentFilter}
				/>

				<main className="flex-1 p-8 overflow-y-auto">
					{paginatedData.length === 0 ? (
						<div className="flex items-center justify-center h-full">
							<div className="text-center">
								<p className="text-[#A7FFD8] text-xl">No versions match your filters</p>
							</div>
						</div>
					) : (
						<>
							<div className="space-y-6 mb-8">
								{paginatedData.map((version) => (
									<VersionEditor
										key={version.version}
										version={version}
										onUpdate={handleUpdate}
										onDelete={handleDelete}
									/>
								))}
							</div>

							{totalPages > 1 && (
								<div className="flex items-center justify-center gap-4 mt-8">
									<button
										onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
										disabled={currentPage === 1}
										className="px-6 py-2 bg-[#0F1410] border-2 border-[#4CFFB3]/40 rounded-xl text-[#A7FFD8] hover:border-[#4CFFB3] hover:text-[#4CFFB3] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300">
										Previous
									</button>

									<span className="text-[#A7FFD8]">
										Page {currentPage} of {totalPages}
									</span>

									<button
										onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
										disabled={currentPage === totalPages}
										className="px-6 py-2 bg-[#0F1410] border-2 border-[#4CFFB3]/40 rounded-xl text-[#A7FFD8] hover:border-[#4CFFB3] hover:text-[#4CFFB3] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300">
										Next
									</button>
								</div>
							)}
						</>
					)}
				</main>
			</div>

			{showExportModal && <ExportModal data={data} fileName={fileName} onClose={() => setShowExportModal(false)} />}

			{showAddModal && <AddVersionModal onAdd={handleAdd} onClose={() => setShowAddModal(false)} />}
		</div>
	);
}
