import { createClient } from 'redis';
const client = createClient({
    username: 'default',
    password: 'ok',
    socket: {
        host: process.env.REDIS_HOST,
        port: 11382
    }
});
client.on('error', err => console.log('Redis Client Error', err));
await client.connect();
//# sourceMappingURL=redis.js.map