"use strict";

const fs = require("fs");
const {
  DEFAULT_OFFERS_VALUE,
  ExitCode,
  MAX_OFFERS,
} = require("../../constans");

const { getRandomInt, shuffle } = require("../../utils");

const titles = [
  "Продам книги Стивена Кинга.",
  "Продам новую приставку Sony Playstation 5.",
  "Продам отличную подборку фильмов на VHS.",
  "Куплю антиквариат.",
  "Куплю породистого кота.",
  "Продам коллекцию журналов «Огонёк».",
  "Отдам в хорошие руки подшивку «Мурзилка».",
  "Продам советскую посуду. Почти не разбита.",
  "Куплю детские санки.",
];

const descriptions = [
  "Товар в отличном состоянии.",
  "Пользовались бережно и только по большим праздникам.",
  "Продаю с болью в сердце...",
  "Бонусом отдам все аксессуары.",
  "Даю недельную гарантию.",
  "Если товар не понравится — верну всё до последней копейки.",
  "Это настоящая находка для коллекционера!",
  "Если найдёте дешевле — сброшу цену.",
  "Таких предложений больше нет!",
  "Две страницы заляпаны свежим кофе.",
  "При покупке с меня бесплатная доставка в черте города.",
  "Кажется, что это хрупкая вещь.",
  "Мой дед не мог её сломать.",
  "Кому нужен этот новый телефон, если тут такое...",
  "Не пытайтесь торговаться. Цену вещам я знаю.",
];

const categorys = ["Книги", "Разное", "Посуда", "Игры", "Животные", "Журналы"];

const types = ["offer", "sale"];

const generateOffers = (count) => {
  return Array(count)
    .fill({})
    .map(() => ({
      title: titles[getRandomInt(0, titles.length - 1)],
      picture: `item${getRandomInt(0, 16)}.jpg`,
      description: shuffle(descriptions).slice(1, 5).join(` `),
      type: types[getRandomInt(0, 1)],
      sum: getRandomInt(1000, 100000),
      category: categorys.slice(getRandomInt(0, categorys.length - 1)),
    }));
};

module.exports = {
  name: "--generate",
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_OFFERS_VALUE;

    if (countOffer > MAX_OFFERS) {
      console.log("Не больше 1000 объявлений");
      process.exit(ExitCode.error);
    }

    const content = JSON.stringify(generateOffers(countOffer));

    fs.writeFile("mocks.json", content, (err) => {
      if (err) {
        console.error(`Can't write data to file...`);
        process.exit(ExitCode.error);
      }

      console.info(`Operation success. File created.`);
      process.exit(ExitCode.success);
    });
  },
};
