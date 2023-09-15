const fs = require('fs')
const chalk = require('chalk')

const addNote = (title,body) => {
    const notes = loadNotes()
    // const dupicateNotes = notes.filter((note) => note.title === title) //goes throught all the notes
    const dupicateNotes = notes.find((note) => note.title === title) //will stop at first encounter
    if (!dupicateNotes) {
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
        console.log(chalk.green("New note added!"));
    } else {
        console.log(chalk.red("Note title taken..."));    
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const removeNote = (title) => {
    const notes = loadNotes()
    const updatedNotes = notes.filter((note) => note.title !== title)
    if (updatedNotes.length===notes.length) {
        console.log(chalk.red("No note with given title"));
    } else {
        // console.log(updatedNotes);
        saveNotes(updatedNotes)
        console.log(chalk.blue("Removed note : "+title));
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}

const displayNotes = () => {
    const notes = loadNotes();
    console.log(chalk.yellow.inverse("All Notes : "));
    let i = 1;
    for (const key in notes) {
        if (Object.hasOwnProperty.call(notes, key)) {
            const element = notes[key];
            console.log(chalk.yellow(`${i} `+element.title))
            i++;
        }
    }
    if (notes.length===0) {
        console.log(chalk.red("No notes present"));
    }

}

const readNote = (title) => {
    const notes = loadNotes()
    const openNote = notes.find((note) => note.title === title)
    if (!openNote) {
        console.log(chalk.red("No note with given title"));
    } else {
        // console.log(updatedNotes);
        console.log(chalk.yellow.inverse(title));
        console.log(openNote.body);
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    displayNotes: displayNotes,
    readNote: readNote
};