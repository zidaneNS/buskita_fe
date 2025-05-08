export const displaySeats = (length: number, row: number, col: number, backseat: number) => {
    const result: number[] = [];
    const array = Array.from({ length });
    array.map((_, i) => {
        const index = i + 1;
        let colStart = index;
        if (index <= col * row) {
            for (let j = 1; j <= col; j++) {
                if (j <= col/2) {
                    if (index % col === j) {
                        colStart = j;
                        break;
                    }
                } else if (j > col/2 && j < col) {
                    if (index % col === j) {
                        colStart = j + Math.floor(backseat/3);
                        break;
                    }
                } else {
                    if (index % col === 0) {
                        colStart = backseat;
                        break;
                    }
                }
            }
        }
        result.push(colStart);
    });
    return result;
}