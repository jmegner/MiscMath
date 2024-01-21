/**
 * gives you all descending sequences of non-negative integers that sum to `targetSum`
 * @param {number} numCols 
 * @param {number} targetSum 
 * @returns {number[][]} 2d array of descending sequences, where each row is a sequence and each column is a value in the sequence
 */
function descendingSequences(numCols, targetSum) {
    const vals = [];
    vals.push(Array(numCols).fill(0));
    vals[0][0] = targetSum;

    while(1) {
        let didIncrement = false;
        const prevRow = vals[vals.length - 1];
        const currRow = prevRow.slice();

        // optimization of common case
        if(prevRow[1] + 1 < prevRow[0]) {
            currRow[0]--;
            currRow[1]++;
            didIncrement = true;
        }
        else {
            // `c` is index we are hoping to increment
            for(let c = 2; c < numCols; c++) {
                // can we increment at c?
                if(prevRow[c] < prevRow[c - 1] && prevRow[c] + 1 < prevRow[0]) {
                    const commonVal = ++currRow[c]; // then increment at i
                    // and "lopside" everything before i; so vals[r][0] is big and vals[r][1..i-1] == vals[r][i]
                    let firstValIncrement = -1;
                    for(let j = 1; j < c; j++) {
                        firstValIncrement += prevRow[j] - commonVal;
                        currRow[j] = commonVal;
                    }
                    currRow[0] += firstValIncrement;
                    didIncrement = true;
                    break;
                }
            }
        }

        if(didIncrement) {
            vals.push(currRow);
        }
        else {
            break;
        }
    }

    return vals;
}
