import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


export const putDb = async (content) => {
  try {
    const db = await openDB('jate', 1);

    const transaction = db.transaction('jate', 'readwrite');

    const store = transaction.objectStore('jate');
    
    const contentWithoutId = { ...content };

    delete contentWithoutId.id;

    await store.put(contentWithoutId);
    console.log('Content added to database:', contentWithoutId);

  } catch (error) {
    console.error('Error putting content in database:', error);
  }
};    


export const getDb = async () => {

  const contactDb = await openDB('jate', 1);

  const tx = contactdb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);

  return result.map((obj) => obj.value).join('');
  
};

initdb();
