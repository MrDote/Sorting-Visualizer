import { useState, useEffect } from "react";

const Visualizer = () => {

    const ARRAYSIZE = 5;

    const [array, setArray] = useState(new Array(ARRAYSIZE));
    const [algorithm, setAlgorithm] = useState(0);
    const [speed, setSpeed] = useState(200);
    const [loading, setLoading] = useState(false);
    // const sortedArray = useRef(new Array(ARRAYSIZE));

    const algorithms = [
        {name: 'Bubble', description: 'This is bubble sort'},
        {name: 'Quick', description: 'This is quick sort'},
        {name: 'Selection', description: 'This is selection sort'},
        {name: 'Insertion', description: 'This is insertion sort'},
        {name: 'Merge', description: 'This is merge sort'},
    ];

    // Generate new array
    const randomize = () => {
        let arr: number[] = Array(ARRAYSIZE);
        const min = 2;
        const max = 100;

        for (let i = 0; i < ARRAYSIZE; i++) {
            const rand = Math.floor(Math.random() * (max - min + 1) + min);
            arr[i] = rand;
            const bar = document.getElementById(`${i}`)?.style;
            if (bar) bar.backgroundColor = `var(--bar-color)`;
        }
        setArray(arr);
    }

    // Shuffle array
    const handleShuffle = () => {

    }

    const handleAlgo = (index: number) => {
        // const group = document.getElementById("group")?.style;
        // console.log(group?.display);
        // group!.display = 'none';
        setAlgorithm(index);
    }

    // Generate new array on initial render
    useEffect(() => {
        randomize();
    }, [])

    // Sort on click
    const handleSorting = () => {
        setLoading(true);
        switch (algorithms[algorithm].name) {
            case 'Bubble':
                bubbleSort();
                break
        }
        switch (algorithms[algorithm].name) {
            case 'Quick':
                bubbleSort();
                break
        }
    }

    // fake promise to inroduce delay between swaps
    const freeze = (ms: number) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const finishAnim = async () => {
        for (let i = 0; i < array.length; i++) {
            const bar = document.getElementById(`${i}`)?.style;
            bar!.backgroundColor = 'green';
            await freeze(speed);
        }
        setLoading(false);
    }

    // BUBBLE SORT
    const bubbleSort = async () => {
        let curr = array;
        let sorted = false;

        while (!sorted) {
            sorted = true;

            for (let i = 0; i < curr.length - 1; i++) {
                for (let j = 0; j < curr.length - i - 1; j++) {

                    let bar1 = document.getElementById(`${j}`)!.style
                    let bar2 = document.getElementById(`${j + 1}`)!.style

                    if (curr[j] > curr[j + 1]) {
                        let temp = curr[j]
                        curr[j] = curr[j + 1]
                        curr[j + 1] = temp
                        console.log(array)
                        setArray([...curr])
                        
                        // current element
                        bar1.backgroundColor = '#DC143C'
                        // next element
                        bar2.backgroundColor = '#6A5ACD'
            
                        await freeze(speed);
                        console.log(array)

                        bar1.backgroundColor = `var(--bar-color)`;
                        bar2.backgroundColor = `var(--bar-color)`;

                        await freeze(speed);
                        
                        

                        sorted = false
                    }
                    // console.log(`${sortedArray.current[j]}%`)
                    // console.log(bar1.height)

                    // if (`${sortedArray.current[j]}%` == bar1.height) bar1.backgroundColor = 'green';
                    // if (`${sortedArray.current[j+1]}%` == bar2.height) bar2.backgroundColor = 'green';
                }
            }
        }
        finishAnim();
    }

    
    // QUICK SORT
    const quickSort = async () => {
        let curr = array;
    
        await sorts(curr, 0, curr.length - 1);
        finishAnim();
    }
        
    const sorts = async (arr: number[], left: number, right: number) => {
        if (left < right) {
            let partitionIndex = partition(arr, left, right)
        
            setArray([...arr]);
            await freeze(speed);

            await sorts(arr, left, partitionIndex - 1)
            await sorts(arr, partitionIndex + 1, right)
        }
    }

    const partition = (arr: number[], left: number, right: number) => {
        let pivot = arr[right];
        let i = left - 1;

        for (let j = left; j < right; j++) {
            if (arr[j] < pivot) {

                i++;

                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;

                let bar1 = document.getElementById(`${i}`)!.style;
                let bar2 = document.getElementById(`${j}`)!.style;
                bar1.backgroundColor = '#DC143C';
                bar2.backgroundColor = '#6A5ACD';

                freeze(speed);

                bar1.backgroundColor = '#ff7f50';
                bar2.backgroundColor = '#ff7f50';
        
                setArray([...arr]);
            }
        }

        let temp = arr[i + 1];
        arr[i + 1] = arr[right];
        arr[right] = temp;
    
        return i + 1;
    }
    

    return (
        <div className="pt-20 absolute w-full h-full flex flex-col items-center gap-10">
            {/* Sliders before */}
            <div className="flex text-lg font-semibold text-white gap-10">

            </div>
            {/* Bars */}
            <div className="w-[80%] h-[70%] flex gap-1">
                {array.map((value, key) => (
                    <div 
                    className="bg-[var(--bar-color)] self-end" 
                    id={`${key}`} 
                    key={key} 
                    style={{ height: `${value}%`, width: `${100/ARRAYSIZE}%` }}
                    ></div>
                ))}
            </div>
            {/* Buttons after */}
            <div className="flex text-lg font-semibold text-white gap-10">
                {/* Dropdown selection */}
                <div className="relative bg-green-700 w-40 group hover:bg-emerald-500">
                    <p className="p-2 text-center">{algorithms[algorithm].name} Sort</p>
                    <div className="absolute top-0 -translate-y-44 hidden bg-[#f1f1f1] z-10 w-full group-hover:block" id="group">
                        {algorithms.map((alg, index) => {
                            if (index !== algorithm) {
                                return <p key={index} className="text-black p-2 block hover:bg-slate-600 hover:text-white" onClick={() => handleAlgo(index)}>{alg.name} Sort</p>
                            }
                        })}
                    </div>
                </div>
                {/* Sort button */}
                <button className="p-2 bg-orange-600 text-white hover:opacity-80 w-40 disabled:opacity-60 disabled:hover:bg-orange-600" disabled={loading} onClick={handleSorting}>
                    Sort
                </button>
                {/* Reset button */}
                <button className="p-2 bg-lime-500 text-white hover:opacity-80 w-40 disabled:opacity-60 disabled:hover:bg-lime-500" disabled={loading} onClick={randomize}>
                    Reset
                </button>
            </div>
            <div className="w-full flex justify-center">
                <p>20</p>
                <input className="mx-5 w-[50%]" type="range" min="20" max="300" value={speed} onChange={(e) => setSpeed(parseInt(e.target.value))} />
                <p>300</p>
            </div>
        </div>
    )
}

