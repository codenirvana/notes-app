const fs = require("fs");

var fetch = () => {
  try {
    let content = fs.readFileSync('notes.json');
    return JSON.parse(content);
  } catch(e) {
    return [];
  }
};

var save = (notes) => fs.writeFileSync('notes.json', JSON.stringify(notes));

module.exports = {
  add: (title, body) => {
    let notes = fetch();
    let note = {title, body};
    let duplicates = notes.filter(note => note.title === title);

    if (duplicates.length === 0) {
      notes.push(note);
      save(notes);
      return true;
    }
    return false;
  },
  getAll: () => fetch(),
  get: (title) => {
    let notes = fetch();
    let selection = notes.filter(note => note.title === title);
    return selection[0];
  },
  remove: (title) => {
    let notes = fetch();
    let selection = notes.filter(note => note.title !== title);
    save(selection);
    return notes.length !== selection.length;
  }
};
