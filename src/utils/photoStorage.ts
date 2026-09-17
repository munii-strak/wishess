// IndexedDB storage manager for high-resolution user photos
const DB_NAME = 'chotoo_birthday_db';
const STORE_NAME = 'photos_store';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function savePhotoToStorage(id: string, dataUrl: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(dataUrl, id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    // Fallback to localStorage if IndexedDB fails
    try {
      localStorage.setItem(`chotoo_photo_${id}`, dataUrl);
    } catch (e) {
      console.warn('Storage quota exceeded:', e);
    }
  }
}

export async function getPhotoFromStorage(id: string): Promise<string | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => resolve(null);
    });
  } catch {
    return localStorage.getItem(`chotoo_photo_${id}`);
  }
}

export async function getAllStoredPhotos(): Promise<Record<string, string>> {
  const result: Record<string, string> = {};
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const cursorReq = store.openCursor();
      cursorReq.onsuccess = (e) => {
        const cursor = (e.target as IDBRequest).result as IDBCursorWithValue;
        if (cursor) {
          result[cursor.key as string] = cursor.value;
          cursor.continue();
        } else {
          resolve(result);
        }
      };
      cursorReq.onerror = () => resolve(result);
    });
  } catch {
    ['photo-1', 'photo-2', 'photo-3', 'photo-4'].forEach((id) => {
      const val = localStorage.getItem(`chotoo_photo_${id}`);
      if (val) result[id] = val;
    });
    return result;
  }
}

export async function clearStoredPhotos(): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).clear();
  } catch {
    ['photo-1', 'photo-2', 'photo-3', 'photo-4'].forEach((id) => {
      localStorage.removeItem(`chotoo_photo_${id}`);
    });
  }
}
