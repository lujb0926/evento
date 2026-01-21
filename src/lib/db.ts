import mongoose from "mongoose";

interface ICache {
  connection: any | null,
  promise: Promise<any> | null
}

if (!process.env.MONGODB_URI) {
  throw new Error('No MONGODB_URI env variable')
}

const cache: ICache = {
  connection: null,
  promise: null
}

export default async function DBconnect () {
  if (cache.connection) return cache.connection;
  if (!cache.promise) cache.promise = mongoose.connect(process.env.MONGODB_URI!)
  try {
    cache.connection = await cache.promise
  } catch (error) {
    cache.promise = null
  }
  return cache.connection;
}