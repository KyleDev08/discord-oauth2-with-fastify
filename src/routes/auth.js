const passport = require("fastify-passport");

module.exports = function (fastify, opts, done) {
  fastify.get(
    "/",
    { preValidation: passport.authenticate("discord") },
    async (req, rep) => {}
  );

  fastify.get(
    "/redirect",
    {
      preValidation: passport.authenticate("discord", {
        failureRedirect: "/forbidden",
        successRedirect: "/dashboard",
      }),
    },
    async (req, rep) => {}
  );

  fastify.get("/logout", async (req, rep) => {
    if(req.user) {
      req.logout();
      rep.redirect("/");
    } else {
      rep.redirect("/");
    }
  })

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

  done();
};
