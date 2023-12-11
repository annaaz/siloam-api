// cache.ts
import NodeCache from 'node-cache'

const cache = new NodeCache()

export const getDataWithCaching = async (key: string, fetchDataCallback: () => Promise<any>) => {
    const cachedData = cache.get(key)

    if (cachedData) {
        console.log('Data fetched from cache')
        return cachedData
    }

    const freshData = await fetchDataCallback()
    cache.set(key, freshData, 300) // Cache data for 300 seconds (adjust as needed)
    console.log('Data fetched from the database and cached')
    return freshData
}
