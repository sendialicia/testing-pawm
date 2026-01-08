import React, { useState, useEffect, useCallback } from 'react';

interface User {
  id: string;
  email: string;
  nim: string;
  role: string;
}

interface Presensi {
  id: string;
  userId: string;
  modulId: string;
  nama: string;
  nim: string;
  kelompok: string;
  status: 'HADIR' | 'TIDAK_HADIR' | 'TERLAMBAT';
  waktuPresensi: Date;
  keterangan?: string;
  createdAt: Date;
}

interface AsistenPresensiProps {
  modulId: string;
  userRole: string;
}

const AsistenPresensi: React.FC<AsistenPresensiProps> = ({ modulId, userRole }) => {
  const [presensiList, setPresensiList] = useState<Presensi[]>([]);
  const [allPraktikan, setAllPraktikan] = useState<User[]>([]);
  const [belumPresensi, setBelumPresensi] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'hadir' | 'belum'>('hadir');

  // Fetch data presensi dan praktikan
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch presensi for this module
      const presensiResponse = await fetch(`/api/presensi?modulId=${modulId}`);
      const presensiData = await presensiResponse.json();

      if (!presensiData.success) {
        throw new Error(presensiData.error || 'Failed to fetch presensi');
      }

      const presensiList = presensiData.data || [];
      setPresensiList(presensiList);

      // Fetch all praktikan users
      const usersResponse = await fetch('/api/auth/users?role=PRAKTIKAN');
      const usersData = await usersResponse.json();

      if (!usersData.success) {
        throw new Error(usersData.error || 'Failed to fetch users');
      }

      const praktikanList = usersData.data || [];
      setAllPraktikan(praktikanList);

      // Calculate who hasn't done presensi
      const presensiUserIds = new Set(presensiList.map((p: Presensi) => p.userId));
      const belumPresensiList = praktikanList.filter((user: User) => !presensiUserIds.has(user.id));
      setBelumPresensi(belumPresensiList);

    } catch (err: any) {
      setError(err.message || 'Network error');
      console.error('Fetch data error:', err);
    } finally {
      setLoading(false);
    }
  }, [modulId]);

  useEffect(() => {
    if (userRole === 'ASISTEN') {
      fetchData();
    }
  }, [modulId, userRole, fetchData]);

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'HADIR':
        return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">✅ Hadir</span>;
      case 'TERLAMBAT':
        return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">⏰ Terlambat</span>;
      case 'TIDAK_HADIR':
        return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">❌ Tidak Hadir</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">-</span>;
    }
  };

  // Hanya tampilkan untuk asisten
  if (userRole !== 'ASISTEN') {
    return null;
  }

  if (loading) {
    return (
      <div className="mt-8 p-6 bg-purple-50 rounded-lg">
        <h3 className="text-lg font-semibold text-purple-800 mb-4">👥 Data Presensi</h3>
        <p className="text-purple-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-6 bg-red-50 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 mb-4">👥 Data Presensi</h3>
        <p className="text-red-600">Error: {error}</p>
        <button 
          onClick={fetchData}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  const sudahPresensiCount = presensiList.length;
  const belumPresensiCount = belumPresensi.length;
  const totalPraktikan = allPraktikan.length;
  const persentaseKehadiran = totalPraktikan > 0 ? ((sudahPresensiCount / totalPraktikan) * 100).toFixed(1) : 0;

  return (
    <div className="mt-8 p-6 bg-purple-50 rounded-lg">
      <h3 className="text-lg font-semibold text-purple-800 mb-4">👥 Data Presensi Praktikum</h3>
      
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-xs text-gray-600 mb-1">Total Praktikan</p>
          <p className="text-2xl font-bold text-gray-800">{totalPraktikan}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-xs text-gray-600 mb-1">Sudah Presensi</p>
          <p className="text-2xl font-bold text-green-600">{sudahPresensiCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-xs text-gray-600 mb-1">Belum Presensi</p>
          <p className="text-2xl font-bold text-red-600">{belumPresensiCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-xs text-gray-600 mb-1">Tingkat Kehadiran</p>
          <p className="text-2xl font-bold text-blue-600">{persentaseKehadiran}%</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('hadir')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'hadir'
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          Sudah Presensi ({sudahPresensiCount})
        </button>
        <button
          onClick={() => setActiveTab('belum')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'belum'
              ? 'bg-red-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          Belum Presensi ({belumPresensiCount})
        </button>
      </div>

      {/* Content */}
      {activeTab === 'hadir' ? (
        <div className="space-y-3">
          {presensiList.length === 0 ? (
            <p className="text-purple-600 text-center py-8">Belum ada yang melakukan presensi</p>
          ) : (
            presensiList.map((presensi) => (
              <div key={presensi.id} className="bg-white p-4 rounded-lg shadow-sm border border-purple-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">👤 {presensi.nama}</p>
                    <p className="text-sm text-gray-600">🆔 NIM: {presensi.nim}</p>
                    <p className="text-sm text-gray-600">👥 Kelompok: {presensi.kelompok}</p>
                    <p className="text-xs text-gray-500">
                      🕐 {new Date(presensi.waktuPresensi).toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(presensi.status)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {belumPresensi.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-green-600 font-medium mb-2">🎉 Semua praktikan sudah presensi!</p>
              <p className="text-gray-600 text-sm">Tingkat kehadiran 100%</p>
            </div>
          ) : (
            belumPresensi.map((user) => (
              <div key={user.id} className="bg-white p-4 rounded-lg shadow-sm border border-red-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">📧 {user.email}</p>
                    <p className="text-sm text-gray-600">🆔 NIM: {user.nim}</p>
                  </div>
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">
                    ⚠️ Belum Presensi
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AsistenPresensi;
