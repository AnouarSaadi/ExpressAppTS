
import debug from 'debug';
import mongoose from 'mongoose';

const log: debug.IDebugger = debug('app:mongoose-service');

export class MongooseService {

    private static mongoose: MongooseService;

    private count = 0;

    private mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        useFindAndModify: false
    }

    constructor() {
        this.connectWithRetry();
    }

    public static getInstance(): MongooseService {
        if (!MongooseService.mongoose) {
            MongooseService.mongoose = new MongooseService();
        }
        return MongooseService.mongoose;
    }

    private connectWithRetry(): void {
        log('Attempting MongoDB connection (will retry if needed)');
        mongoose.connect('mongodb://localhost:27017/', this.mongooseOptions)
            .then(() => {
                log('MongoDB is connected');
            })
            .catch((err) => {
                const retrySeconds = 5;
                log(
                    `MongoDB connection unsuccessful (will retry #${++this
                        .count} after ${retrySeconds} seconds):`,
                    err
                );
                setTimeout(this.connectWithRetry, retrySeconds * 1000);
            })

    }

}
