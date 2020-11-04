
const { io } = require('../index');

    io.on('connection', client => {
    console.log('Cliente conectado')
    
    client.on('disconnect', () => { 
        console.log('Cliente desconectado')
    });

    client.on('mensaje1', (payload) => {

        //console.log('Mensaje!!!', payload);
        console.log('Mensaje!!!', payload);

        io.emit('mensaje1', {admin : 'nuevo mensaje'});

    });

  });