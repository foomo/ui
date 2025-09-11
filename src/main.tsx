import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Button } from "@/components/button";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<div className="p-8">
			<Button>Click me</Button>
		</div>
	</StrictMode>,
);
