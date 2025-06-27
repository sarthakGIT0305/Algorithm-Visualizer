
export async function quickSort(array, setArray, speed) {
    const arr = [...array];
    await quickSortHelper(arr, 0, arr.length - 1, setArray, speed);
    // setHighlight([]);
}

async function quickSortHelper(arr, low, high, setArray, speed) {
    if (low < high) {
        const pivotIndex = await partition(arr, low, high, setArray, speed);
        await quickSortHelper(arr, low, pivotIndex - 1, setArray, speed);
        await quickSortHelper(arr, pivotIndex + 1, high, setArray, speed);
        // setHighlight([]); 
    }
}

async function partition(arr, low, high, setArray, speed) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            setArray([...arr]);
            // setHighlight([j, j + 1]);
            await sleep(speed);
        }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await sleep(speed);

    return i + 1;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
