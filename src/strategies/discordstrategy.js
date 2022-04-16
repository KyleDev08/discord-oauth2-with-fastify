const DiscordStrategy = require("passport-discord").Strategy;
const passport = require("fastify-passport");
const DiscordUser = require("../models/DiscordUser");

passport.registerUserSerializer(async (user, request) => {
  console.log("serializing user");
  return user.id;
});

passport.registerUserDeserializer(async (id, request) => {
  console.log("Deserializing");
  let user = await DiscordUser.findById(id);
  return user;
});

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CLIENT_REDIRECT,
      scope: ["identify", "guilds"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await DiscordUser.findOne({ discordId: profile.id });
        if (user) {
          console.log("User exists.");
          await user.updateOne({
            username: `${profile.username}#${profile.discriminator}`,
            guilds: profile.guilds,
          });
          done(null, user);
        } else {
          console.log("User does not exist");
          const newUser = await DiscordUser.create({
            discordId: profile.id,
            username: profile.username,
            guilds: profile.guilds,
          });
          const savedUser = await newUser.save();
          done(null, savedUser);
        }
      } catch (err) {
        console.log(err);
        done(err, null);
      }
    }
  )
);
