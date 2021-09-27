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
        const id = parseInt(req.params.id, 10);
        const room = await Room.findByPk(id);
        if(!room) {
            res.status(404).send('존재하지 않는 채팅방입니다.')
        }
        const chats = await Chat.findAll({ where: { roomId: room.id }, order: ['createdAt'] });

        return res.status(200).json({ id, chats });
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
        const id = parseInt(req.params.id, 10);
        const chat = await Chat.create({
            roomId: id,
            user: req.session.color,
            content: req.body.content,
        });
        req.app.get('io').of('/').to(id).emit('chat', { id, chat });
        res.send('ok');
    }catch(error) {
        console.error(error);
        next(error);
    }
});

router.post('/room/:id/image', upload.single('image'), async(req, res ,next) => {
    console.log(req.file);
    try{
        const id = parseInt(req.params.id, 10);
        const chat = await Chat.create({
            user: req.session.color,
            roomId: id,
            image: req.file.filename,
        });
        req.app.get('io').of('/chat').to(id).emit('chat', chat);
        res.send('ok');
    }catch(error) {
        console.error('error');
        next(error);
    }
})
router.delete('/room/:id', async(req, res , next) => {
    try {
        const id = parseInt(req.params.id, 10);
        await Room.delete({ id, });
        await Chat.delete({ roomId: id });
        req.app.get('io').of('/room').emit('removeRoom', id );
        res.send('ok');
    }catch(error) {
        console.error(error);
        next(error);
    }
});


module.exports = router;
