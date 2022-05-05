const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');
const multer = require('multer');
const uuid = require('uuid').v4;
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const bcrypt = require('bcrypt');
const port = 3000;
const oneDay = 1000 * 60 * 60 * 24;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.fieldname === "album_artwork") {
            cb(null, './public/uploads/art/');
        } else {
            cb(null, './public/uploads/tracks/');
        }
        
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        cb(null, `${uuid()}-${originalname}`);
    }
});
const upload = multer({ storage });

const app = express();

app.use(sessions({
    secret: "drgljdfov8e7wuk4hjtg4kgsooi",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname + '/public')));

app.use(cookieParser());

let session;

// Get user for login
async function loginUser(req) {
    let status = 400;
    try {
        const user = req.body.username;
        const pass = req.body.password;

        const user_sql = `SELECT * FROM users WHERE username='${user}'`;
        const check_user = await db.query(user_sql);

        if (check_user.length > 0) {
            let hashed_pass = check_user[0].password;
            let pass_check = bcrypt.compareSync(pass, hashed_pass);
            if (pass_check) {
                status = 200;
                session=req.session;
                session.userid=user;
            } else {
                status = 400;
            }
        } else {
            status = 400;
        }
    } catch(err) {
        console.error(err);
    }
    return { status };
};

// Code for updating user email
async function updateEmail(req) {
    let status = 400, data = null;
    try {
        console.log(req.body);
        let username = req.body.user;
        let password = req.body.pass;
        let email_address = req.body.email;
        let sql = `SELECT * FROM users WHERE username = '${username}'`;
        let rows = await db.query(sql);
        if(rows.length > 0) {
            let hashed_pass = rows[0].password;
            let stored_email = rows[0].email;
            let pass_check = bcrypt.compareSync(password, hashed_pass);
            if (pass_check) {
                email_sql = `SELECT * FROM users WHERE email = '${email_address}'`;
                email_check = await db.query(email_sql);
                if (email_check.length > 0) {
                    // If email is already in DB
                    status = 409;
                    console.log('email exists');
                } else {
                    // Else email isn't in DB
                    console.log('email not in db');
                    let update_sql = `UPDATE users SET email = '${email_address}' WHERE username = '${username}'`;
                    let update_response = await db.query(update_sql);
                    if (update_response.affectedRows) {
                        status = 200;
                    } else {
                        status = 400;
                    }
                }
                // CHECKS WORK NEED TO IMPLEMENT DB CHANGES AND RESPONSES
            } else {
                status = 401;
                console.log( 'wrong password');
            }
        } else {
            status = 401;
            console.log('no user');
        }
    } catch (err) {
        console.error(err);
    }
    return { status };
}

// Code for updating user password  - THIS WORKS, NEED TO ADD STATUS RESPONSES FOR DIFFERENT SCENES NEXT
async function updatePassword(req) {
    let status = 400, data = null;
    try {
        status = 200;
        let user = req.body.user;
        let pass = req.body.pass;
        let new_pass = req.body.newpass;
        let new_pass_conf = req.body.newpassconf;

        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(new_pass, bcrypt.genSaltSync());

        let user_sql = `SELECT * FROM users WHERE username = '${user}'`;
        let user_rows = await db.query(user_sql);

        if (user_rows.length > 0) {
            let hashed_pass = user_rows[0].password;
            let pass_check = bcrypt.compareSync(pass, hashed_pass);
            if (pass_check) {
                if (new_pass_conf == new_pass) {
                    
                    let pass_sql = `UPDATE users SET password = '${hashedPassword}' WHERE username = '${user}'`;
                    let pass_rows = await db.query(pass_sql);
                    if (pass_rows.affectedRows) {
                        status = 200;
                        console.log('password updated');
                    } else {
                        status = 500;
                        console.log('password went wrong');
                    }
                } else {
                    status = 400;
                }
            } else {
                status = 401;
                console.log('current password wrong');
            }
        } else {
            status = 401;
            console.log('user doesnt exist');
        }

        data = {
            rows: user_rows
        }
    } catch (err) {
        console.error(err);
    }
    return { status, data };
}

