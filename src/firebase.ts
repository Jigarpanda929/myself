import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp, collection, addDoc, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Collection Reference
const messagesRef = collection(db, 'messages');

export async function saveMessage(name: string, email: string, message: string) {
  try {
    const docRef = await addDoc(messagesRef, {
      name,
      email,
      message,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving message:", error);
    throw error;
  }
}

export function subscribeToMessages(callback: (messages: any[]) => void) {
  const q = query(messagesRef, orderBy('createdAt', 'desc'), limit(50));
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: (doc.data().createdAt as any)?.toDate?.() || new Date()
    }));
    callback(messages);
  });
}
