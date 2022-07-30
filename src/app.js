require("dotenv").config();
require("./strategies/discordstrategy");
const fastify = require("fastify")({ logger: true });
const session = require("@fastify/session");
const passport = require("fastify-passport");
const path = require("path");

// Mongodb connection
require("./database/database");

// Fastify Plugings
fastify.register(require("point-of-view"), {
  engine: {
    ejs: require("ejs"),
  },
});
fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
});

fastify.register(require("fastify-cookie"));
fastify.register(session, {
  cookieName: "discord.oauth",
  secret: "a secret with minimum length of 32 characters",
  cookie: { secure: false },
  saveUninitialized: false,
  maxAge: 60000 * 60 * 24,
});

// Passport
fastify.register(passport.initialize());
fastify.register(passport.secureSession());

// Middleware Routes
fastify.register(require("./routes/auth"), { prefix: "/auth" });
fastify.register(require("./routes/dashboard"), { prefix: "/dashboard" });

fastify.get("/", { preValidation: isAuthorized }, (req, rep) => {
  rep.view("/src/views/home.ejs", {
    users: [
      { name: "John Doe", email: "johndoe@example.email" },
      { name: "Katherin James", email: "katherinxoxo@teste.email" },
      { name: "Carlos Gutierrez", email: "gutierrez@gmail.com" },
      { name: "Jhony Arson", email: "contact@arsondeveloper.xyz" },
      { name: "Kaleb Reyes", email: "tupapi@uwuw.test" },
      { name: "Juan Carlos", email: "jauncarlos@dev.tech" },
    ],
  });
});

// Verifi if user is authenticated
function isAuthorized(req, rep, next) {
  if (req.user) {
    console.log("User is authorized");
    rep.redirect("/dashboard");
  } else {
    console.log("User is not authorized");
    next();
  }
}

// Start the server
const start = async () => {
  await fastify.listen({ host: "::", port: process.env.PORT || 5000 })
  fastify.log.info(`server listening on ${fastify.server.address().port}`);
};

start();
