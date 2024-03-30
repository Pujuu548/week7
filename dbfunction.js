const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'student_tasks';

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDb() {
  await client.connect();
  console.log('Connected to MongoDB');
}

async function getDb() {
  await client.connect();
  return client.db(dbName);
}

async function getAllCourses() {
  const db = await getDb();
  return db.collection('courses').find().toArray();
}

async function getTasksByCourse(courseId) {
  const db = await getDb();
  return db.collection('tasks').find({ courseId }).toArray();
}

module.exports = {
  connectToDb,
  getAllCourses,
  getTasksByCourse,
};