export default Visualizer




// import React, { useState, useEffect } from 'react'
// import useSound from 'use-sound'
// import sound1 from './sounds/sound1.wav'
// import sound2 from './sounds/sound2.wav'
// import Button from './eg/assets/Button'
// import Dropdown from './eg/assets/Dropdown'
// import Slider from './eg/assets/Slider'
// import Toggle from './eg/assets/Toggle'

// const ARRAYSIZE = 100

// const Visualizer = () => {
//   const [primaryArray, setPrimaryArray] = useState([])
//   const [algorithm, setAlgorithm] = useState('bubbleSort')
//   const [animationSpeed, setAnimationSpeed] = useState(50)
//   const [soundOn, setSoundOn] = useState(true)
//   const [disableOptions, setDisableOptions] = useState(false)
//   const [playBeep1] = useSound(sound1, { volume: soundOn ? 0.15 : 0 })
//   const [playBeep2] = useSound(sound2, { volume: soundOn ? 0.05 : 0 })

//   const randomizeArray = () => {
//     for (let i = 0; i < primaryArray.length; i++) {
//       let bar = document.getElementById(i).style
//       bar.backgroundColor = '#ff7f50'
//     }
//     let array = []
//     for (let i = 0; i < ARRAYSIZE; i++) {
//       array.push(randomVals(20, 400))
//     }

//     setPrimaryArray(array)
//   }

//   const randomVals = (min, max) => {
//     let randomVal = Math.floor(Math.random() * (max - min + 1) + min)
//     return randomVal
//   }

//   useEffect(() => {
//     randomizeArray()
//   }, [])

