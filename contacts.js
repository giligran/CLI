const fs = require("fs/promises");
const { type } = require("os");
const path = require("path");
const { isArray } = require("util");

const filePath = path.join(__dirname, "/db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const contacts = JSON.parse(data);
    if (Array.isArray(contacts)) {
      return contacts;
    }
    if (typeof contacts === "object") {
      return [...contacts];
    }
    console.error("Data type error");
    return [];
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contact = await listContacts().filter((item) => console.log(item));
    return contact;
  } catch (e) {
    console.error(e);
  }
};
const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    return contact;
  } catch (e) {
    console.error(e);
  }
};
const addContact = async (name, email, phone) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
