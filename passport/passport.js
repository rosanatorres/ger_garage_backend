/*a callback is an asynchronous equivalent for a function that is called after a given task is completed. 
Alternatively, it can be defined as a function that is passed into another function so 
that the latter can call it at the completion of a given task. 
It allows other programs to keep running, thereby preventing blocking */
const passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    User = require("../models/registered_users");
passportJWT = require("passport-jwt");

let Users = User,
    JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt;

passport.use(
    new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
        },
        (username, password, callback) => {
            console.log(username + "  " + password);
            Users.findOne({ username: username }, (error, user) => {
                if (error) {
                    console.log(error);
                    return callback(error);
                }

                console.log("User From Server :", user);
                if (!user) {
                    console.log("incorrect username");
                    return callback(null, false, {
                        message: "Incorrect username or password.",
                    });
                }

                if (!user.validatePassword(password)) {
                    console.log("incorrect password");
                    return callback(null, false, { message: "Incorrect password" });
                }

                console.log("finished");
                return callback(null, user);
            });
        }
    )
);

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: "your_jwt_secret",
        },
        (jwtPayload, callback) => {
            console.log("JWT Payload : ", jwtPayload);
            return Users.findById(jwtPayload.id)
                .then((user) => {
                    console.log("JWT User : ", user);
                    return callback(null, user);
                })
                .catch((error) => {
                    console.log("JWT Error : ", error);
                    return callback(error);
                });
        }
    )
);
/*payloads / cargas uteis: the metadata of the payloads are to be attached on the HTTP header. */