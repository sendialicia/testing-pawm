import { db } from './firebase-admin';
import { COLLECTIONS, User, UserRole } from './firebase-collections';
import { 
  createDocument,
  getDocumentById,
  updateDocument,
  deleteDocument,
  findUniqueDocument,
  queryDocuments,
  getAllDocuments,
  documentExists
} from './firebase-helpers';

/**
 * User Repository
 */
export const UserRepository = {
  async create(data: Omit<User, 'id' | 'createdAt'>) {
    return createDocument(COLLECTIONS.USERS, data);
  },

  async findById(id: string): Promise<User | null> {
    return getDocumentById(COLLECTIONS.USERS, id) as Promise<User | null>;
  },

  async findByEmail(email: string): Promise<User | null> {
    return findUniqueDocument(COLLECTIONS.USERS, 'email', email) as Promise<User | null>;
  },

  async findAll(): Promise<User[]> {
    return getAllDocuments(COLLECTIONS.USERS) as Promise<User[]>;
  },

  async findByRole(role: UserRole): Promise<User[]> {
    return queryDocuments(COLLECTIONS.USERS, 'role', '==', role) as Promise<User[]>;
  },

  async update(id: string, data: Partial<User>) {
    return updateDocument(COLLECTIONS.USERS, id, data);
  },

  async delete(id: string) {
    return deleteDocument(COLLECTIONS.USERS, id);
  },

  async emailExists(email: string): Promise<boolean> {
    return documentExists(COLLECTIONS.USERS, 'email', email);
  },
};

/**
 * Permohonan Repository
 */
export const PermohonanRepository = {
  async create(data: any) {
    return createDocument(COLLECTIONS.PERMOHONAN, data);
  },

  async findById(id: string) {
    return getDocumentById(COLLECTIONS.PERMOHONAN, id);
  },

  async findAll() {
    return getAllDocuments(COLLECTIONS.PERMOHONAN);
  },

  async findByUserId(userId: string) {
    return queryDocuments(COLLECTIONS.PERMOHONAN, 'userId', '==', userId);
  },

  async findByStatus(status: string) {
    return queryDocuments(COLLECTIONS.PERMOHONAN, 'status', '==', status);
  },

  async update(id: string, data: any) {
    return updateDocument(COLLECTIONS.PERMOHONAN, id, data);
  },

  async delete(id: string) {
    return deleteDocument(COLLECTIONS.PERMOHONAN, id);
  },
};

/**
 * Tugas Awal Repository
 */
export const TugasAwalRepository = {
  async create(data: any) {
    return createDocument(COLLECTIONS.TUGAS_AWAL, data);
  },

  async findById(id: string) {
    return getDocumentById(COLLECTIONS.TUGAS_AWAL, id);
  },

  async findAll() {
    return getAllDocuments(COLLECTIONS.TUGAS_AWAL);
  },

  async findByUserId(userId: string) {
    return queryDocuments(COLLECTIONS.TUGAS_AWAL, 'userId', '==', userId);
  },

  async findByUserIdAndModulId(userId: string, modulId: string) {
    const snapshot = await db.collection(COLLECTIONS.TUGAS_AWAL)
      .where('userId', '==', userId)
      .where('modulId', '==', modulId)
      .limit(1)
      .get();
    
    if (snapshot.empty) return null;
    
    return {
      id: snapshot.docs[0].id,
      ...snapshot.docs[0].data(),
    };
  },

  async update(id: string, data: any) {
    return updateDocument(COLLECTIONS.TUGAS_AWAL, id, data);
  },

  async delete(id: string) {
    return deleteDocument(COLLECTIONS.TUGAS_AWAL, id);
  },
};

/**
 * Presensi Repository
 */
