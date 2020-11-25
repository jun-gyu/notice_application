import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import config from "./config/index";
import bodyParser from "body-parser";
import usersRouter from "./router/users";

import redis from "redis";
import connectRedis from "connect-redis";

const redisClient = redis.createClient({
  url: `redis://${config.REDIS_HOST}${config.REDIS_PORT}`,
  password: config.REDIS_PASSWORD,
});

let RedisStore = connectRedis(session);

const app = express();
// middel_ware
app.use(
  session({
    resave: false, // 클라이언트에서 들어온 세션에 변경사항이 없어도 다시 저장할 거냐
    saveUninitialized: false, //세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지
    secret: `${config.SESSION_SECRET}`,
    cookie: {
      httpOnly: true,
      secure: false, //https 가 아닌 환경에서도 사용가능하게 함.
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: new RedisStore({ client: redisClient, logErrors: true }),
  })
);
/*위 상태로는 메모리에 저장이되지만 서버를 껐다키면 초기화되어 내역이 사라짐.
 * store에 데이터베이스를 연결하여 사용하는것이 이로움
 */

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//모든요청에 실행되는 미들웨어
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`모든 요청에 다 실행된다 우아앙`);
  next(); //여기서res.send를 하게되면 err에있는 send가 작동되지않는다.
});

// 모든 에러가 이쪽으로 들어옴
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.get("/", (req: Request, res: Response) => {
  console.log(req.session);
  res.send(`hello hansome jungyu`);
});

//router
app.use("/users", usersRouter);

// server listen
app.listen(config.port, function () {
  console.log(`💈 server running ${config.port} port 💈`);
});
