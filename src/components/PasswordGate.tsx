import { useState, useMemo } from "react";
import { Lock } from "lucide-react";

interface PasswordGateProps {
	onAuthenticate: () => void;
}

export default function PasswordGate({ onAuthenticate }: PasswordGateProps) {
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isShaking, setIsShaking] = useState(false);

	// 👇 讓粒子位置僅在第一次 render 時生成，不會每次 re-render 都變
	const particles = useMemo(() => {
		return Array.from({ length: 20 }).map(() => ({
			left: Math.random() * 100,
			top: Math.random() * 100,
			delay: Math.random() * 5,
			duration: 3 + Math.random() * 4,
			opacity: 0.3,
		}));
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (password === "Sampras") {
			onAuthenticate();
		} else {
			setError("Invalid password");
			setIsShaking(true);
			setTimeout(() => setIsShaking(false), 500);
			setPassword("");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center relative overflow-hidden">
			{/* Background particles - now stable */}
			<div className="absolute inset-0 overflow-hidden">
				{particles.map((p, i) => (
					<div
						key={i}
						className="absolute w-1 h-1 bg-[#4CFFB3] rounded-full animate-float"
						style={{
							left: `${p.left}%`,
							top: `${p.top}%`,
							animationDelay: `${p.delay}s`,
							animationDuration: `${p.duration}s`,
							opacity: p.opacity,
						}}
					/>
				))}
			</div>

			<div className="relative z-10">
				<div
					className={`bg-[#0F1410] border-2 border-[#4CFFB3] rounded-3xl p-12 shadow-[0_0_40px_rgba(76,255,179,0.3)] backdrop-blur-sm transition-transform duration-200 ${
						isShaking ? "animate-shake" : ""
					}`}>
					<div className="text-center mb-8">
						<div className="inline-flex items-center justify-center w-20 h-20 bg-[#4CFFB3]/10 rounded-full mb-4 shadow-[0_0_20px_rgba(76,255,179,0.4)]">
							<Lock className="w-10 h-10 text-[#4CFFB3]" />
						</div>
						<h1 className="text-3xl font-bold text-[#4CFFB3] mb-2">NeonLeaf Editor</h1>
						<p className="text-[#A7FFD8] text-sm">Enter password to continue</p>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<input
								type="password"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
									setError("");
								}}
								placeholder="Enter password"
								className="w-80 px-6 py-4 bg-[#0C0F0D] border-2 border-[#4CFFB3]/40 rounded-xl text-[#E8E8E8] placeholder-[#4CFFB3]/30 focus:outline-none focus:border-[#4CFFB3] focus:shadow-[0_0_20px_rgba(76,255,179,0.4)] transition-all duration-300"
								autoFocus
							/>
							{error && <p className="text-red-400 text-sm mt-2 animate-fadeIn">{error}</p>}
						</div>

						<button
							type="submit"
							className="w-full px-6 py-4 bg-[#0C0F0D] border-2 border-[#4CFFB3] rounded-xl text-[#4CFFB3] font-semibold hover:bg-[#4CFFB3]/10 hover:shadow-[0_0_30px_rgba(76,255,179,0.6)] transition-all duration-300 active:scale-95">
							Enter
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
