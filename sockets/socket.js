const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band( 'Queen' ) );
bands.addBand( new Band( 'Bon Jovi' ) );
bands.addBand( new Band( 'Héroes del Silencio' ) );
bands.addBand( new Band( 'Metallica' ) );

console.log(bands);

    io.on('connection', client => {
    console.log('Cliente conectado')
    
    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => { 
        console.log('Cliente desconectado')
    });

    client.on('mensaje1', (payload) => {
        //console.log('Mensaje!!!', payload);
        console.log('Mensaje!!!', payload);
        io.emit('mensaje1', {admin : 'nuevo mensaje'});
    });

    /*
    client.on('emitir-mensaje', ( payload ) => {
        io.emit('nuevo-mensaje', payload );
        console.log('Desde Celu!!!', payload);
        //client.broadcast.emit('nuevo-mensaje', payload );
    });
    */

    client.on('add-band', ( payload ) => {
        //console.log( payload );
        const strBandName =  (payload.name != null) ? payload.name : '';
        console.log('antes de ejecutar add-band');
        if ( strBandName.length > 0 )
        {
            bands.addBand(new Band(payload.name));
            io.emit('active-bands', bands.getBands());
        }
        console.log('despues de ejecutar add-band');
        //client.broadcast.emit('nuevo-mensaje', payload );
    });


    
    client.on('delete-band', ( payload ) => {
        //console.log( payload );
        bands.deleteBand( payload.id );
        io.emit('active-bands', bands.getBands());
        //client.broadcast.emit('nuevo-mensaje', payload );
    });


    client.on('vote-band', ( payload ) => {
        //console.log( payload );
        bands.voteBand( payload.id );
        io.emit('active-bands', bands.getBands());
        //client.broadcast.emit('nuevo-mensaje', payload );
    });

  });