'use client';

import { useState, useEffect } from 'react';

interface PeminjamanAlat {
  id: number;
  nama: string;
  nim: string;
  email: string;
  status: string;
  alat: {
    nama: string;
  };
}

export default function TestAsistenPage() {
  const [data, setData] = useState<PeminjamanAlat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testFetch = async () => {
      try {
        console.log('Starting fetch...');
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/peminjaman-alat');
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        const result = await response.json();
        console.log('Response data:', result);
        
        if (result.success) {
          setData(result.data);
          console.log('Data set successfully:', result.data);
        } else {
          setError('API returned success=false');
          console.error('API returned success=false:', result);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
        console.log('Fetch completed');
      }
    };

    testFetch();
  }, []);

  const testApprove = async (id: number) => {
    try {
      console.log('Testing approve for ID:', id);
      
      const response = await fetch(`/api/peminjaman-alat/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'APPROVED',
          keterangan: 'Test approval',
          approvedBy: 'asisten@test.com'
        }),
      });

      const result = await response.json();
      console.log('Approve result:', result);
      
      if (result.success) {
        alert('Successfully approved!');
        // Refresh data
        window.location.reload();
      } else {
        alert('Error: ' + result.error);
      }
    } catch (err) {
      console.error('Approve error:', err);
      alert('Error approving: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Test Asisten - Peminjaman Alat</h1>
      
      <div className="bg-blue-100 p-4 rounded mb-6">
        <h2 className="font-semibold mb-2">Debug Info:</h2>
        <p>Loading: {loading ? 'Yes' : 'No'}</p>
        <p>Error: {error || 'None'}</p>
        <p>Data count: {data.length}</p>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="text-lg">Loading data...</div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No data found
        </div>
      )}

      {!loading && data.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Data Found ({data.length} records):</h2>
          
          {data.map((item) => (
            <div key={item.id} className="border border-gray-300 rounded-lg p-4 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><strong>ID:</strong> {item.id}</p>
                  <p><strong>Nama:</strong> {item.nama}</p>
                  <p><strong>NIM:</strong> {item.nim}</p>
                  <p><strong>Email:</strong> {item.email}</p>
                </div>
                <div>
                  <p><strong>Alat:</strong> {item.alat.nama}</p>
                  <p><strong>Status:</strong> 
                    <span className={`ml-2 px-2 py-1 rounded text-sm ${
                      item.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      item.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                      item.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                  </p>
                  
                  {item.status === 'PENDING' && (
                    <div className="mt-2 space-x-2">
                      <button
                        onClick={() => testApprove(item.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => console.log('Reject clicked for', item.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