// Code for user creation
async function createUser(req) {
    let status = 400,
        data = null;
    try {
        
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const pass_conf = req.body.password_conf;

        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());

        const check_sql = `SELECT * FROM users WHERE username='${username}'`;
        const check_email = `SELECT * FROM users WHERE email='${email}'`;

        const rows = await db.query(check_sql);
        if (rows.length == 0) {
            const email_rows = await db.query(check_email);
            if (email_rows.length == 0) {   
                const insert_sql = `INSERT INTO users (username, email, password) ` +
                    `VALUES (?, ?, ?)`;
                const insert_result = await db.query(insert_sql, [username, email, hashedPassword]);

                if (insert_result.affectedRows) {
                    status = 201;
                    session=req.session;
                    session.userid=username;
                    data = {
                        'message': 'user created'
                    };
                }
            } else {
                status = 209;
                data = {
                    'message': 'email already in use'
                 }
            } 
        } else {
            // User exists, display text on page to say this
            status = 409;
            data = {
                'message': 'username in use'
            }
        }
    } catch (e) {
        console.error(e);
    }
    return {
        status,
        data
    };
}
// Upload a track
async function uploadTrack(req) {
    let status = 400;
    try {
        session = req.session;
        const track_name = req.body.track_name;
        const artist_name = req.body.artist_name;
        const album_name = req.body.album_name;
        const track_year = req.body.track_year;
        const album_artwork = req.files.album_artwork[0].filename;
        const track_ref = req.files.track[0].filename;
        const owner = session.userid;

        const check_sql = `SELECT * FROM tracks WHERE track_name='${track_name}' AND artist_name='${artist_name}'`;
        const check_data = await db.query(check_sql);

        if (check_data.length > 0) {
            status = 409;
        } else {

            const insert_sql = `INSERT INTO tracks (track_name, artist_name, album_name, year, artwork, track_ref, owner) ` +
              `VALUES (?, ?, ?, ?, ?, ?, ?)`;
        
            const sql_run = await db.query(insert_sql, [track_name, artist_name, album_name, track_year, album_artwork, track_ref, owner]);

            if (sql_run.affectedRows) {
                status = 200;
            } else {
                status = 400;
            }
        }
    } catch (err) {
        console.error(err);
    }
    return { status };
};

// GET Songs
async function getSongs(req) {
    let status = 500, data = null;
    try {
        const sql = "SELECT * FROM tracks";
        const rows = await db.query(sql);

        if (rows) {
            status = 200;
            data = {
                'tracks': rows
            }
        } else {
            status = 500;
        }
    } catch (err) {
        console.error(err);
    }
    return {
        status,
        data
    }
};

async function getSingleSong(req) {
    let status = 400, data = null;
    try {
        const tname = req.body.tname;
        const aname = req.body.aname;

        console.log(tname);
        console.log(aname);

        const sql = `SELECT * FROM tracks WHERE track_name='${tname}' AND artist_name='${aname}'`;
        console.log(sql);

        const rows = await db.query(sql);

        if (rows) {
            data = {
                song: rows
            };
            status = 200;
        }

    } catch (err) {
        console.error(err);
    }
    return { status, data };
}

// GET Chart
async function getChart(req) {
    let status = 500, data = null;
    try {
        const sql = "SELECT * FROM tracks ORDER BY yes_count DESC";
        const rows = await db.query(sql);

        if (rows) {
            status = 200;
            data = {
                'tracks': rows
            }
        } else {
            status = 500;
        }
    } catch (err) {
        console.error(err);
    }
    return {
        status,
        data
    }
};

// GET Profile
async function getProfile(req) {
    let status = 500, data = null;
    try {
        session = req.session;
        const user = session.userid;
        const sql = `SELECT * FROM users WHERE username = '${user}'`;
        const rows = await db.query(sql);

        if (rows) {
            status = 200;
            data = {
                'user': rows[0].username,
                'email': rows[0].email
            }
        } else {
            status = 500;
        }
    } catch (err) {
        console.error(err);
    }
    return {
        status,
        data
    }
};

// GET User's uploaded tracks
async function getUserTracks(req) {
    let status = 500, data = null;
    try {
        session = req.session;
        const user = session.userid;
        const sql = `SELECT * FROM tracks WHERE owner = '${user}'`;
        const rows = await db.query(sql);

        if (rows) {
            status = 200;
            data = {
                'tracks': rows
            }
        } else {
            status = 500;
        }
    } catch (err) {
        console.error(err);
    }
    return {
        status,
        data
    }
};

// User Likes
async function userLike(req) {
    let status = 400, data = null;
    try {
        session = req.session;
        const user = session.userid;
        let t_name = req.body.name;
        let a_name = req.body.artist;
        let sql = `SELECT * FROM likes WHERE user ='${user}' AND tr_name='${t_name}' AND ar_name='${a_name}'`;
        let likes = await db.query(sql);

        if (likes.length > 0) {
            let delete_sql = `DELETE FROM likes WHERE user='${user}' AND tr_name='${t_name}' AND ar_name='${a_name}'`;
            let delete_rows = await db.query(delete_sql);
            if (delete_rows.affectedRows) {
                status = 200;
                let count_sql = `UPDATE tracks SET yes_count = yes_count - 1 WHERE track_name='${t_name}' AND artist_name='${a_name}'`;
                let count_rows = await db.query(count_sql);
                if (count_rows.affectedRows) {
                    status = 200;
                } else {
                    status = 400;
                }
            } else {
                console.log("Something went wrong");
            }
        } else {
            let like_sql = `INSERT INTO likes (tr_name, ar_name, user) VALUES ('${t_name}', '${a_name}', '${user}')`;
            let like_rows = await db.query(like_sql);
            if (like_rows.affectedRows) {
                status = 200;
                let remove_sql = `UPDATE tracks SET yes_count = yes_count + 1 WHERE track_name='${t_name}' AND artist_name='${a_name}'`;
                let remove_rows = await db.query(remove_sql);
                if (remove_rows.affectedRows) {
                    status = 200;
                } else {
                    status = 400;
                }
            } else {
                console.log("didnt insert");
            }
        }
    } catch (err) {
        console.error(err);
    }
    return {
        status,
        data
    }
};

