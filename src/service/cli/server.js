'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const fs = require(`fs`).promises;

const {DEFAULT_PORT, HttpCode} = require(`../../constans`);

const app = express();
app.use(express.json());

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = parseInt(customPort, 10) || DEFAULT_PORT;

    app.get(`/offers`, async (req, res) => {
      try {
        const fileContent = await fs.readFile(`mocks.json`, `utf-8`);
        const mocks = JSON.parse(fileContent);
        res.json(mocks);
      } catch (_err) {
        res.send([]);
      }
    });

    app.use((req, res) => res
      .status(HttpCode.NOT_FOUND)
      .send(`Not found`));

    app
      .listen(port, () => {
        console.info(chalk.green(`Ожидаю соединений на ${port}`));
      })
      .on(`error`, ({message}) => {
        console.error(chalk.red(`Ошибка при создании сервера: ${message}`));
      });
  },
};
