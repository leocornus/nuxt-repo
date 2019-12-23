/**
 * utility lib for all tricks about prime numbers.
 */
let pn = {

    /**
     * Prime numbers up to 500
     */
    primeNumbers500: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47,
        53, 59, 61, 67, 
        71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 
        149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 
        227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 
        307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 
        389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 
        467, 479, 487, 491, 499],

    /**
     * based on the algorithm from wikipedia: primality test.
     * https://en.wikipedia.org/wiki/Primality_test
     */
    isPrimeNumber: function(aNumber) {

        // check if it is less then 1
        if (aNumber <= 3) {
            return aNumber > 1;
        } else if( (aNumber % 2 === 0) || (aNumber % 3 === 0) ) {
            return false;
        }

        let i = 5;
        while( i * i <= aNumber ) {
            if( (aNumber % i === 0) || (aNumber % (i + 2) === 0) ) {
                return false;
            }

            i = i + 6;
        }

        return true;

        //if(this.primeNumbers500.includes(aNumber)) {
        //    return true;
        //} else {
        //    return false;
        //}
    },

    /**
     * implement the trial division algorithm to find ou the integer factorization
     * for a none prime number.
     * - https://en.wikipedia.org/wiki/Trial_division
     */
    trialDivision: function(aNumber) {

        let factors = [];

        // check the 2 first.
        while( aNumber % 2 === 0 ) {

            factors.push( 2 );
            aNumber = aNumber / 2;
        }

        let f = 3;
        while( f * f <= aNumber ) {

            if( aNumber % f === 0 ) {
                factors.push( f );
                aNumber = aNumber / f;
            } else {
                f = f + 2;
            }
        }

        if( aNumber != 1 ) {
            factors.push( aNumber );
        }

        return factors;
    }
};

// this export is for statement 
//  - import PrimeNumber from '@/libs/PrimeNumber'
export default pn;

// this format doesn't work for browser!
//module.exports = pn;
