module.exports = function (fastify, opts, done) {
  function isAuthorized(req, rep, next) {
    if (req.user) {
      console.log("User is authorized");
      console.log(req.user);
      next();
    } else {
      console.log("User is not authorized");
      rep.redirect("/");
    }
  }

  fastify.get(
    "/",
    {
      preValidation: isAuthorized,
    },
    async (req, rep) => {
      rep.view("/src/views/dashboard.ejs", {
        username: req.user.username,
        discordId: req.user.discordId,
        guilds: req.user.guilds,
      });
    }
  );

  fastify.get(
    "/settings",
    {
      preValidation: isAuthorized,
    },
    async (req, rep) => {
      rep.code(200).send("OK");
    }
  );

  done();
};
