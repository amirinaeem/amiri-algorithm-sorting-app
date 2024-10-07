/*--------------global variables-------------------*/
const topBtns = document.querySelectorAll(".top-btn");
const infoContainer = document.querySelectorAll(".info-container");
const firstShalf = document.getElementById("first");
const secondShalf = document.getElementById("second");
const firstSpanBox = document.getElementById("first-span-box");
const secondSpanBox = document.getElementById("final-span-box");
const displayContainer = document.getElementById("display-container");
const breakDownContainer = document.getElementById("break-down-container");
const breakParentContainer = document.querySelector(".break-parent");
const leftParentContainer = document.querySelector(".left-div");
const rightParentContainer = document.querySelector(".right-div");
const breakBoxes = document.querySelectorAll(".break-box");
const leftBoxes = document.querySelectorAll(".left-box");
const rightBoxes = document.querySelectorAll(".right-box");
const currentCombinedBoxes = document.querySelectorAll(".combined-box");
const mergeContainer = document.querySelector(".merge-container");
const callBtns = document.querySelectorAll(".btn");
const firstContainer = document.querySelector(".container");
const generateRandom = document.getElementById("generate-ball");
const unsortedBox = document.getElementById("unsorted-box");
const bubbleSortBtn = document.getElementById("bubble-sort");
const selectionSortBtn = document.getElementById("selection-sort");
const quickSortBtn = document.getElementById("quick-sort");
const mergeSortBtn = document.getElementById("merge-sort");
const resetButton = document.getElementById("reset-btn");
const mergePageBtn = document.getElementById("merge-page");

/*--------------global variables-------------------*/

/*------------variables for tracking--------------*/

const delay = 200;
let currentLevel = 0;
let sortedCount = 0;
let randomNum = [];
let spansGenerated = false;
let spans = [];

/*--------------shared functions--------------*/
function generateSpans() {
  randomNum = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100));
  firstSpanBox.innerHTML = "";
  spans = [];

  randomNum.forEach((num) => {
    let randomSpan = document.createElement("span");
    randomSpan.innerText = num;
    randomSpan.classList.add("span");
    firstSpanBox.appendChild(randomSpan);
    spans.push(randomSpan);
  });
}

function resetProcess() {
  firstSpanBox.innerHTML = "";
  secondSpanBox.innerHTML = "";
  spans = [];
  spansGenerated = false;
  generateRandom.disabled = false;
  callBtns.forEach((btn, i) => {
    generateRandom.disabled = false;
    generateRandom.classList.remove("disabled");
  });
}
generateRandom.onclick = function () {
  callBtns.forEach((btn, i) => {
    callBtns[(btn, i)].disabled = false;
    callBtns[(btn, i)].classList.remove("disabled");
  });
  generateSpans();
};

resetButton.onclick = function () {
  resetProcess();
};

function compare(index1, index2, callback) {
  const span1 = spans[index1];
  const span2 = spans[index2];
  span1.classList.add("compare");
  span2.classList.add("compare");

  setTimeout(() => {
    span1.classList.remove("compare");
    span2.classList.remove("compare");
    setTimeout(callback, delay);
  }, delay);
}

function swap(index1, index2, callback) {
  const span1 = spans[index1];
  const span2 = spans[index2];
  const span1Pos = span1.getBoundingClientRect();
  const span2Pos = span2.getBoundingClientRect();
  const distance = span2Pos.left - span1Pos.left;
  span1.style.setProperty("--distance", `${distance}px`);
  span2.style.setProperty("--distance", `${-distance}px`);
  span1.classList.add("swap");
  span2.classList.add("swap");
  setTimeout(() => {
    const parent = span1.parentNode;
    const nextSibling = span2.nextSibling;
    if (nextSibling === span1) {
      parent.insertBefore(span1, span2);
    } else {
      parent.insertBefore(span2, span1);
      parent.insertBefore(span1, nextSibling);
    }
    [spans[index1], spans[index2]] = [spans[index2], spans[index1]];
    span1.classList.remove("swap");
    span2.classList.remove("swap");
    setTimeout(callback, delay);
  }, delay);
}

