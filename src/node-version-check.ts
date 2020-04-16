import semver from 'semver'
import { engines } from '../package.json'

const requiredNodeVersion = engines.node

const isSatisfiedVersion: boolean = semver.satisfies(
  process.version,
  requiredNodeVersion
)

if (!isSatisfiedVersion) {
  console.log(`This project require node verions: ${requiredNodeVersion}`)
  process.exit(-1)
}