//   const sleep = (milliSeconds) => {
//     return new Promise((resolve) => setTimeout(resolve, milliSeconds))
//   }

//   const finishedAnimation = async () => {
//     for (let i = 0; i < primaryArray.length; i++) {
//       let bar = document.getElementById(i).style
//       bar.backgroundColor = 'green'
//       playBeep1()
//       await sleep(animationSpeed)
//     }
//     setDisableOptions(false)
//   }

//   const handleSorting = () => {
//     setDisableOptions(true)
//     switch (algorithm) {
//       case 'bubbleSort':
//         bubbleSort()
//         break
//       case 'selectionSort':
//         selectionSort()
//         break
//       case 'insertionSort':
//         insertionSort()
//         break
//       case 'mergeSort':
//         mergeSort()
//         break
//       case 'quickSort':
//         quickSort()
//         break
//       case 'heapSort':
//         heapSort()
//         break
//       default:
//         break
//     }
//   }

//   // ------------ ALGORITHMS ------------ //

//   // Bubble Sort
//   const bubbleSort = async () => {
//     let currentArr = primaryArray
//     let sorted = false
//     setAlgorithm({ name: 'Bubble Sort', timeComplexity: 'O(n^2)' })

//     while (!sorted) {
//       sorted = true

//       for (let i = 0; i < currentArr.length - 1; i++) {
//         for (let j = 0; j < currentArr.length - i - 1; j++) {
//           if (currentArr[j] > currentArr[j + 1]) {
//             let temp = currentArr[j]
//             currentArr[j] = currentArr[j + 1]
//             currentArr[j + 1] = temp
//             setPrimaryArray([...primaryArray, currentArr])

//             let bar1 = document.getElementById(j).style
//             let bar2 = document.getElementById(j + 1).style
//             bar1.backgroundColor = '#DC143C'
//             bar2.backgroundColor = '#6A5ACD'

//             await sleep(animationSpeed)

//             bar1.backgroundColor = '#FF7F50'
//             bar2.backgroundColor = '#FF7F50'

//             sorted = false
//             playBeep1()
//           }
//         }
//         playBeep2()
//       }
//       if (sorted) finishedAnimation()
//     }
//   }

//   // Selection Sort
//   const selectionSort = async () => {
//     let currentArr = primaryArray
//     let sorted = false
//     setAlgorithm({ name: 'Selection Sort', timeComplexity: 'O(n^2)' })

//     while (!sorted) {
//       sorted = true

//       for (let i = 0; i < currentArr.length - 1; i++) {
//         for (let j = i + 1; j < currentArr.length; j++) {
//           if (currentArr[i] > currentArr[j]) {
//             let swap1 = currentArr[i]
//             let swap2 = currentArr[j]
//             currentArr[i] = swap2
//             currentArr[j] = swap1
//             setPrimaryArray([...primaryArray, currentArr])

//             let bar1 = document.getElementById(i).style
//             let bar2 = document.getElementById(j).style
//             bar1.backgroundColor = '#DC143C'
//             bar2.backgroundColor = '#6A5ACD'

//             await sleep(animationSpeed)

//             bar1.backgroundColor = '#FF7F50'
//             bar2.backgroundColor = '#FF7F50'

//             sorted = false
//             playBeep1()
//           }
//         }
//         playBeep2()
//       }
//       if (sorted) finishedAnimation()
//     }
//   }

//   // Insertion Sort
//   const insertionSort = async () => {
//     let currentArr = primaryArray
//     let sorted = false
//     setAlgorithm({ name: 'Insertion Sort', timeComplexity: 'O(n^2)' })

//     while (!sorted) {
//       sorted = true

//       for (let i = 1; i < currentArr.length; i++) {
//         let current = currentArr[i]
//         let j = i - 1
//         while (j >= 0 && currentArr[j] > current) {
//           currentArr[j + 1] = currentArr[j]
//           setPrimaryArray([...primaryArray, currentArr])

//           let bar1 = document.getElementById(j + 1).style
//           let bar2 = document.getElementById(j).style
//           bar1.backgroundColor = '#DC143C'
//           bar2.backgroundColor = '#6A5ACD'

//           await sleep(animationSpeed)

//           bar1.backgroundColor = '#FF7F50'
//           bar2.backgroundColor = '#FF7F50'

