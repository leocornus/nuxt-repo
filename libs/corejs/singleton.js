'use strict';

/**
 * this file is to test a simple object, a singleton class
 */
const Singleton = {

    /**
     * The test method one.
     */
    methodOne: function() {

        return 'From methodOne';
    }
};

// get ready for import.
export default Singleton;

/**
 * the testing method two.
 * Add new property for a simple Object
 */
Singleton.methodTwo = function() {

    return 'From methodTwo';
};
