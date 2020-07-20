module.exports = {
  type: 'mongodb',
  url: process.env.DATABASE_URL,
  entities: ['dist/**/**.entity.js'],
  synchronize: true,
  useNewUrlParser: true,
  logging: true,
};
