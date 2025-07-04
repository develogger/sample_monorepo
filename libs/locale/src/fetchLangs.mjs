/* eslint-disable no-console */
import { promises as fs } from 'fs';
const langFolderPath = './src/lang/fa/';
const targetFolderPath = './src/';

async function readJSONFile(filePath) {
  try {
    const rawData = await fs.readFile(filePath);

    return JSON.parse(rawData);
  } catch (error) {
    console.error(`An error occurred while reading JSON file '${filePath}':`, error.message);

    return null;
  }
}
function getEntityKey(entity) {
  return entity.split('.')[0];
}

async function write(locales) {
  try {
    await fs.mkdir(targetFolderPath, { recursive: true });
    await fs.writeFile(`${targetFolderPath}fa-IR.json`, `${JSON.stringify(locales)}`);
  } catch (error) {
    console.error('An error occurred while writing the file:', error.message);
  }
}
async function checkValidation(locales) {
  try {
    const files = await fs.readdir(langFolderPath);
    for (const file of files) {
      const filePath = langFolderPath + file;
      const localeData = await readJSONFile(filePath);
      if (localeData) {
        const entityKey = getEntityKey(file);
        const validationFunction = generateValidationFunction(entityKey, localeData);
        locales['validation'][entityKey] = validationFunction;
      }
    }
  } catch (error) {
    console.error('An error occurred while reading the lang folder:', error.message);
  }
}

function generateValidationFunction(entityKey) {
  return (fieldName, params) =>
    `Validation message for ${entityKey}.${fieldName} with params: ${JSON.stringify(params)}`;
}

async function main() {
  const locales = {};
  try {
    const files = await fs.readdir(langFolderPath);
    for (const file of files) {
      const filePath = langFolderPath + file;
      const localeData = await readJSONFile(filePath);
      if (localeData) {
        const entityKey = getEntityKey(file);
        locales[entityKey] = localeData;
      }
    }
  } catch (error) {
    console.error('An error occurred while reading the lang folder:', error.message);
  }

  // Add the validation functions
  locales['validation'] = {};
  checkValidation(locales);

  // Generate the fa-IR.js file
  write(locales);
}

main();
