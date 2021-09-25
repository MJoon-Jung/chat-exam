const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Room = require('../models/room');
const Chat = require('../models/chat');

const router = express.Router();

try {
    fs.readdirSync('uploads');
}catch(err) {
    console.error('uploads 풀더가 없어 uploads 풀더를 생성합니다.');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext); // path.basename(file.originalname, ext ( 확장자 제거 ));
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.get('/', async (req, res, next) => {
    try {
        const rooms = await Room.findAll();
        res.json(rooms);
    }catch (error) {    
        console.error(error);
        next(error);
    }
});

router.get('/room/:id/chats', async(req, res, next) => {
    try{
        const room = await Room.findByPk(req.params.id );
        const io = req.app.get('io');
        if(!room) {
            res.status(404).send('존재하지 않는 채팅방입니다.')
        }
        const chats = await Chat.findAll({ where: { roomId: room.id }, order: ['createdAt'] });

        return res.status(200).send(chats);
    }catch(error) {
        console.error(error);
        next(error);
    }
});

router.post('/room', async (req, res, next) => {
    try{ 
        const newRoom = await Room.create({
            name: req.body.name,
        });
        res.json(newRoom);
    }catch(error) {
        console.error(error);
        next(error);
    }
});

router.post('/room/:id/chat', async(req, res, next) => {
    try{
        const chat = await Chat.create({
            roomId: req.params.id,
            user: req.session.color,
            content: req.body.content,
        });
        req.app.get('io').of('/').to(req.params.id).emit('chat', chat);
        res.send('ok');
    }catch(error) {
        console.error(error);
        next(error);
    }
});

router.post('/room/:id/image', upload.single('image'), async(req, res ,next) => {
    console.log(req.file);
    try{
        const chat = await Chat.create({
            user: req.session.color,
            roomId: req.params.id,
            image: req.file.filename,
        });
        req.app.get('io').of('/chat').to(req.parames.id).emit('chat', chat);
        res.send('ok');
    }catch(error) {
        console.error('error');
        next(error);
    }
})
router.delete('/room/:id', async(req, res , next) => {
    try {
        await Room.delete({ id: req.params.id });
        await Chat.delete({ roomId: req.params.id });
        req.app.get('io').of('/room').emit('removeRoom', req.params.id );
        res.send('ok');
    }catch(error) {
        console.error(error);
        next(error);
    }
});


module.exports = router;