//           j--
//           sorted = false
//           playBeep1()
//         }
//         currentArr[j + 1] = current
//         setPrimaryArray([...primaryArray, currentArr])
//         playBeep2()
//       }
//       if (sorted) finishedAnimation()
//     }
//   }

//   // Merge Sort
//   const mergeSort = async () => {
//     let currentArr = primaryArray
//     setAlgorithm({ name: 'Merge Sort', timeComplexity: 'O(n log(n))' })

//     await sort(currentArr, 0, currentArr.length - 1)
//     finishedAnimation()
//   }

//   const sort = async (arr, low, high) => {
//     if (low < high) {
//       let mid = Math.floor((low + high) / 2)
//       await sort(arr, low, mid)
//       await sort(arr, mid + 1, high)
//       await merge(arr, low, mid, high)
//     }
//   }

//   const merge = async (arr, low, mid, high) => {
//     let i = low
//     let j = mid + 1
//     let k = 0
//     let tempArr = []

//     while (i <= mid && j <= high) {
//       if (arr[i] < arr[j]) {
//         tempArr[k] = arr[i]
//         i++
//         k++
//       } else {
//         tempArr[k] = arr[j]
//         j++
//         k++
//       }
//       setPrimaryArray([...primaryArray, tempArr])

//       let bar1 = document.getElementById(i).style
//       let bar2 = document.getElementById(j).style
//       bar1.backgroundColor = '#DC143C'
//       bar2.backgroundColor = '#6A5ACD'

//       await sleep(animationSpeed)

//       bar1.backgroundColor = '#FF7F50'
//       bar2.backgroundColor = '#FF7F50'

//       playBeep1()
//     }

//     while (i <= mid) {
//       tempArr[k] = arr[i]

//       setPrimaryArray([...primaryArray, tempArr])

//       let bar1 = document.getElementById(i).style
//       let bar2 = document.getElementById(j).style
//       bar1.backgroundColor = '#DC143C'
//       bar2.backgroundColor = '#6A5ACD'

//       await sleep(animationSpeed)

//       bar1.backgroundColor = '#FF7F50'
//       bar2.backgroundColor = '#FF7F50'

//       playBeep1()

//       i++
//       k++
//     }

//     while (j <= high) {
//       tempArr[k] = arr[j]

//       setPrimaryArray([...primaryArray, tempArr])

//       let bar1 = document.getElementById(i).style
//       let bar2 = document.getElementById(j).style
//       bar1.backgroundColor = '#DC143C'
//       bar2.backgroundColor = '#6A5ACD'

//       await sleep(animationSpeed)

//       bar1.backgroundColor = '#FF7F50'
//       bar2.backgroundColor = '#FF7F50'

//       playBeep1()

//       j++
//       k++
//     }

//     for (let i = low; i <= high; i++) {
//       arr[i] = tempArr[i - low]
//       setPrimaryArray([...primaryArray, arr])
//       playBeep2()
//     }
//   }

//   // Quick Sort
//   const quickSort = async () => {
//     setAlgorithm({ name: 'Quick Sort', timeComplexity: 'O(n log(n))' })
//     let currentArr = primaryArray

//     await sorts(currentArr, 0, currentArr.length - 1)
//     finishedAnimation()
//   }

//   const sorts = async (arr, left, right) => {
//     if (left < right) {
//       let partitionIndex = partition(arr, left, right)

//       setPrimaryArray([...primaryArray, arr])
//       await sleep(animationSpeed)
//       playBeep2()
//       await sorts(arr, left, partitionIndex - 1)
//       await sorts(arr, partitionIndex + 1, right)
//     }
//   }

//   const partition = (arr, left, right) => {
//     let pivot = arr[right]
//     let i = left - 1
//     playBeep1()
//     for (let j = left; j < right; j++) {
//       if (arr[j] < pivot) {
//         i++
//         let temp = arr[i]
//         arr[i] = arr[j]
//         arr[j] = temp

//         let bar1 = document.getElementById(i).style
//         let bar2 = document.getElementById(j).style
//         bar1.backgroundColor = '#DC143C'
//         bar2.backgroundColor = '#6A5ACD'

//         setTimeout(() => {
//           bar1.backgroundColor = '#ff7f50'
//           bar2.backgroundColor = '#ff7f50'
//         }, 200)

