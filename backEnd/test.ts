import mongoose from 'mongoose'

var kittySchema = new mongoose.Schema({
    name: String
});

var Kitten = mongoose.model('Kitten', kittySchema);

var silence = new Kitten({ name: 'Silence' });

let structuredKitten = { name: 'fluff' };

var fluffy = new Kitten(structuredKitten);

export {fluffy,Kitten,silence,kittySchema};

console.log(structuredKitten);