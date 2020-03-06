import semver from 'semver';
import {engines} from '../package.json';

const isSatisfiedVersion = semver.satisfies(process.version, engines.node);

if (!isSatisfiedVersion) {
  console.log(`This project require node verions: ${requiredNodeVersion}`);
  process.exit(-1);
}
