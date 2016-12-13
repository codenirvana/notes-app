'use strict';
const yargs = require("yargs");
const notes = require("./notes");

const colors = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  white: "\x1b[37m"
};

const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};
const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
};

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: titleOptions,
  })
  .command('remove', 'Remove a note', {
    title: titleOptions
  })
  .help()
  .argv;

const command = argv._[0];

const printNote = (note) => {
  console.log(colors.white, "-----");
  console.log(colors.cyan, note.title);
  console.log(colors.white, note.body);
};

if (command === 'add') {
  let note = notes.add(argv.title, argv.body);
  if (note) {
    console.log(colors.green, "Note Created Successfully!");
  } else {
    console.log(colors.red, "Duplicate Note Title");
  }
} else if (command === 'list') {
  let allNotes = notes.getAll();
  console.log(colors.green, `Total Note(s): ${allNotes.length}`);
  allNotes.forEach((note) => printNote(note));
} else if (command === 'read') {
  let note = notes.get(argv.title);
  if(note) {
    printNote(note);
  } else {
    console.log(colors.red, "Node Not Found");
  }
} else if (command === 'remove') {
  if (notes.remove(argv.title)) {
    console.log(colors.green, "Note was removed");
  } else {
    console.log(colors.red, "Note not found");
  }
} else {
  console.log(colors.red, "Invalid command!");
}