export const PresensiRepository = {
  async create(data: any) {
    return createDocument(COLLECTIONS.PRESENSI, data);
  },

  async findById(id: string) {
    return getDocumentById(COLLECTIONS.PRESENSI, id);
  },

  async findAll() {
    return getAllDocuments(COLLECTIONS.PRESENSI);
  },

  async findByUserId(userId: string) {
    return queryDocuments(COLLECTIONS.PRESENSI, 'userId', '==', userId);
  },

  async findByModulId(modulId: string) {
    return queryDocuments(COLLECTIONS.PRESENSI, 'modulId', '==', modulId);
  },

  async findByUserIdAndModulId(userId: string, modulId: string) {
    const snapshot = await db.collection(COLLECTIONS.PRESENSI)
      .where('userId', '==', userId)
      .where('modulId', '==', modulId)
      .limit(1)
      .get();
    
    if (snapshot.empty) return null;
    
    return {
      id: snapshot.docs[0].id,
      ...snapshot.docs[0].data(),
    };
  },

  async update(id: string, data: any) {
    return updateDocument(COLLECTIONS.PRESENSI, id, data);
  },

  async delete(id: string) {
    return deleteDocument(COLLECTIONS.PRESENSI, id);
  },
};

/**
 * Alat Repository
 */
export const AlatRepository = {
  async create(data: any) {
    return createDocument(COLLECTIONS.ALAT, data);
  },

  async findById(id: string) {
    return getDocumentById(COLLECTIONS.ALAT, id);
  },

  async findByNama(nama: string) {
    return findUniqueDocument(COLLECTIONS.ALAT, 'nama', nama);
  },

  async findAll() {
    return getAllDocuments(COLLECTIONS.ALAT);
  },

  async update(id: string, data: any) {
    return updateDocument(COLLECTIONS.ALAT, id, data);
  },

  async delete(id: string) {
    return deleteDocument(COLLECTIONS.ALAT, id);
  },

  async incrementJumlahTersedia(id: string, amount: number) {
    const alatRef = db.collection(COLLECTIONS.ALAT).doc(id);
    const alat = await alatRef.get();
    
    if (!alat.exists) throw new Error('Alat not found');
    
    const currentAmount = alat.data()?.jumlahTersedia || 0;
    await alatRef.update({
      jumlahTersedia: currentAmount + amount,
      updatedAt: new Date(),
    });
  },

  async decrementJumlahTersedia(id: string, amount: number) {
    const alatRef = db.collection(COLLECTIONS.ALAT).doc(id);
    const alat = await alatRef.get();
    
    if (!alat.exists) throw new Error('Alat not found');
    
    const currentAmount = alat.data()?.jumlahTersedia || 0;
    if (currentAmount < amount) {
      throw new Error('Not enough alat available');
    }
    
    await alatRef.update({
      jumlahTersedia: currentAmount - amount,
      updatedAt: new Date(),
    });
  },
};

/**
 * Peminjaman Alat Repository
 */
export const PeminjamanAlatRepository = {
  async create(data: any) {
    return createDocument(COLLECTIONS.PEMINJAMAN_ALAT, data);
  },

  async findById(id: string) {
    return getDocumentById(COLLECTIONS.PEMINJAMAN_ALAT, id);
  },

  async findAll() {
    return getAllDocuments(COLLECTIONS.PEMINJAMAN_ALAT);
  },

  async findByUserId(userId: string) {
    return queryDocuments(COLLECTIONS.PEMINJAMAN_ALAT, 'userId', '==', userId);
  },

  async findByAlatId(alatId: string) {
    return queryDocuments(COLLECTIONS.PEMINJAMAN_ALAT, 'alatId', '==', alatId);
  },

  async findByStatus(status: string) {
    return queryDocuments(COLLECTIONS.PEMINJAMAN_ALAT, 'status', '==', status);
  },

  async update(id: string, data: any) {
    return updateDocument(COLLECTIONS.PEMINJAMAN_ALAT, id, data);
  },

  async delete(id: string) {
    return deleteDocument(COLLECTIONS.PEMINJAMAN_ALAT, id);
  },
};
