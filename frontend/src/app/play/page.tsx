export default function Player() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white">
      <h1 className="text-2xl mb-4">🎶 JioSaavn Stream (via Axios Proxy)</h1>
      <audio
        controls
        src="http://localhost:8080/play"
        className="w-full max-w-md"
      />
    </div>
  );
}
