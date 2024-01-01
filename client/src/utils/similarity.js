export function similarity(s1='', s2='') {
    let longer = s1.replace(/[^A-Z0-9]/ig, "");
    let shorter = s2.replace(/[^A-Z0-9]/ig, "");
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    let longerLength = longer.length;
    if (longerLength == 0) {
        return 0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength) * 100;
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    const costs = new Array();
    for (let i = 0; i <= s1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j++) {
        if (i == 0)
            costs[j] = j;
        else {
            if (j > 0) {
            let newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
                newValue = Math.min(Math.min(newValue, lastValue),costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
            }
        }
        }
        if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}