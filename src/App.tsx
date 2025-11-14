import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import PasswordGate from "./components/PasswordGate";
import MainEditor from "./components/MainEditor";

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [showGoTop, setShowGoTop] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setShowGoTop(window.scrollY > 300); 
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div className="min-h-screen bg-[#0C0F0D] relative">
			{!isAuthenticated ? <PasswordGate onAuthenticate={() => setIsAuthenticated(true)} /> : <MainEditor />}

			{showGoTop && (
				<button
					onClick={scrollToTop}
					className="fixed bottom-8 right-8 w-12 h-12 bg-[#0C0F0D] border-2 border-[#4CFFB3] rounded-xl text-[#4CFFB3] flex items-center justify-center shadow-[0_0_20px_rgba(76,255,179,0.4)] hover:shadow-[0_0_40px_rgba(76,255,179,0.8)] transition-all duration-300 animate-float"
					title="Go to Top">
					<ArrowUp className="w-5 h-5" />
				</button>
			)}
		</div>
	);
}

export default App;