//         setPrimaryArray([...primaryArray, arr])
//       }
//     }

//     let temp = arr[i + 1]
//     arr[i + 1] = arr[right]
//     arr[right] = temp

//     return i + 1
//   }

//   // Heap Sort
//   const heapSort = async () => {
//     let arr = primaryArray
//     let length = arr.length
//     let index = Math.floor(length / 2 - 1)
//     let lastChild = length - 1

//     setAlgorithm({ name: 'Heap Sort', timeComplexity: 'O(n log(n))' })

//     while (index >= 0) {
//       await heapify(arr, length, index)
//       index--

//       setPrimaryArray([...primaryArray, arr])

//       if (index >= 0) {
//         let bar1 = document.getElementById(index).style
//         let bar2 = document.getElementById(index + 1).style
//         bar1.backgroundColor = '#DC143C'
//         bar2.backgroundColor = '#6A5ACD'

//         await sleep(animationSpeed)

//         playBeep1()

//         bar1.backgroundColor = '#FF7F50'
//         bar2.backgroundColor = '#FF7F50'
//       } else {
//         await sleep(animationSpeed)
//       }
//     }

//     while (lastChild >= 0) {
//       let swap1 = arr[0]
//       let swap2 = arr[lastChild]

//       arr[0] = swap2
//       arr[lastChild] = swap1
//       await heapify(arr, lastChild, 0)
//       lastChild--
//       playBeep2()

//       setPrimaryArray([...primaryArray, arr])

//       if (index >= 0) {
//         let bar1 = document.getElementById(lastChild).style
//         let bar2 = document.getElementById(0).style
//         bar1.backgroundColor = '#DC143C'
//         bar2.backgroundColor = '#6A5ACD'

//         bar1.backgroundColor = '#FF7F50'
//         bar2.backgroundColor = '#FF7F50'
//       } else {
//         await sleep(animationSpeed)
//       }
//     }

//     finishedAnimation()
//   }

//   const heapify = async (arr, length, index) => {
//     let largest = index
//     let leftNode = index * 2 + 1
//     let rightNode = leftNode + 1

//     if (arr[leftNode] > arr[largest] && leftNode < length) {
//       largest = leftNode
//     }

//     if (arr[rightNode] > arr[largest] && rightNode < length) {
//       largest = rightNode
//     }

//     if (largest !== index) {
//       let swap1 = arr[index]
//       let swap2 = arr[largest]
//       arr[index] = swap2
//       arr[largest] = swap1

//       let bar1 = document.getElementById(index).style
//       let bar2 = document.getElementById(largest).style
//       bar1.backgroundColor = '#DC143C'
//       bar2.backgroundColor = '#6A5ACD'

//       await sleep(animationSpeed)

//       bar1.backgroundColor = '#FF7F50'
//       bar2.backgroundColor = '#FF7F50'

//       playBeep1()

//       await heapify(arr, length, largest)
//     }

//     return arr
//   }

//   return (
//     <div>
//       <div className='header'>
//         <Button
//           type='NEWARRAY'
//           name='New Array'
//           onClick={randomizeArray}
//           disabled={disableOptions}
//         />
//         <Dropdown
//           onChange={(e) => setAlgorithm(e.target.value)}
//           disabled={disableOptions}
//         />
//         <Slider
//           onChange={(e) => setAnimationSpeed(e.target.value)}
//           disabled={disableOptions}
//         />
//         <Toggle
//           context='Sound'
//           defaultChecked={soundOn}
//           soundState={soundOn ? 'On' : 'Off'}
//           onChange={() => {
//             setSoundOn(!soundOn)
//           }}
//           disabled={disableOptions}
//         />
//         <Button
//           onClick={handleSorting}
//           type='SORT'
//           name='Sort'
//           disabled={disableOptions}
//         />
//       </div>
//       <div className='sortingBars'>
//         {primaryArray &&
//           primaryArray.map((val, key) => {
//             return (
//               <div
//                 className='bars'
//                 id={key}
//                 key={key}
//                 style={{ height: val }}
//               ></div>
//             )
//           })}
//       </div>
//       {algorithm.name !== undefined && (
//         <div className='algoInfo'>
//           <div>Algorithm: {algorithm.name}</div>
//           <div>Time Complexity: {algorithm.timeComplexity}</div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Visualizer
