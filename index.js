const { Command } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const program = new Command();

// Define command line options
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

// Parse the command line arguments
program.parse(process.argv);

const argv = program.opts();

/**
 * Perform the specified action based on the provided command line options.
 * @param {Object} options - The parsed command line options.
 */
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.log("List of Contacts:");
      console.table(contacts);
      return contacts;

    case "get":
      const contact = await getContactById(id);
      console.log("Contact Details:");
      console.table([contact]);
      return contact;

    case "remove":
      const contactToDelete = await removeContact(id);
      console.log("Removed Contact:");
      console.table([contactToDelete]);
      return contactToDelete;

    case "add":
      const newContact = await addContact({ name, email, phone });
      console.log("New Contact Added:");
      console.table([newContact]);
      return newContact;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// Invoke the action based on the parsed options
invokeAction(argv);
