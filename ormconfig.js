const SnakeNamingStrategy = require('typeorm-naming-strategies').SnakeNamingStrategy
module.exports = {
  type: 'mariadb',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATA,
  synchronize: process.env.DB_SYNC,
  logging: process.env.DB_LOGGIN,
  entities: ['dist/**/**.entity{.ts,.js}'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
  namingStrategy: new SnakeNamingStrategy(),
  dropSchema: false,
}
