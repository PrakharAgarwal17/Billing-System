import { createClient } from 'redis';
const client = createClient({
    username: 'default',
    password: 'LkAYaKnLd5zBqTFzV9AJHyLJ0124mYZy',
    socket: {
        host: 'redis-11382.c114.us-east-1-4.ec2.cloud.redislabs.com',
        port: 11382
    }
});
client.on('error', err => console.log('Redis Client Error', err));
await client.connect();
//# sourceMappingURL=redis.js.map