function moveToSecondShelf(index) {
  const sortedSpan = spans[index];
  sortedSpan.classList.add("sorted-q");
  secondSpanBox.appendChild(sortedSpan);
  secondSpanBox.insertBefore(sortedSpan, secondSpanBox.firstChild);
  setTimeout(() => {
    sortedSpan.style.transform = "";
  }, delay);
  if (!index) {
    let finalMessage = `<span class = "final-msg">Sorting Compelete</span>`;
    firstSpanBox.innerHTML = finalMessage;
    callBtns.forEach((btn, i) => {
      callBtns[0].disabled = true;
      callBtns[0].classList.add("disabled");
      generateRandom.disabled = true;
      generateRandom.classList.add("disabled");
    });
  }
}

/*--------------shared functions--------------*/

/*------------------ Main functions --------------*/

function bubbleSort() {
  // Outer loop index
  let i = spans.length - 1;

  // Inner loop index
  let j = 0;

  function outerLoop() {
    // All spans are sorted
    if (i < 0) return;

    let isSorted = true;

    //inner loop for animation
    function innerLoop() {
      //base case;
      if (j < i) {
        //Getting the values of the array as numbers;
        const num1 = parseInt(spans[j].innerText);
        const num2 = parseInt(spans[j + 1].innerText);

        // Animate comparison by adding 'compare' class
        compare(j, j + 1, () => {
          //condition;
          if (num1 > num2) {
            isSorted = false;

            // Swap spans with animation if out of order
            swap(j, j + 1, () => {
              //keep going;
              j++;

              // Delay before next inner loop iteration
              setTimeout(innerLoop, delay);
            });
          } else {
            //keep going;
            j++;

            // Delay before next inner loop iteration
            setTimeout(innerLoop, delay);
          }
        });
      } else {
        // One pass is complete, move the sorted span to the second shelf
        moveToSecondShelf(i);

        // Increment the sorted span counter
        sortedCount++;
        i--;
        j = 0;

        // Delay before the next pass of outer loop
        setTimeout(outerLoop, delay);
      }
    }

    innerLoop();
  }

  outerLoop();
}

function insertionSort() {
  // Start with the second element
  let i = 1;

  // Declare variables for inner loop
  let j, temp;

  function outerLoop() {
    if (i >= spans.length) {
      //Creating dom element for the final message;
      let finalMessage = `<span class = "final-msg">Sorting Complete</span>`;

      secondSpanBox.innerHTML = finalMessage;
      callBtns.forEach((btn, i) => {
        callBtns[2].disabled = true;
        callBtns[2].classList.add("disabled");
        generateRandom.disabled = true;
        generateRandom.classList.add("disabled");
      });
      // All spans are sorted once 'i' reaches the length of the spans
      return;
    }

    // The span to be inserted
    temp = spans[i];

    // Get its numerical value for comparison
    const tempValue = parseInt(temp.innerText);
    j = i - 1;

    function innerLoop() {
      if (j >= 0) {
        const currentSpan = spans[j];
        const currentValue = parseInt(currentSpan.innerText);

        // Animate comparison
        compare(j, i, () => {
          if (currentValue > tempValue) {
            // Shift the current span to the right (make space for temp)
            swap(j, j + 1, () => {
              j--;
              setTimeout(innerLoop, delay); // Continue shifting
            });
          } else {
            // No need to shift anymore, place temp in the correct position
            spans[j + 1] = temp;

            // Add the 'sorted' class to the span to indicate it is sorted
            spans[j + 1].classList.add("sorted-q");
            spans[j].classList.add("sorted-q");
            sortedCount++; // Increment the sorted span count
            i++; // Move to the next element for sorting
            setTimeout(outerLoop, delay); // Move to the next iteration
          }
        });
      } else {
        // If no more elements to the left, place temp at the beginning
        spans[j + 1] = temp;

        //adding the class for the sorted elements;
        spans[j + 1].classList.add("sorted-q");
        // Add the 'sorted' class to the span to indicate it is sorted

        sortedCount++; // Increment the sorted span count
        i++; // Move to the next element for sorting
        setTimeout(outerLoop, delay); // Move to the next iteration
      }
    }

    innerLoop(); // Start shifting/checking elements
  }

  outerLoop(); // Start the sorting process
}

