require('dotenv').config();

// Load the MySQL pool connection
const pool = require('./data/config.js');
const express = require('express');    //creating express application

const app = express();



app.use(express.urlencoded({
    extended : true
}));


app.use(express.json()); // get converting .JSON object into JS object

app.use('/', express.static(__dirname + "/"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");   
})


app.get('/criminal', (req, res) => {
    pool.query(`SELECT * FROM criminal`, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
    // pool.query(`SELECT * FROM criminal where criminal_id = '${data.Criminal_id}'`, (error, result) => {
    //     if (error) `throw` error;
 
    //     console.log(result);
    // });
});


app.post('/criminal', (req, res) => {
    console.log(req.body);
    let data = req.body;
    console.log(data);
    
    
    pool.query(`INSERT INTO criminal(criminal_id, first_name, last_name, criminal_email, criminal_address, criminal_address_city, criminal_address_state, criminal_mobile, crime_id) VALUES(${parseInt(data.Criminal_id)}, '${data.Criminal_First_Name}', '${data.Criminal_Last_Name}', '${data.Criminal_email}', '${data.Criminal_address}', '${data.Criminal_address_city}', '${data.Criminal_address_state}', '${data.Criminal_mobile}', ${parseInt(data.Crime_id)})`, (err, result) => {
        if (err) throw err;
        console.log("success");
    });
    res.redirect('/adminpage.html');
}
)

// Display all users
// app.get('/users', (request, response) => {
//     let data = request.body;
//     pool.query('SELECT * FROM police', (error, result) => {
//         if (error) throw error;
 
//         response.send(result);
//     });
// });

// Display all users
// app.get('/crime', (request, response) => {
//     pool.query('SELECT * FROM crime', (error, result) => {
//         if (error) throw error;
 
//         response.send(result);
//     });
// });
app.get('/crime', (req, res) => {
    pool.query(`SELECT * FROM crime`, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
    
});


app.post('/crime', (req, res) => {
    let data = req.body;

    console.log(req.body);

    pool.query(`INSERT INTO crime (crime_id, crime_name, crime_description, criminal_id) VALUES (${parseInt(data.Crime_id)}, '${data.Crime_name}', '${data.Crime_description}', ${parseInt(data.Criminal_id)})`, (err, res) => {
        if (err) throw err;
        console.log('Success');
    });
    res.redirect('/adminpage.html');
})

// app.get('/department', (request, response) => {
//     let data = request.body;
//     console.log(request.body);
//     pool.query(`SELECT * FROM department where dept_name = '${data.Department_name}'`, (error, result) => {
//         if (error) throw error;
 
//         response.send(result);
//     });
// });

app.post('/department', (req, res) => {
    let data = req.body;
    console.log (req.body);

    pool. query(`INSERT INTO department (dept_id, dept_name, dept_description) VALUES (${parseInt(data.Department_id)}, '${data.Department_name}', '${data.Department_description}' )`, (err, res) => {
        if (err) throw err;
        console.log ('success');
    });
})

app.post('/cases', (req, res) => {
    let data = req.body;
    pool.query(`INSERT INTO cases(case_id, case_type, case_Start_date, crime_id, criminal_id, dept_id) VALUES (${parseInt(data.Case_id)}, '${data.Case_type}', '${data.Date_issued}', ${parseInt(data.Crime_id)}, ${parseInt(data.Criminal_id)}, ${parseInt(data.Dept_id)} )`, (err, res) => {
        if (err) throw err;
        console.log('success');
    });
    res.redirect('/adminpage.html');
})

// Display a single policeman by ID
// app.get('/users/:id', (request, response) => {
//     const id = request.params.id;
//     pool.query('SELECT * FROM police WHERE police_id = ?', id, (error, result) => {
//         if (error) throw error;
     
//         response.send(result);
//     });
// });

// Add a new policeman
app.post('/users', (req, res) => {
    let data = req.body;
    pool.query(`INSERT INTO police (police_id, first_name, last_name, police_email, police_address, police_address_city, police_address_state, police_mobile, dept_id) VALUES (${parseInt(data.Police_id)}, '${data.Police_firstname}', '${data.Police_lastname}', '${data.Police_email}', '${data.Police_address}', '${data.Police_city}', '${data.Police_state}', ${parseInt(data.Police_mobile)}, '${parseInt(data.Police_dept_id)}')`, (error, result) => {
        if (error) throw error;
        console.log('success');
    });
    res.redirect('/adminpage.html');
});

// Update an existing user
app.put('/users/:id', (request, response) => {
    const id = request.params.id;
 
    pool.query('UPDATE police SET ? WHERE id = ?', [request.body, id], (error, result) => {
        if (error) throw error;
 
        response.send('User updated successfully.');
    });
});

// Delete a user
app.delete('/users/:id', (request, response) => {
    const id = request.params.id;
 
    pool.query('DELETE FROM police WHERE id = ?', id, (error, result) => {
        if (error) throw error;
 
        response.send('User deleted.');
    });
});

app.listen(process.env.APP_PORT, () => {
    console.log(`Server up and running on port:
http://localhost:${process.env.APP_PORT}` )
});