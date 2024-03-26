const mongoose = require("mongoose");
const { default: notes } = require("../frontend-notes/src/services/notes");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://dylanspyer:${password}@cluster0.sxy7z94.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

// Note.find({ content: "Mongoose makes things easy" }).then((result) => {
//   result.forEach((note) => {
//     console.log(note);
//   });
//   mongoose.connection.close();
// });

const note = new Note({
  content: "Mongoose makes things easy",
  important: true,
});

note.save().then((result) => {
  console.log(result);
  console.log("note saved!");
  mongoose.connection.close();
});
