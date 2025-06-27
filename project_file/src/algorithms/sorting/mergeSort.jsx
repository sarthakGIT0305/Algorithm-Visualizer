


export async function mergeSort(array, setArray, speed) {
  const arr = [...array];
  await mergeSortHelper(arr, 0, arr.length - 1, setArray, speed);
}

async function mergeSortHelper(arr, left, right, setArray, speed) {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);
  await mergeSortHelper(arr, left, mid, setArray, speed);
  await mergeSortHelper(arr, mid + 1, right, setArray, speed);
  await merge(arr, left, mid, right, setArray, speed);
}

async function merge(arr, left, mid, right, setArray, speed) {
  const merged = [];
  let i = left, j = mid + 1;

  while (i <= mid && j <= right) {
    if (arr[i] <= arr[j]) merged.push(arr[i++]);
    else merged.push(arr[j++]);
  }

  while (i <= mid) merged.push(arr[i++]);
  while (j <= right) merged.push(arr[j++]);

  for (let k = 0; k < merged.length; k++) {
    arr[left + k] = merged[k];
    setArray([...arr]);
    await sleep(speed);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
