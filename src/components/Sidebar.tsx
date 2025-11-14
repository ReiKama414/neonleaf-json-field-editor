import { Search, Calendar, Filter } from "lucide-react";
import { type VersionData } from "./MainEditor";

interface SidebarProps {
	data: VersionData[];
	searchTerm: string;
	onSearchChange: (term: string) => void;
	selectedVersion: string | null;
	onVersionSelect: (version: string | null) => void;
	dateFilter: { from: string; to: string };
	onDateFilterChange: (filter: { from: string; to: string }) => void;
	hasContentFilter: boolean | null;
	onHasContentFilterChange: (filter: boolean | null) => void;
}

export default function Sidebar({
	data,
	searchTerm,
	onSearchChange,
	selectedVersion,
	onVersionSelect,
	dateFilter,
	onDateFilterChange,
	hasContentFilter,
	onHasContentFilterChange,
}: SidebarProps) {
	const uniqueVersions = Array.from(new Set(data.map((item) => item.version)));

	return (
		<aside className="w-80 bg-[#0F1410] border-r-2 border-[#4CFFB3]/30 p-6 overflow-y-auto">
			<div className="space-y-6">
				<div>
					<div className="flex items-center gap-2 mb-3">
						<Search className="w-5 h-5 text-[#4CFFB3]" />
						<h3 className="text-[#4CFFB3] font-semibold">Search</h3>
					</div>
					<input
						type="text"
						value={searchTerm}
						onChange={(e) => onSearchChange(e.target.value)}
						placeholder="Search versions..."
						className="w-full px-4 py-3 bg-[#0C0F0D] border-2 border-[#4CFFB3]/40 rounded-xl text-[#E8E8E8] placeholder-[#4CFFB3]/30 focus:outline-none focus:border-[#4CFFB3] focus:shadow-[0_0_15px_rgba(76,255,179,0.3)] transition-all duration-300"
					/>
				</div>

				<div>
					<div className="flex items-center gap-2 mb-3">
						<Filter className="w-5 h-5 text-[#4CFFB3]" />
						<h3 className="text-[#4CFFB3] font-semibold">Filters</h3>
					</div>

					<div className="space-y-4">
						<div>
							<label className="text-[#A7FFD8] text-sm mb-2 block">Version</label>
							<select
								value={selectedVersion || ""}
								onChange={(e) => onVersionSelect(e.target.value || null)}
								className="w-full px-4 py-3 bg-[#0C0F0D] border-2 border-[#4CFFB3]/40 rounded-xl text-[#E8E8E8] focus:outline-none focus:border-[#4CFFB3] focus:shadow-[0_0_15px_rgba(76,255,179,0.3)] transition-all duration-300">
								<option value="">All versions</option>
								{uniqueVersions.map((version) => (
									<option key={version} value={version}>
										{version}
									</option>
								))}
							</select>
						</div>

						<div>
							<label className="text-[#A7FFD8] text-sm mb-2 flex items-center gap-2">
								<Calendar className="w-4 h-4" />
								Date From
							</label>
							<input
								type="date"
								value={dateFilter.from}
								onChange={(e) => onDateFilterChange({ ...dateFilter, from: e.target.value })}
								className="w-full px-4 py-3 bg-[#0C0F0D] border-2 border-[#4CFFB3]/40 rounded-xl text-[#E8E8E8] focus:outline-none focus:border-[#4CFFB3] focus:shadow-[0_0_15px_rgba(76,255,179,0.3)] transition-all duration-300"
							/>
						</div>

						<div>
							<label className="text-[#A7FFD8] text-sm mb-2 flex items-center gap-2">
								<Calendar className="w-4 h-4" />
								Date To
							</label>
							<input
								type="date"
								value={dateFilter.to}
								onChange={(e) => onDateFilterChange({ ...dateFilter, to: e.target.value })}
								className="w-full px-4 py-3 bg-[#0C0F0D] border-2 border-[#4CFFB3]/40 rounded-xl text-[#E8E8E8] focus:outline-none focus:border-[#4CFFB3] focus:shadow-[0_0_15px_rgba(76,255,179,0.3)] transition-all duration-300"
							/>
						</div>

						<div>
							<label className="text-[#A7FFD8] text-sm mb-2 block">Has Content</label>
							<select
								value={hasContentFilter === null ? "all" : hasContentFilter ? "yes" : "no"}
								onChange={(e) => {
									const value = e.target.value;
									onHasContentFilterChange(value === "all" ? null : value === "yes");
								}}
								className="w-full px-4 py-3 bg-[#0C0F0D] border-2 border-[#4CFFB3]/40 rounded-xl text-[#E8E8E8] focus:outline-none focus:border-[#4CFFB3] focus:shadow-[0_0_15px_rgba(76,255,179,0.3)] transition-all duration-300">
								<option value="all">All</option>
								<option value="yes">With content</option>
								<option value="no">Empty</option>
							</select>
						</div>

						<button
							onClick={() => {
								onSearchChange("");
								onVersionSelect(null);
								onDateFilterChange({ from: "", to: "" });
								onHasContentFilterChange(null);
							}}
							className="w-full px-4 py-3 bg-[#0C0F0D] border-2 border-[#4CFFB3]/40 rounded-xl text-[#A7FFD8] hover:border-[#4CFFB3] hover:text-[#4CFFB3] transition-all duration-300">
							Clear Filters
						</button>
					</div>
				</div>

				<div>
					<h3 className="text-[#4CFFB3] font-semibold mb-3">All Versions</h3>
					<div className="space-y-2">
						{data.map((version) => (
							<button
								key={version.version}
								onClick={() => {
									const element = document.getElementById(`version-${version.version}`);
									element?.scrollIntoView({ behavior: "smooth", block: "center" });
								}}
								className="w-full text-left px-4 py-3 bg-[#0C0F0D] border-2 border-[#4CFFB3]/40 rounded-xl text-[#E8E8E8] hover:border-[#4CFFB3] hover:bg-[#4CFFB3]/10 hover:shadow-[0_0_15px_rgba(76,255,179,0.3)] hover:-translate-y-0.5 transition-all duration-300 group">
								<div className="font-semibold text-[#4CFFB3] group-hover:text-[#A7FFD8]">{version.version}</div>
								<div className="text-sm text-[#A7FFD8]/70 mt-1">{version.date}</div>
								<div className="text-xs text-[#A7FFD8]/50 mt-1">{version.content.length} items</div>
							</button>
						))}
					</div>
				</div>
			</div>
		</aside>
	);
}
