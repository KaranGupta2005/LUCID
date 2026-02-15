export default function ChatInterface() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {/* Chat messages */}
      </div>
      <div className="border-t p-4">
        <input 
          type="text" 
          placeholder="Type a message..." 
          className="w-full border rounded px-3 py-2"
        />
      </div>
    </div>
  );
}
