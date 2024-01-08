import { MikroORM } from '@mikro-orm/core';

(async () => {
  const orm = await MikroORM.init();

  const migrator = orm.getMigrator();
  await migrator.up(); // runs migrations up to the latest

  await orm.close(true);
})();
