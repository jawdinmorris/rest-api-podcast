const {getDatabase} = require('./mongo');
const {ObjectID} = require('mongodb');

const collectionName = 'podcasts';

//Rename to CRUD
async function insertPodcast(podcast) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(podcast);
  return insertedId;
}

async function getPodcasts() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

async function deletePodcast(id) {
    const database = await getDatabase();
    await database.collection(collectionName).deleteOne({
        _id: new ObjectID(id),
    });
}

async function updatePodcast(id, podcast) {
    const database = await getDatabase();
    delete podcast._id;
    await database.collection(collectionName).update(
      { _id: new ObjectID(id), },
      {
        $set: {
          ...podcast,
        },
      },
    );
  }

module.exports = {
  insertPodcast,
  getPodcasts,
  deletePodcast,
  updatePodcast,
};