import { db } from './firebase-admin';
import { 
  DocumentData, 
  QueryDocumentSnapshot,
  Timestamp,
  FieldValue 
} from 'firebase-admin/firestore';

/**
 * Helper function to convert Firestore Timestamp to Date
 */
export function convertTimestampToDate(data: any): any {
  if (!data) return data;
  
  const converted: any = {};
  
  for (const key in data) {
    const value = data[key];
    
    if (value instanceof Timestamp) {
      converted[key] = value.toDate();
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      converted[key] = convertTimestampToDate(value);
    } else {
      converted[key] = value;
    }
  }
  
  return converted;
}

/**
 * Helper function to convert Date to Firestore Timestamp
 */
export function convertDateToTimestamp(data: any): any {
  if (!data) return data;
  
  const converted: any = {};
  
  for (const key in data) {
    const value = data[key];
    
    if (value instanceof Date) {
      converted[key] = Timestamp.fromDate(value);
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      converted[key] = convertDateToTimestamp(value);
    } else {
      converted[key] = value;
    }
  }
  
  return converted;
}

/**
 * Helper to get document with ID included
 */
export function getDocWithId(doc: QueryDocumentSnapshot<DocumentData>) {
  return {
    id: doc.id,
    ...convertTimestampToDate(doc.data()),
  };
}

/**
 * Generic CRUD helpers
 */

export async function createDocument(collection: string, data: any) {
  const docData = {
    ...convertDateToTimestamp(data),
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };
  
  const docRef = await db.collection(collection).add(docData);
  const doc = await docRef.get();
  return getDocWithId(doc as QueryDocumentSnapshot<DocumentData>);
}

export async function getDocumentById(collection: string, id: string) {
  const doc = await db.collection(collection).doc(id).get();
  
  if (!doc.exists) {
    return null;
  }
  
  return getDocWithId(doc as QueryDocumentSnapshot<DocumentData>);
}

export async function updateDocument(collection: string, id: string, data: any) {
  const updateData = {
    ...convertDateToTimestamp(data),
    updatedAt: FieldValue.serverTimestamp(),
  };
  
  await db.collection(collection).doc(id).update(updateData);
  return getDocumentById(collection, id);
}

export async function deleteDocument(collection: string, id: string) {
  await db.collection(collection).doc(id).delete();
}

export async function getAllDocuments(collection: string) {
  const snapshot = await db.collection(collection).get();
  return snapshot.docs.map(getDocWithId);
}

export async function queryDocuments(
  collection: string,
  field: string,
  operator: FirebaseFirestore.WhereFilterOp,
  value: any
) {
  const snapshot = await db.collection(collection).where(field, operator, value).get();
  return snapshot.docs.map(getDocWithId);
}

/**
 * Find unique document (like findUnique in Prisma)
 */
export async function findUniqueDocument(
  collection: string,
  field: string,
  value: any
) {
  const snapshot = await db.collection(collection).where(field, '==', value).limit(1).get();
  
  if (snapshot.empty) {
    return null;
  }
  
  return getDocWithId(snapshot.docs[0]);
}

/**
 * Check if document exists with specific field value
 */
export async function documentExists(
  collection: string,
  field: string,
  value: any
): Promise<boolean> {
  const snapshot = await db.collection(collection).where(field, '==', value).limit(1).get();
  return !snapshot.empty;
}

/**
 * Transaction support
 */
export async function runTransaction<T>(
  updateFunction: (transaction: FirebaseFirestore.Transaction) => Promise<T>
): Promise<T> {
  return db.runTransaction(updateFunction);
}
