const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const filePath = path.join(__dirname, "/db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.filter((item) => item.id === contactId);
    return contact || null;
  } catch (e) {
    console.error(e);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();

    const contactToDelete = data.find((item) => item.id === contactId);

    if (!contactToDelete) {
      return null;
    }

    const updateContacts = data.filter((item) => item.id !== contactId);

    await fs.writeFile(filePath, JSON.stringify(updateContacts, null, "\t"));

    return contactToDelete;
  } catch (e) {
    console.error(e);
  }
};
const addContact = async (contact) => {
  const { name, email, phone } = contact;
  let id = nanoid();
  try {
    const data = await listContacts();
    if (!data) {
      throw new Error(`Помилка при спробі отримати контакти`);
    }
    const updateData = [...data, { id, name, email, phone }];
    await fs.writeFile(filePath, JSON.stringify(updateData, null, "\t"));
    return contact;
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
