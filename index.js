const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

// console.log(
//   listContacts().then((contacts) => {
//     console.log(typeof contacts); // it's Object
//     console.log(contacts); // is it array?
//   })
// );

// console.log(typeof undefined); // it's undefined
// console.log(typeof Promise); // it's function

getContactById();
