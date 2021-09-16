import mongoose from 'mongoose';
import { config } from '../config';

/*
 * Mongoose DB Connection
 * */
const mongoDB: any = config.mongoDB;
// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const connectionString = `mongodb://${mongoDB.host}:${mongoDB.port}/${mongoDB.dbName}`;

class ConnectMongoose {
    public async connection() {
        await mongoose
            .connect(connectionString,{ useUnifiedTopology: true,useNewUrlParser: true ,authSource: 'admin', user: mongoDB.user,
                pass: mongoDB.pass})
            .then(() => {
                console.log('*** Mongoose Server Connection Success ***');
            })
            .catch((err) => {
                console.error('!!! Mongoose Server Connection catch Failed !!! %j', err);
                setTimeout(() => this.connection(), 10000);
            });
    }
}
export const connectMongoose: ConnectMongoose = new ConnectMongoose();

/* DB Status */
const dbConnection = mongoose.connection;
dbConnection.on('error', function (err) {
    console.error('!!!@@@ Mongoose Server Connection on ERROR @@@!!! %j ', err);
});
dbConnection.once('open', function callback() {
    console.log('@@@ Mongoose Server Connection on OPEN @@@');
});

dbConnection.on('connected', function () {
    console.log('@@@ Mongoose Server Connection ON CONNECTED @@@');
});

dbConnection.on('disconnected', function () {
    console.error('!!!@@@ Mongoose Server Connection on disconnected @@@!!! ');
});

process.on('SIGINT', function () {
    dbConnection.close(function () {
        console.error('!!!!!! Terminated Application nodejs and mongoose disconnected  !!!!!! ');
        process.exit(0);
    });
});
