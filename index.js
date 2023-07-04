const fs = require('fs');

const TAG_REGEX = /^v\d+(\.\d+){2}$/
const RELEASE_FILE = 'release.json'
const UPDATES_FILE = 'updates.json'

// validate release tag format
const releaseTag = process.argv[2];
if (releaseTag == null || TAG_REGEX.test(releaseTag) === false) {
  console.error('Invalid tag variable')
  process.exit(1)
}

// extract version from release tag
const version = releaseTag.replace('v', '');

// delete release file
const releaseExists = fs.existsSync(RELEASE_FILE)
if (releaseExists) {
  fs.unlinkSync(RELEASE_FILE)
}

// delete updates file
const updatesExists = fs.existsSync(UPDATES_FILE)
if (updatesExists) {
  fs.unlinkSync(UPDATES_FILE)
}

const releaseJson = {
  url: `https://github.com/olafkotur/switch-releases/releases/download/v${version}/Switch-${version}-mac.zip`,
  name: '',
  notes: '',
  pub_date: new Date().toISOString(),
};

const updatesJson = {
  'darwin-x64-prod': {
    readme: `Release ${version}`,
    update: 'https://raw.githubusercontent.com/olafkotur/switch-releases/master/release.json',
    install: `https://github.com/olafkotur/switch-releases/releases/download/v${version}/Switch-${version}.dmg`,
    version,
  },
};

// create updated files
fs.writeFileSync(RELEASE_FILE, JSON.stringify(releaseJson, null, 2));
fs.writeFileSync(UPDATES_FILE, JSON.stringify(updatesJson, null, 2));
