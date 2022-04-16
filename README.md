## Discord Oauth with Fastify and Mongodb

<br />

a discord logging system made with fastify.

if you find a bug or a way to improve it you can fork it

<br />

## Set Up

first rename the `.env.example` file to `.env`

then complete the env as requested

```js

    PORT= // port where the server will run
    CLIENT_ID= // your discord bot client id can be obtained at https://discord.com/developers/applications
    CLIENT_SECRET= // the client secret of your discord bot can be obtained at https://discord.com/developers/applications
    CLIENT_REDIRECT=/auth/redirect // where it was redirected after logging in with your discord account
    MONGO_URI= // mongo uri https://www.mongodb.com

```
