const express = require ('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

app.get('/',(req,res) => {
    res.send('Hello world');
})

const genres = [
    {id:1,name:"Romcom"},
    {id:2,name:"Action"},
    {id:3,name:"Drama"},
]



const GenreValidate = (genre) => {
    const schema = [
        {
            name : Joi.string().min(3).required()
        }
    ]

    return Joi.validate(genre,schema)
     
}
//GET Requests
app.get('/api/genres',(req,res)=>{
    res.send(genres);
})

//POST Requests
app.post('/api/genres/',(req,res)=>{
    const { error } = GenreValidate(req.body);
    if(error) return res.send(error.details[0].message);

    const genre = {
        id:genres.length + 1,
        name:req.body.name
    }

    genres.push(genre);
    res.send(genre);

})


//PUT Requests
app.put('/api/genres/:id', (req,res)=> {
    const genre = genres.find(c => c.id ===parseInt(req.params.id))
    if(!genre) return res.send('Genre with the given id was not found')

    const { error } = GenreValidate(req.body);
    if(error) return res.send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre)

})

    //DELETE Requests

    // app.delete('/api/genres/:id',(req,res)=>{  
    // const genre = genres.find(c => c.id ===parseInt(req.params.id))
    // if(!genre) return res.atatus(404).send('Genre with the given id was not found')

    // const index = genres.indexOf(genre);
    // console.log(index);
    // genres.splice(index);
    // console.log(genres);

    // res.send(genre);
    // })

    app.delete('/api/genres/:id',(req,res) => {
        //checking if id exits
        const genre = genres.find(c => c.id=== parseInt(req.params.id))
        if(!genre) { res.status(404).send('Course with the given id was not found')
            return;
            }
    
        //deleting the course 
        const index = genres.indexOf(genre);
        genres.splice(index,1);
    
        //returning to the client
        res.send(genre);
    })

app.listen(3000,() => console.log('On server '))