const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

let users = [];

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);

    if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                res.send('Login successful!');
            } else {
                res.send('Invalid credentials');
            }
        });
    } else {
        res.send('User not found');
    }
});

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;


    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).send('Error hashing password');
        }

        
        users.push({ name, email, password: hash });
        res.send('Signup successful!');
    });

});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
