import * as path from 'path';
import moduleAlias from 'module-alias';

const files = path.resolve(__dirname, '../..');
moduleAlias.addAliases({
  '@root': path.join(files),
  '@domain': path.join(files, 'src', 'domain'),
  '@application': path.join(files, 'src', 'application'),
  '@infrastructure': path.join(files, 'src', 'infrastructure'),
  '@configurations': path.join(files, 'src', 'configurations'),
});
