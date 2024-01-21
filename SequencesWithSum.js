function factorial(n) {
    let prod = 1;
    for(let i = 2; i <= n; i++) {
        prod *= i;
    }
    return prod;
}

/**
 * 
 * @param {number} n how many item types
 * @param {number} r how many times you selected an item
 * @returns {number}
 */
function combinationsWithReplacement(n, r) {
    return factorial(n + r - 1) / (factorial(r) * factorial(n - 1));
}

/**
 *
 * @param {number} numCols how many columns in each sequence
 * @param {number} targetSum how many times you selected an item
 * @returns {number[][]} 2d array of all non-negative integers sequences with given attributes
 */
function sequencesWithSum(numCols, targetSum) {
    const numRows = combinationsWithReplacement(numCols, targetSum);
    const vals = [];
    vals.push(Array(numCols).fill(0));
    vals[0][0] = targetSum;

    for(let r = 1; r < numRows; r++) {
        vals.push(vals[r - 1].slice());

        // optimization of common case
        if(vals[r][0] > 0) {
            vals[r][0]--;
            vals[r][1]++;
        }
        else {
            for(let c = 1; c < numCols; c++) {
                if(vals[r][c] > 0) {
                    vals[r][c] = 0;
                    vals[r][c + 1] = vals[r - 1][c + 1] + 1;
                    vals[r][0] = vals[r - 1][c] - 1;
                    break;
                }
            }
        }
    }    
    return vals;
}
