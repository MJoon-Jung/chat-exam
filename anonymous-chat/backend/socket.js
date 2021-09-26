const SocketIO = require('socket.io')

module.exports = (server, app) => {
    const io = SocketIO(server, {
        cors: {
            origin: "http://localhost:3060",
            credentials: true
        }
    });
    app.set('io', io);

    io.of('/').on('connection', (socket) => {
        console.log('chat 네임스페이스에 접속');
        socket.on('joinRoom', (rooms) => { 
            console.log(rooms);
            rooms.map((room) => {
                socket.join(room);
                console.log(`${room}room에 입장하셨습니다.`);
                io.of('/').to(room).emit('joined', '누군가 들어왔음');
            })
        })
        socket.on('disconnect', () => {
            console.log('chat 네임스페이스 접속 해제');
        });
    });
};