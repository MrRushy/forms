const express = require('express');
const router = express.Router();
const {readFile} = require('fs').promises;

router.get("/",async (req, res)=>{
                                                                        //Get 4 words, with thier pos adn def and send back to other page
    let chosenWords = await getWords();
                                                                        //send those back and render quiz.ejs
    console.log("Chosen Words; ", chosenWords);
    res.render('quiz', {chosenWords});
});

router.post("/", (req,res)=>{
    console.log(req.body);
    let {userChoice, correctDef, totalQuestions, totalCorrect}= req.body;
    if(userChoice === correctDef)
    {
        console.log("Correct!")
        let score = totalCorrect+1;
        //increase score++
    }
    let total = totalQuestions+1;
    //get another set of words
    //send that set of words back with the user 
});


let getWords = async ()=>{
                                                                        //get a random part of speech
    console.log("Getting random Part!");
    let randomPart = getRandomPart();
    console.log("Random Part: ", randomPart);
                                                                        //based on that, pick 4 words that match
    let allWords = await readFile('resources/allwords.txt', 'utf8');     //Reads allwords as 1 big string
   
    let wordArray = allWords.split('\n');                               //splits the single string into an array where each line is an index
    shuffle(wordArray);                                                 //shuffle newly created array
    

    let choices = [];
    while(choices.length < 5) {                                         //keep looping until we get 5 choices
        let line = wordArray.pop();                                     //one line as a string
        let[word , part, def] = line.split('\t');                       //this is the same as the next four lines
       // let tokens = line.split('\t');
       // let word = tokens[0];
       // let part = tokens[1];
       // let def = tokens[2];
        if(part === randomPart){                                         //If the part of my words matches  the random part we picked, we keep it
            choices.push(line);
        }

    }
    return choices;
}

let getRandomPart = ()=>{
    let parts = ['noun', 'verb', 'adjective'];
    let randomIndex = Math.floor(Math.random()*parts.length);
    let randomPart = parts[randomIndex];
    return randomPart;

}

let shuffle = (array)=>{
                                                                        //fisher Yates algorithm
    for(let i = array.length-1;i>0;i--)
    {
        let randomNumber = Math.floor(Math.random()*(i+1));
        [array[i], array[randomNumber]] = [array[randomNumber], array[i]];
    }
}


module.exports = router;