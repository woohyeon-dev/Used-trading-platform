const express = require('express');
const { Board, User } = require('../models/index');
const { Op } = require('sequelize');

const router = express.Router();

// 자유게시판 게시물 DB 정보
router.get('/', async (req, res, next) => {
  try {
    const boards = await Board.findAll({
      attributes: {
        exclude: ['writer'],
      },
      include: [
        {
          model: User,
          attributes: ['nickname'],
        },
      ],
      order: [['post_id', 'desc']],
    });
    const result = [];
    for (const b of boards) {
      result.push({
        post_id: b.post_id,
        content: b.content,
        regdate: b.regdate,
        title: b.title,
        views: b.views,
        recommends: b.recommends,
        nickname: b.User.nickname,
      });
    }
    return res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/search', async (req, res) => {
  try {
    const query = req.query.query;
    const result = await Board.findAll({
      where: {
        title: {
          [Op.like]: '%' + query + '%',
        },
      },
      order: [['post_id', 'desc']],
    });
    return res.json(result);
  } catch (err) {
    console.error(err);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    if (req.user) {
      await Board.create({
        title: req.body.title,
        content: req.body.content,
        writer: req.user,
      });
      return res.status(201).json({ msg: '게시글이 등록되었습니다.' });
    } else {
      return res.json({ msg: '로그인 후 이용해 주세요' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
