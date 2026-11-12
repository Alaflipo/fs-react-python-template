import { useState } from "react";

type GreetingResponse = {
  message: string;
};

export default function App() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function getGreeting() {
        setLoading(true);
        setError("");
        setMessage("");

        try {
        const response = await fetch("http://localhost:8000/api/greet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        });

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        const data: GreetingResponse = await response.json();
            setMessage(data.message);
        } catch (error) {
            setError(
                error instanceof Error ? error.message : "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1>React + Python</h1>

            <input
                aria-label="Your name"
                placeholder="Enter your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />

            <button
                onClick={getGreeting}
                disabled={loading || !name.trim()}
            >
                {loading ? "Loading..." : "Say hello"}
            </button>

            {message && <p>{message}</p>}
            {error && <p role="alert">{error}</p>}
        </main>
    );
}
