const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');
const { sequelize } = require('./models');
const passportConfig = require('./passport');

// dotenv 실행
// dotenv를 통해 SECRET KEY를 받는 코드보다 위에 위치해야한다.
dotenv.config();

const homeRouter = require('./routes/home');
const boardRouter = require('./routes/board');
const marketRouter = require('./routes/market');
const authRouter = require('./routes/auth');
const groupRouter = require('./routes/group');
const semesterRouter = require('./routes/semester');

const app = express();
app.set('port', process.env.PORT || 5001); // 포트 설정

app.use('/img', express.static('public'));

// 이 코드 발견 시 시퀄라이즈 실행
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('DB서버에 접속 완료');
  })
  .catch(err => {
    console.error(err);
  });

passportConfig();

// middleware
app.use(morgan('dev')); // 개발모드로 로깅

// 클라이언트에서 보내준 데이터를 json으로 파싱해서 req.body에 데이터를 넣어주는 역할
app.use(express.json({ limit: '10mb' }));

// extended 객체 안에 객체를 파싱할 수 있게 하려면 true
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: 'http://localhost:3000', // 단 아래 속성 true일 경우는 주소로 적어야한다.(보안강화)
    credentials: true, // front, back 간 쿠키 공유
  })
);

// cookieParser 설정에 비밀키를 넣어주자.
// cookieParser를 사용하게되면 req.cookies로 접근이 가능하다.
app.use(cookieParser(process.env.COOKIE_SECRET));

// session 설정
app.use(
  session({
    resave: false, // false 고정
    saveUninitialized: false, // false 고정
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true, // 항상 true(자바스크립트로 진입 불가 - XXS 공격 방지)
      secure: false,
      maxAge: 1000 * 60 * 60 * 4, // 유효기간 4시간
    },
    // name의 기본값 - connect_sid
  })
);
//! express-session에 의존하므로 뒤에 위치해야 함
app.use(passport.initialize()); // 요청 객체에 passport 설정을 심음
app.use(passport.session()); // req.session 객체에 passport정보를 추가 저장
// passport.session()이 실행되면, 세션쿠키 정보를 바탕으로 해서 passport/index.js의 deserializeUser()가 실행하게 한다

// router
app.use('/', homeRouter);
app.use('/board', boardRouter);
app.use('/market', marketRouter);
app.use('/auth', authRouter);
app.use('/group', groupRouter);
app.use('/semester', semesterRouter);

// 404 error middleware
app.use((req, res, next) => {
  console.log('404 에러');
  res.status(404).send('Not Found');
});

// error middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send('서버에서 에러가 발생했습니다.');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
