import redis from "redis";
import config from "../config/index";
const client = redis.createClient(Number(config.REDIS_PORT));

export default class Redis {
  redisGet(userEmail: string) {
    try {
      return client.GET(userEmail, (err, data) => {
        if (err) throw err;
        if (data !== null) {
          return true;
        } else {
          return false;
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  redisSetex(userEmail: string, userId: string): any {
    try {
      return client.SETEX(userEmail, 15, userId, (err, data) => {
        if (err) throw err;
        return data;
      });
    } catch (err) {
      console.log(err);
    }
  }
}
