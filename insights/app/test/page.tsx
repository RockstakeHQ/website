// app/test/page.tsx
export default function TestPage() {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Test OG Image</h1>
        
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <img 
            src="/api/og" 
            alt="Betting Tips"
            style={{
              maxWidth: '100%',
              height: 'auto'
            }}
          />
        </div>
  
        <div className="mt-4">
          <a 
            href="/api/og" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Deschide imaginea într-o fereastră nouă
          </a>
        </div>
      </div>
    );
  }