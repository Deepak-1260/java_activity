const express = require('express');
const cors = require('cors'); // Import CORS
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS for all routes

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.get('/calculate-radius', (req, res) => {
    const { type, value, angle } = req.query;
    console.log(`Received request: type=${type}, value=${value}, angle=${angle}`);

    if (!type || !value) {
        return res.status(400).send('Missing required parameters');
    }

    let command = `java CircleRadiusCalculator ${type} ${value}`;
    if (angle) {
        command += ` ${angle}`;
    }

    exec(command, (error, stdout, stderr) => {
        if (error || stderr) {
            return res.status(500).send('Error executing Java program');
        }
        console.log(`Java Output: ${stdout.trim()}`);
        res.send(`Radius: ${stdout.trim()}`);
    });
});

// app.get('/calculate-radius', (req, res) => {
//     const { type, value, angle } = req.query;
//     if (!type || !value) {
//         return res.status(400).send('Missing required parameters');
//     }

//     let command = `java CircleRadiusCalculator ${type} ${value}`;
//     if (angle) {
//         command += ` ${angle}`;
//     }

//     exec(command, (error, stdout, stderr) => {
//         if (error || stderr) {
//             return res.status(500).send('Error executing Java program');
//         }
//         res.send(stdout.trim());
//     });
// });

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});



// const express = require('express');
// const { exec } = require('child_process'); // Import exec

// const app = express();
// const PORT = 3000;

// app.get('/', (req, res) => {
//     res.send('Hello, Express!');
// });

// app.get('/run-java', (req, res) => {
//     exec('java Multiplier 2', (error, stdout, stderr) => {
//         if (error) {
//             console.error(`Error: ${error.message}`);
//             return res.status(500).send('Error executing Java program');
//         }
//         if (stderr) {
//             console.error(`stderr: ${stderr}`);
//             return res.status(500).send('Error in Java program');
//         }
//         console.log(`Java Output: ${stdout.trim()}`);
//         res.send(`Java returned: ${stdout.trim()}`);
//     });
// });

// app.get('/calculate-radius', (req, res) => {
//     const { type, value, angle } = req.query;
//     if (!type || !value) {
//         return res.status(400).send('Missing required parameters');
//     }

//     let command = `java CircleRadiusCalculator ${type} ${value}`;
//     if (angle) {
//         command += ` ${angle}`;
//     }

//     exec(command, (error, stdout, stderr) => {
//         if (error || stderr) {
//             return res.status(500).send('Error executing Java program');
//         }
//         res.send(`Radius: ${stdout.trim()}`);
//     });
// });


// app.listen(PORT, () => {
//     console.log(`Server is now running at http://localhost:${PORT}`);
// });
