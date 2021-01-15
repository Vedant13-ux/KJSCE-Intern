function chat(io){
    console.log('socket started')
    // io.on('connection', (socket) => {
    //     console.log('new client connected');
    //     socket.emit('connection', null);
    //     socket.on('channel-join', id => {
    //         console.log('channel join', id);
    //         return id;
    //     });
    //     socket.on('send-message', message => {
    //         io.emit('message', message);
    //     });

    //     socket.on('disconnect', () => {
    //     });

    // });
}
module.exports =chat

// let array=[]
//     req.body.list.forEach((e)=>{
//         try{
//             db.Message.findById(e).populate({path:'author',select:"fname lname email photo"})
//                 .then((data) => {
//                     array.push(data)
//                 }).catch((err) => {
//                     next(err);
//                 });
//         }
//         catch(err){
//             next(err);
//         }
//     })
//     res.status(200).send({list:array});