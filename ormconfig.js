const SnakeNamingStrategy = require('typeorm-naming-strategies').SnakeNamingStrategy
module.exports = {
  type: 'mariadb',
  host: 'swanee.synology.me',
  port: 3307,
  username: 'swanee',
  password: 'Park1984#!',
  database: 'arms',
  synchronize: false,
  logging: true,
  entities: ['dist/**/**.entity{.ts,.js}'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
  namingStrategy: new SnakeNamingStrategy(),
  dropSchema: false,
}
