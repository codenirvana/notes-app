const fs = require("fs");

const save = (notes) => fs.writeFileSync('notes.json', JSON.stringify(notes));

function fetch() {
  try {
    let content = fs.readFileSync('notes.json');
    return JSON.parse(content);
  } catch(e) {
    return [];
  }
};

function addNote(title, body) {
  let notes = fetch();
  let note = {title, body};
  let duplicates = notes.filter(note => note.title === title);

  if (duplicates.length === 0) {
    notes.push(note);
    save(notes);
    return true;
  }
  return false;
}

function getNote(title) {
  let notes = fetch();
  let selection = notes.filter(note => note.title === title);
  return selection[0];
}

function removeNote(title) {
  let notes = fetch();
  let selection = notes.filter(note => note.title !== title);
  save(selection);
  return notes.length !== selection.length;
}

module.exports = {
  add: addNote,
  getAll: fetch,
  get: getNote,
  remove: removeNote
};
