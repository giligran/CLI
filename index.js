const { Command } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.log(contacts);
      return contacts;
    case "get":
      const contact = await getContactById(id);
      console.log(contact);
      return contact;
    case "remove":
      const contactToDelete = await removeContact();
      console.log(contactToDelete);
      return contactToDelete;
    case "add":
      const newContact = await addContact({ name, email, phone });
      console.log(newContact);
      return newContact;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
