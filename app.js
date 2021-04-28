/* Built in Node modules */
const path = require('path');

/* 3rd Party modules */
const express = require('express');
const Joi = require('joi');

/* App constants */
const app = express();

/* App Setup*/
app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'views'));

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
/* Routes */
app.get('/', (req, res) => {
    res.render('index');
})
app.post('/', async (req, res) => {
    const schema = eval(req.body.schema);
    const validationResult = await schema.validate(req.body.value);

    res.render('index',
        {
            validationResult: validationResult, 
            feedback:
                {
                    schema: req.body.schema,
                    value: req.body.value,
                }
        }
    )
})

/* Create server and Listen for incoming requests */
app.listen(4444, () => {
    console.log('Joyeux listening on port: 4444');
})