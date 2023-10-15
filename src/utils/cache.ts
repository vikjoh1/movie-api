interface CacheItem {
  data: any
  expiry: number
}

const CACHE_LIFETIME = 10 * 60 * 1000

class MyCache {
  private myCache: { [key: string]: CacheItem } = {}

  get(key: string): CacheItem | null {
    const item = this.myCache[key]
    if (item && Date.now() < item.expiry) {
      return item.data
    }
    delete this.myCache[key]
    return null
  }

  set(key: string, data: any): void {
    if (!key || !data) {
      throw new Error('Key and data must be provided')
    }
    this.myCache[key] = {
      data,
      expiry: Date.now() + CACHE_LIFETIME,
    }
  } 
}