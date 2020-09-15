const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes();
    // Check that the title is unique
    const duplicateNote = notes.find((note) => note.title.toLowerCase() === title.toLowerCase())
    if (!duplicateNote) {
        notes.push({
            title,
            body
        })
        saveNotes(notes)
        console.log(chalk.green('New note added.'))
    } else {
        console.log(chalk.red('Note title must be unique.'))
    }


}

const removeNote = (title) => {
    let notes = loadNotes()
    const initial = notes.length
    notes = notes.filter((note) => note.title.toLowerCase() !== title.toLowerCase())
    const after = notes.length
    if (initial !== after) {
        console.log(chalk.green('Removed note "' + title + '".'))
        saveNotes(notes)
    } else {
        console.log(chalk.red('Note "' + title + '" does not exist.'))
    }
}

const saveNotes = (notes) => fs.writeFileSync('notes.json', JSON.stringify(notes))

const listNotes = () => {
    console.log(chalk.blue('Your notes:'))
    loadNotes().forEach((note) => {
        console.log(chalk.yellow(note.title))
    })
}

const readNote = (title) => {
    const note = loadNotes().find((note) => note.title.toLowerCase() === title.toLowerCase())
    if (note) {
        console.log(chalk.blue(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red('Note ' + title + ' not found.'))
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}