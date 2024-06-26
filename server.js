const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
//const path = require("path");
const db = require("./config/db");
const { checkToken } = require("./auth/token_validation");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const jwtKey = require("./config/jwt-key");


const app = express();


const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));



var randomize = function (base) {
    var d, returnValue, r;

    d = new Date().getTime();
    returnValue = base.replace(/[xy]/g, function (c) {
        r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);

        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });

    return returnValue;
};
/*
* Creates a unique user id
* @method uuid
* @return {String} uuid A unique string in a uuid format
*/
var uuid = function uuid() {
    return randomize('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx');
};



app.use(bodyParser.json());


//START CREATE USER
const create = (data, callback) => {
    db.query(
        `insert into user(email,level,password,theme)
                      values(?,?,?,?)`,
        [data.email, data.level, data.password, data.theme],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

app.post("/newUser", (req, res) => {
    const body = req.body;

    console.log("JSON.stringify(req.body): " + JSON.stringify(req.body));


    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                message: "There was 500 error: " + err,
            });
        }
        return res.status(200).json({
            success: 1,
            data: results,
        });
    });
});

//END CREATE USER


const getUserByUserEmail = (email, callback) => {
    db.query(
        `SELECT * FROM user WHERE email = ?`,
        [email],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            console.log("JSON.stringify(results[0]): " + JSON.stringify(results[0]));
            return callback(null, results[0]);



        }
    )
}

app.post("/login", (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
        if (err) {
            console.log(err);
            if (err === "ECONNRESET") {
                console.log("WAKE UP CONNECTION! " + err);
            }
        }
        if (!results) {
            return res.json({
                success: 0,
                data: "Invalid email or password NO RESULTS: " + body.email,
            })
        }
        const result = compareSync(body.password, results.password);
        if (result) {
            results.password = undefined;
            const jsontoken = sign(
                {
                    results: results
                },
                jwtKey,
                {
                    expiresIn: "1h",
                }
            );

            if (jsontoken) {
                //  saveToken(jsontoken, body.email);
                // let sql = `UPDATE user SET token = '${jsontoken}' WHERE email = "${body.email}"`;
                let query = db.query(
                    `UPDATE user SET token = ? WHERE email = ?`,
                    [jsontoken, body.email],
                    (err, result) => {
                        if (err) {
                            console.log("There was an error on the server side: " + err);
                        } else {
                            console.log("That worked. here is the token result: " + JSON.stringify(result));
                        }
                    });
                console.log("trying to fire saved token.");
            }

            return res.json({
                success: 1,
                message: "Login Successful",
                token: jsontoken,
                results
            })
        } else {
            return res.json({
                success: 0,
                data: "Invalid email or password COMPARISON FAIL."
            });
        }
    });
});

//START LOGOUT

app.put("/logout-uuid", checkToken, (req, res) => {
    //let serverLogOut = req.body.uuid.replace(/[&\/\\#,+()$~%'"*|?<>{}“]/g, '') + ":" + uuid();
    // let sql = `UPDATE user SET token = '${serverLogOut}' WHERE email = "${req.body.email.replace(/[&\/\\#,+()$~%'"*|?<>{}“]/g, '')}"`;
    let query = db.query(
        `UPDATE user SET token = ? WHERE email = ?`,
        [req.body.uuid + uuid(), req.body.email],
        (err, result) => {
            if (err) {
                res.send("Setting logout token failed. " + err);
            } else {

                res.send(result);

            }
        })
});


//START DELETE USER
app.delete("/delete-user/:email", checkToken, (req, res) => {
    //let sql = "DELETE FROM user WHERE email = '" + req.params.email.replace(/[&\/\\#,+()$~%'"*|?<>{}“]/g, '') + "'";
    let query = db.query(
        "DELETE FROM user WHERE email = ?",
        [req.params.email],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                res.send(req.params);
            }
        })
});


//START EDIT LEVEL 
app.put("/edit-level", checkToken, (req, res) => {
    //let sql = `UPDATE user SET level = '${req.body.level.replace(/[&\/\\#,+()$~%'"*|?<>{}“]/g, '')} WHERE email = "${req.body.email.replace(/[&\/\\#,+()$~%'"*|?<>{}“]/g, '')}"`;
    let query = db.query(
        `UPDATE user SET level = ?  WHERE email = ?`,
        [req.body.level, req.body.email],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                res.send(result);
            }
        });
});

//START GET LEVEL
app.get("/level/:email", checkToken, (req, res) => {
    // let sql = `SELECT level FROM user WHERE email = '${req.params.email.replace(/[&\/\\#,+()$~%'"*|?<>{}“]/g, '')}'`;
    let query = db.query(
        `SELECT level FROM user WHERE email = ?`,
        [req.params.email],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(results);
            }
        });
});

//START REFRESH
app.get("/check-token/:email", checkToken, (req, res) => {
    //let sql = `SELECT token FROM user WHERE email = '${req.params.email.replace(/[&\/\\#,+()$~%'"*|?<>{}“]/g, '')}'`;
    let query = db.query(
        `SELECT token FROM user WHERE email = ?`,
        [req.params.email],
        (err, results) => {
            if (err) {
                console.log("check for token: " + err);
            } else {
                res.send(results);
            }
        });
});

//START CHANGE PASSWORD

app.put("/change-password", checkToken, (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    //let sql = `UPDATE user SET password = '${body.password}' WHERE email = '${body.email.replace(/[&\/\\#,+()$~%'"*|?<>{}“]/g, '')}'`;
    let query = db.query(
        `UPDATE user SET password = ? WHERE email = ?`,
        [body.password, body.email],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                res.send(result);
            }
        })

});
//USER EDIT THEME START

app.put("/edit-theme", checkToken, (req, res) => {
    // let sql = `UPDATE user SET theme = '${req.body.theme.replace(/[&\/\\#,+()$~%'"*|?<>{}“]/g, '')}' WHERE email = "${req.body.email.replace(/[&\/\\#,+()$~%'"*|?<>{}“]/g, '')}"`;
    let query = db.query(
        `UPDATE user SET theme = ? WHERE email = ?`,
        [req.body.theme, req.body.email],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                res.send(result);
            }
        });
});

//USER EDIT THEME END

//START GET THEME
app.get("/theme/:email", checkToken, (req, res) => {
    // let sql = `SELECT theme FROM user WHERE email = '${req.params.email.replace(/[&\/\\#,+()$~%'"*|?<>{}“]/g, '')}'`;
    let query = db.query(
        `SELECT theme FROM user WHERE email = ?`,
        [req.params.email], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.json(results);
            }
        });
});

//END GET THEME




/*

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));

    });
}*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`You fired up PORT ${PORT} successfully.`));
