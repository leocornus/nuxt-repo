/**
 * utility lib for solving number of digits problem.
 */

let nod = {

    /**
     * calculate number of digits.
     */
    calcNumberOfDigits: function( fromNumber, toNumber, digit ) {

        let total = 0;

        for( let number = fromNumber; number <= toNumber; number ++) {

            // get the string format off the number.
            // We should NOT use const here!
            let numberStr = number.toString();
            for( let i = 0; i < numberStr.length; i++ ) {
                total += numberStr.charAt( i ) === digit.toString() ? 1 : 0;
            }
        }

        return total;
    }
};

export default nod;