function selectionSort() {
  // Start with the first index
  let i = 0;

  function outerLoop() {
    // Stop when all spans are sorted
    if (i > spans.length - 1) return;

    // Assume the minimum is the current index
    let min = i;
    let j = i + 1;

    //lopp through the spans;
    function innerLoop() {
      if (j < spans.length) {
        //Getting the value of the span element as the number;
        let num1 = parseInt(spans[j].innerText);
        let num2 = parseInt(spans[min].innerText);

        //calling the compare function;
        compare(j, min, () => {
          if (num1 < num2) {
            // Update the index of the minimum element
            min = j;
          }

          // Move to the next element
          j++;

          // Continue the inner loop
          innerLoop();
        });
      } else {
        // After the inner loop finishes, swap if necessary
        if (i !== min) {
          swap(i, min, () => {
            // Move sorted span to the second shelf
            moveSpanSelect(i);
            sortedCount++;

            // Move to the next element for the outer loop
            i++;
            outerLoop(); // Continue the outer loop
          });
        } else {
          // If no swap needed, just move the span to the second shelf
          moveSpanSelect(i);
          sortedCount++;
          i++; // Move to the next element for the outer loop
          outerLoop(); // Continue the outer loop
        }
      }
    }

    innerLoop(); // Start the inner loop
  }

  outerLoop(); // Start the outer loop
}

function moveSpanSelect(index) {
  const sortedSpan = spans[index];
  sortedSpan.classList.add("sorted-q"); // Add class for visual styling of sorted spans

  // Append the span to the second shelf
  secondSpanBox.appendChild(sortedSpan);
  // Move the span to the second shelf with updated position
  // Reset the transform after the animation
  setTimeout(() => {
    sortedSpan.style.transform = "";
  }, delay);

  if (index === spans.length - 1) {
    let finalMessage = `<span class = "final-msg">Sorting Compelete</span>`;
    //Creating dom element for the final message;
    firstSpanBox.innerHTML = finalMessage;
    callBtns.forEach((btn, i) => {
      callBtns[1].disabled = true;
      callBtns[1].classList.add("disabled");
      generateRandom.disabled = true;
      generateRandom.classList.add("disabled");
    });
  }
}

async function breakDownSort(array) {
  if (array.length === 1) return array; // Base case for recursion

  let midIndex = Math.floor(array.length / 2);
  let leftPart = array.slice(0, midIndex);
  let rightPart = array.slice(midIndex);

  // Get the current set of shelves for this level
  let currentBreakBox = breakBoxes[currentLevel];
  let currentLeftBox = leftBoxes[currentLevel];
  let currentRightBox = rightBoxes[currentLevel];
  let currentCombinedBox = currentCombinedBoxes[currentLevel];

  currentLevel++; // Increment for the next recursive level

  // Move the entire array to the break box (for visualization)
  array.forEach((element) => {
    let spanOnBreak = document.createElement("span");
    spanOnBreak.classList.add("span");
    spanOnBreak.innerText = element;
    currentBreakBox.appendChild(spanOnBreak);
  });

  await new Promise((resolve) => setTimeout(resolve, delay));

  // Process the left part
  let left = await breakDownSort(leftPart);

  left.forEach((element) => {
    let spanOnLeft = document.createElement("span");
    spanOnLeft.classList.add("span");
    spanOnLeft.innerText = element;
    currentLeftBox.appendChild(spanOnLeft);
  });

  await new Promise((resolve) => setTimeout(resolve, delay));

  // Process the right part
  let right = await breakDownSort(rightPart);

  right.forEach((element) => {
    let spanOnRight = document.createElement("span");
    spanOnRight.classList.add("span");
    spanOnRight.innerText = element;
    currentRightBox.appendChild(spanOnRight);
  });

  // Add a delay between breakdown and merge process
  await new Promise((resolve) => setTimeout(resolve, delay));

  // Perform the merge without mutating the original arrays
  let mergedArray = merge(left, right);

  // Animate the merge by moving elements to the combined box
  for (let i = 0; i < mergedArray.length; i++) {
    await animateElementMove(mergedArray[i], currentCombinedBox);
  }

  return mergedArray;
}

async function animateElementMove(value, targetContainer) {
  // Find the span element by iterating over all spans and checking their innerText
  let spans = document.querySelectorAll("span");
  let spanToMove = Array.from(spans).find((span) => span.innerText == value);

  if (spanToMove) {
    // Apply animation class (CSS transitions should handle the movement)
    spanToMove.classList.add("combing");

    // Delay to allow the animation to play out before appending
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Append the element to the target container (the combined box)
    targetContainer.appendChild(spanToMove);
  }
}

