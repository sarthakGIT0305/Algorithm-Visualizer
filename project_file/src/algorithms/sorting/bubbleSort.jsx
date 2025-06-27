export async function bubbleSort(array, setArray, speed, setHighlight) {
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        setArray([...arr]);        // Update the UI
        setHighlight([j, j + 1]); 
        await sleep(speed);        // Wait for animation
      }
    }
  }
  setHighlight([j, j + 1]); 
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
