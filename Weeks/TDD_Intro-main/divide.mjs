
function divide(n) {
    if (n === 0) {
        throw Error("Cant divide by 0");
    }

    if (Number.isNaN(n)) {
        return NaN;
    }

    return 2 / n;
}

export default divide;