function merge(array1, array2) {
  let combined = [];
  let i = 0;
  let j = 0;

  // Compare elements from both arrays and push in sorted order
  while (i < array1.length && j < array2.length) {
    if (array1[i] < array2[j]) {
      combined.push(array1[i]);
      i++;
    } else {
      combined.push(array2[j]);
      j++;
    }
  }

  // Push remaining elements from array1 (if any)
  while (i < array1.length) {
    combined.push(array1[i]);
    i++;
  }

  // Push remaining elements from array2 (if any)
  while (j < array2.length) {
    combined.push(array2[j]);
    j++;
  }

  return combined;
}

async function quickSort(numsArray, left = 0, right = numsArray.length - 1) {
  if (left < right) {
    let pivotIndex = await pivot(numsArray, left, right);

    // Recursively sort the left and right partitions
    await quickSort(numsArray, left, pivotIndex - 1);
    await quickSort(numsArray, pivotIndex + 1, right);
  }

  // After sorting is complete, visually update the spans to match the sorted numbers
  if (left === 0 && right === numsArray.length - 1) {
    for (let i = 0; i < numsArray.length; i++) {
      const num = numsArray[i];
      const span = spans[i];

      // Update the span's innerText to match the sorted number
      span.innerText = num;

      // Optional: Add a visual effect to show it's sorted
      span.classList.add("sorted-q");

      // Move to sorted box
      secondSpanBox.appendChild(span);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    let finalMessage = `<span class="final-msg">Sorting Complete</span>`;
    firstSpanBox.innerHTML = finalMessage;
    callBtns.forEach((btn, i) => {
      callBtns[0].disabled = true;
      callBtns[0].classList.add("disabled");
      generateRandom.disabled = true;
      generateRandom.classList.add("disabled");
    });
  }
}

async function pivot(
  numsArray,
  pivotIndex = 0,
  endIndex = numsArray.length - 1
) {
  spans[pivotIndex].classList.add("pivot");
  let swapIndex = pivotIndex;

  for (let i = pivotIndex + 1; i <= endIndex; i++) {
    spans[i].classList.add("compare-q");
    spans[pivotIndex].classList.add("compare-q");

    await new Promise((resolve) => setTimeout(resolve, delay));

    if (numsArray[i] < numsArray[pivotIndex]) {
      swapIndex++;
      await swapQuic(numsArray, swapIndex, i);
    }

    spans[i].classList.remove("compare-q");
    spans[pivotIndex].classList.remove("compare-q");
  }

  await swapQuic(numsArray, pivotIndex, swapIndex);
  spans[swapIndex].classList.remove("pivot");
  return swapIndex;
}

async function swapQuic(numsArray, firstIndex, secondIndex) {
  let temp = numsArray[firstIndex];
  numsArray[firstIndex] = numsArray[secondIndex];
  numsArray[secondIndex] = temp;

  const firstElementRect = spans[firstIndex].getBoundingClientRect();
  const secondElementRect = spans[secondIndex].getBoundingClientRect();

  const distance = secondElementRect.left - firstElementRect.left;

  spans[firstIndex].classList.add("swap-q");
  spans[secondIndex].classList.add("swap-q");

  spans[firstIndex].style.transform = `translateX(${distance}px)`;
  spans[secondIndex].style.transform = `translateX(${-distance}px)`;

  await new Promise((resolve) => setTimeout(resolve, delay));

  spans[firstIndex].style.transform = "";
  spans[secondIndex].style.transform = "";

  // Swap the spans in the DOM
  firstSpanBox.insertBefore(spans[secondIndex], spans[firstIndex]);

  // Update the `spans` array to reflect the new order
  let tempSpan = spans[firstIndex];
  spans[firstIndex] = spans[secondIndex];
  spans[secondIndex] = tempSpan;
}

/*------------------ Main functions --------------*/

/*------------------ EventListener for functions --------------*/
mergeSortBtn.onclick = function () {
  firstSpanBox.innerHTML = "";
  firstSpanBox.innerText = `Open the first page first`;
};

for (let btn of callBtns) {
  btn.addEventListener("click", () => {
    if (btn === callBtns[0]) {
      callBtns.forEach((btn, i) => {
        callBtns[(btn, 0)].disabled = false;
        callBtns[(btn, 0)].classList.remove("disabled");
        callBtns[(btn, i)].classList.add("disabled");
        callBtns[(btn, i)].disabled = true;
      });
      firstContainer.style.display = "flex";
      mergeContainer.style.display = "none";
      bubbleSort(randomNum);
    } else if (btn === callBtns[1]) {
      callBtns.forEach((btn, i) => {
        callBtns[(btn, 1)].disabled = false;
        callBtns[(btn, 1)].classList.remove("disabled");
        callBtns[(btn, i)].classList.add("disabled");
        callBtns[(btn, i)].disabled = true;
      });
      firstContainer.style.display = "flex";
      mergeContainer.style.display = "none";
      selectionSort(randomNum);
    } else if (btn === callBtns[2]) {
      callBtns.forEach((btn, i) => {
        callBtns[(btn, 2)].disabled = false;
        callBtns[(btn, 2)].classList.remove("disabled");
        callBtns[(btn, i)].classList.add("disabled");
        callBtns[(btn, i)].disabled = true;
      });
      firstContainer.style.display = "flex";
      mergeContainer.style.display = "none";
      insertionSort(randomNum);
    } else if (btn === callBtns[3]) {
      callBtns.forEach((btn, i) => {
        callBtns[(btn, 3)].disabled = false;
        callBtns[(btn, 3)].classList.remove("disabled");
        callBtns[(btn, i)].classList.add("disabled");
        callBtns[(btn, i)].disabled = true;
      });
      firstContainer.style.display = "flex";
      mergeContainer.style.display = "none";
      quickSort(randomNum);
    } else if (btn === callBtns[4]) {
      callBtns.forEach((btn, i) => {
        callBtns[(btn, 4)].disabled = false;
        callBtns[(btn, 4)].classList.remove("disabled");
        callBtns[(btn, i)].classList.add("disabled");
        callBtns[(btn, i)].disabled = true;
      });
      firstContainer.style.display = "none";
      mergeContainer.style.display = "flex";
      let randomNumMerge = [];
      let spans = []; // Use 'let' to allow reassignment
      generateRandom.addEventListener("click", () => {
        mergeSortBtn.disabled = false;
        mergeSortBtn.classList.remove("disabled");
        callBtns.forEach((btn, i) => {
          callBtns[(btn, i)].classList.add("disabled");
          callBtns[(btn, i)].disabled = true;
          callBtns[(btn, 5)].disabled = false;
          callBtns[(btn, 5)].classList.remove("disabled");
        });
        randomNumMerge = Array.from({ length: 12 }, () =>
          Math.floor(Math.random() * 100)
        );

        // Clear any existing spans from the DOM and array
        firstSpanBox.innerHTML = "";
        spans = [];

        randomNumMerge.forEach((num) => {
          // Create random span
          let randomSpan = document.createElement("span");
          randomSpan.innerText = num;
          randomSpan.classList.add("span");

          // Append to DOM
          unsortedBox.appendChild(randomSpan);

          // Store span in array for later manipulation
          spans.push(randomSpan);
        });
      });

      mergeSortBtn.onclick = function () {
        breakDownSort(randomNumMerge);
      };

      resetButton.onclick = function () {
        window.location.reload();
      };
    }
  });
}

/*------------------ EventListener for functions --------------*/

/*---------------Info-container handling --------*/

for (let div of infoContainer) {
  div.style.display = "none";
}

for (let btn of topBtns) {
  btn.addEventListener("click", () => {
    if (btn === topBtns[0]) {
      infoContainer[0].style.display = "block";
    } else if (btn === topBtns[1]) {
      infoContainer[0].style.display = "none";
      infoContainer[1].style.display = "block";
    } else if (btn === topBtns[2]) {
      infoContainer[1].style.display = "none";
      infoContainer[2].style.display = "block";
    } else if (btn === topBtns[3]) {
      infoContainer[2].style.display = "none";
      infoContainer[3].style.display = "block";
    } else if (btn === topBtns[4]) {
      infoContainer[3].style.display = "none";
      infoContainer[4].style.display = "block";
    } else if (btn === topBtns[5]) {
      for (let div of infoContainer) {
        div.style.display = "none";
      }
    }
  });
}

/*---------------Info-container handling --------*/
