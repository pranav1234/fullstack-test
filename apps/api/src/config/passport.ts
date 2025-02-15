import passport from "koa-passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1);

        if (!user.length) {
          return done(null, false, { message: "User not found" });
        }

        const isValid = await bcrypt.compare(password, user[0].password);
        if (!isValid) {
          return done(null, false, { message: "Invalid password" });
        }

        return done(null, user[0]);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// JWT Strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await db
          .select()
          .from(users)
          .where(eq(users.id, payload.id))
          .limit(1);

        if (!user.length) {
          return done(null, false);
        }

        return done(null, user[0]);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
