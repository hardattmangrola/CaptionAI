from datetime import datetime, timedelta

class SimpleCache:
    def __init__(self, ttl_seconds: int = 3600):
        self.cache = {}
        self.ttl = ttl_seconds

    def get(self, key: str):
        if key in self.cache:
            data, timestamp = self.cache[key]
            if datetime.now() - timestamp < timedelta(seconds=self.ttl):
                return data
            else:
                del self.cache[key]
        return None

    def set(self, key: str, value: any):
        self.cache[key] = (value, datetime.now())

# Global instance
cache = SimpleCache()