app.get('/intune', async (req, res) => {
    session = req.session;
    if(session.userid){
        res.sendFile(__dirname + "/views/index.html");
    } else {
    res.sendFile(__dirname + "/views/login.html");
    }
});

app.get('/intune/login', async (req, res) => {
    session = req.session;
    if(session.userid){
        res.sendFile(__dirname + "/views/index.html");
    } else {
        res.sendFile(__dirname + "/views/login.html");
    }
});

app.get('/intune/register', async (req, res) => {
    session = req.session;
    if(session.userid){
        res.sendFile(__dirname + "/views/index.html");
    } else {
        res.sendFile(__dirname + "/views/register.html");
    }
});

app.get('/intune/upload', async (req, res) => {
    //res.sendFile(__dirname + "/views/upload.html");
    session = req.session;
    if(session.userid){
        res.sendFile(__dirname + "/views/upload.html");
    } else {
        res.sendFile(__dirname + "/views/login.html");
    }
});

app.get('/intune/rate', async (req, res) => {
    session = req.session;
    if(session.userid){
        res.sendFile(__dirname + "/views/rate.html");
    } else {
        res.sendFile(__dirname + "/views/login.html");
    }
});

app.get('/intune/chart', async (req, res) => {
    session = req.session;
    if(session.userid){
        res.sendFile(__dirname + "/views/chart.html");
    } else {
        res.sendFile(__dirname + "/views/login.html");
    }
});

app.get('/intune/song_list', async (req, res) => {
    const { status, data } = await getSongs(req);
    res.status(status);
    if (data) res.json(data);
    else res.end();
})

app.get('/intune/chart_list', async (req, res) => {
    const { status, data } = await getChart(req);
    res.status(status);
    if (data) res.json(data);
    else res.end();
});

app.get('/intune/profile', async (req, res) => {
    session = req.session;
    if(session.userid){
        res.sendFile(__dirname + "/views/profile.html");
    } else {
        res.sendFile(__dirname + "/views/login.html");
    }
})

app.get('/intune/profile_details', async (req, res) => {
    const { status, data } = await getProfile(req);
    res.status(status);
    if (data) res.json(data);
    else res.end();
});

app.get('/intune/user_tracks', async (req, res) => {
    const { status, data } = await getUserTracks(req);
    res.status(status);
    if (data) res.json(data);
    else res.end();
});

app.get('/intune/update_email', async (req, res) => {
    res.sendFile(__dirname + "/views/update_email.html");
});

app.get('/intune/update_password', async (req, res) => {
    res.sendFile(__dirname + "/views/update_password.html");
})

app.get('/intune/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

// POST Handlers

app.post('/intune/track_likes', async (req, res) => {
    const { status, data } = await userLike(req);
    res.status(status);
    if (data) res.json(data);
    else res.end();
})

app.post('/intune/login', async (req, res) => {
    const { status } = await loginUser(req);
        res.status(status);
        res.end(); 
});

app.post('/intune/update_email', async (req, res) => {
    const { status, data } = await updateEmail(req);
    res.status(status);
    if (data) res.json(data);
    else res.end();
});

app.post('/intune/update_password', async (req, res) => {
    const { status, data } = await updatePassword(req);
    res.status(status);
    if (data) res.json(data);
    else res.end();
});

app.post('/intune/get_song', async (req, res) => {
    const { status, data } = await getSingleSong(req);
    res.status(status);
    if (data) res.json(data);
    else res.end();
})

app.post('/intune/upload',
    upload.fields([{
        name: 'album_artwork', maxCount: 1
    }, {
        name: 'track', maxCount: 1
    }]), async function(req, res){
        const { status } = await uploadTrack(req);
        res.status(status);
        res.end();
    });

app.post('/intune/register', async (req, res) => {
    const {
        status,
        data
    } = await createUser(req);
    res.status(status);
    if (status == 201) {
        res.sendFile(__dirname + "/views/index.html");
    } else {
        res.sendFile(__dirname + "/views/register.html");
    }
});

app.put('/', async (req, res) => {
    res.status(405);
    res.end();
})

app.delete('/', async (req, res) => {
    res.status(405);
    res.end();
})

app.listen(port, () => {
    console.log(`Running on port ${port}`);
    console.log(__dirname);
})