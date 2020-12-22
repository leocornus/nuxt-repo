'use strict';

/**
 * this file is to test a simple objet, a singleton class
 */
const Singleton = {

    /**
     * The test method one.
     */
    methodOne: function() {

        return 'From methodOne';
    }
};

/**
 * the testing method two.
 */
Singleton.methodTwo = function() {

    return 'From methodTwo';
};


export default Singleton;
