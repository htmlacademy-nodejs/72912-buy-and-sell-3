"use strict";

const fs = require("fs").promises;
const chalk = require(`chalk`);

const {
  DEFAULT_OFFERS_VALUE,
  ExitCode,
  MAX_OFFERS,
} = require("../../constans");

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const { getRandomInt, shuffle } = require("../../utils");

const types = ["offer", "sale"];

const generateOffers = (count, titles, sentences, categories) => {
  return Array(count)
    .fill({})
    .map(() => ({
      title: titles[getRandomInt(0, titles.length - 1)],
      picture: `item${getRandomInt(0, 16)}.jpg`,
      description: shuffle(sentences).slice(1, 5).join(` `),
      type: types[getRandomInt(0, 1)],
      sum: getRandomInt(1000, 100000),
      category: categories.slice(getRandomInt(0, categories.length - 1)),
    }));
};

const asyncReadFile = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return content.trim().split("\n");
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

module.exports = {
  name: "--generate",
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_OFFERS_VALUE;

    if (countOffer > MAX_OFFERS) {
      console.log(chalk.red("Не больше 1000 объявлений"));
      process.exit(ExitCode.error);
    }

    const titles = await asyncReadFile(FILE_TITLES_PATH);
    const sentences = await asyncReadFile(FILE_SENTENCES_PATH);
    const categories = await asyncReadFile(FILE_CATEGORIES_PATH);

    const content = JSON.stringify(
      generateOffers(countOffer, titles, sentences, categories)
    );

    try {
      await fs.writeFile("mocks.json", content);
      console.info(chalk.green(`Operation success. File created.`));
      process.exit(ExitCode.success);
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.error);
    }
  },
};
