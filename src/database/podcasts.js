const {getDatabase} = require('./mongo');

const collectionName = 'podcasts';

async function insertPodcast(podcast) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(podcast);
  return insertedId;
}

async function getPodcasts() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

module.exports = {
  insertPodcast,
  getPodcasts,
};