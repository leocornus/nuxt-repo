/**
 * some configurations.
 */

import local from '@/libs/local';

let config = {

    root: 'http://www.google.com/api',
    profileName: 'profile.json'
};

try {
    // the first arg is the target Object,
    // all other objects are source objects.
    // The properties in source Object will override
    // the properties in target object.
    config = Object.assign(config, local);
} catch (e) {
    console.log('no local config');
}

// export
export default config;
