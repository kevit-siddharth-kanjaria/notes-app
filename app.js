const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

//add note
yargs.command({
    command: "add",
    describe: "add a note",
    builder:{
        title:{
            describe: "Note title",
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: "Note body",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title,argv.body)
    }
})

//remove note
yargs.command({
    command: "remove",
    describe: "remove note by title",
    builder:{
        title:{
            describe: "Title to be removed",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

//list all notes
yargs.command({
    command: "list",
    describe: "list all the notes",
    handler(){
        notes.displayNotes()
    }
})

//read particular note
yargs.command({
    command: "read",
    describe: "read note by title",builder:{
        title:{
            describe: "Title to be opened",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})

yargs.parse()