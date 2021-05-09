import path from 'path';

const settings = {
  app: {
    port: Number(process.env.APP_PORT) || 3000,
  },
  database: {
    use: 'filetext',
    filetext: {
      path:
        process.env.FILE_PATH ||
        path.join(__dirname, '..', '..', 'input-file.txt'),
    },
  },
};

export default settings;
