import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [ticker, setTicker] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://your-backend-service.com/analyze', { ticker });
      setPdfUrl(response.data.pdf_url);  // Make sure your backend returns this
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again!");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Stock Analysis Report</h1>
      <input
        type="text"
        value={ticker}
        onChange={(e) => setTicker(e.target.value.toUpperCase())}
        placeholder="Enter stock ticker (e.g. AAPL)"
        className="border px-4 py-2 rounded mb-3 w-64"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading || !ticker}
      >
        {loading ? 'Generating...' : 'Generate PDF'}
      </button>
      {pdfUrl && (
        <a
          href={pdfUrl}
          className="mt-4 text-green-600 underline"
          download
        >
          📄 Download Report
        </a>
      )}
    </div>
  );
}

export default App;
