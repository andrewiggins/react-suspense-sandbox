type NodeEnv = "development" | "production";

interface Process {
	env: {
		NODE_ENV: NodeEnv;
	};
}

declare const process: Process;
