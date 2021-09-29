// Алгоритм работы функции
// в самом наче вызова функции определяется какой купюрой больше всего денег, эта 
// купюра будет тратиться самой первой
// также определяются номиналы от вышеупомянутой купюры по убыванию, далее рекурсивно вызывается
// функция collect, в которой определяется достаточность этого прохода для выдачи запрошенной суммы пользователем
// погружение идет до основания рукурсии, 
export class LimitAmount {
    constructor(a,b,c,d,e,f,g) {
        this['+5000'] = {
            countBanknotes: g,
            sum: 5000 * g
        };
        this['+2000'] = {
            countBanknotes: f,
            sum: 2000 * f
        };
        this['+1000'] = {
            countBanknotes: e,
            sum: 1000 * e
        };
        this['+500'] = {
            countBanknotes: d,
            sum: 500 * d
        };
        this['+200'] = {
            countBanknotes: c,
            sum: 200 * c
        };
        this['+100'] = {
            countBanknotes: b,
            sum: 100 * b
        };
        this['+50'] = {
            countBanknotes: a,
            sum: 50 * a
        };
    }
    updateFinalAmount (note) {
        this[`+${note}`].sum = note * this[`+${note}`].countBanknotes
    }
    updateCountBanknotes (count) {
        [5000,2000,1000,500,200,100,50].forEach(bankNote => {
            for (let i in count) {
                if (Number(i) === bankNote) {
                    this[`+${bankNote}`].countBanknotes = this[`+${bankNote}`].countBanknotes + count[i]
                    this[`+${bankNote}`].sum = bankNote * this[`+${bankNote}`].countBanknotes
                }
            }
            
        })
    }
}

export const getMoneyATM = (amountRequired, limits) => {
    let nominals
    let bankNoteIndex = findIndexMaxSum(limits)

    if (amountRequired < 20000) {
        nominals = getDescending(limits)
    } else {
        nominals = Object.keys(limits).map(Number).sort((a,b) => b - a).slice(bankNoteIndex);
    }
    let nominals_limitary = Object.keys(limits).map(Number).sort((a,b) => b - a);

    let flag = false;
    // в кэше хранятся купюры которые сгорели бы при пограничном случае
    let cache = {}
    function collect (amount, nominals) {
        
        if(amount === 0) return {};
        if(!nominals.length){
            
            flag = true
            limits.updateCountBanknotes(cache);
            return 
        };

        let currentNominal = nominals[0];
        let availableNotes = limits[`+${currentNominal}`].countBanknotes;
        let notesNeeded = Math.floor(amount / currentNominal);
        let numberOfNotes = Math.min(availableNotes,notesNeeded);

        if (!flag) {
            cache[currentNominal] = numberOfNotes;
        } 

        limits[`+${currentNominal}`] = {...limits[`+${currentNominal}`], countBanknotes: limits[`+${currentNominal}`].countBanknotes - numberOfNotes};
        if(numberOfNotes > 0) {
            limits.updateFinalAmount(currentNominal)
        }

        let result = collect(amount - numberOfNotes * currentNominal, nominals.slice(1));

        if(result) {
            return numberOfNotes > 0 ? {[`+${currentNominal}`]: numberOfNotes, ...result} : result 
        }
    }
    let res = collect(amountRequired, nominals);

    return flag ? collect(amountRequired, nominals_limitary) : res
}

function findIndexMaxSum(limits) {
    let indexMaxSum = ''
    Object.values(limits).reduce((acc,curr,index,arr) => {

        if (curr.sum > acc)  {
            // ограничение чтобы оставались 50р купюры под конец 
            if (curr.sum < 15000 && index === 6) return acc
            indexMaxSum = index
            return curr.sum
        }   
        return acc
    },0)
    return indexMaxSum
}

function findMaxSum(limits) {
    let max = Object.values(limits).reduce((acc,curr,index,arr) => {

        return acc + curr.sum
    },0)
    return max
}

function getDescending (limits ) {
    return Object.entries(limits).sort((a,b) => b[1].countBanknotes-a[1].countBanknotes).map(item => Number(item[0])); 
}

export const getMoneyATMWithChosenNotes = (amountRequired, limits, listOfBankNotes) => {
    if (findMaxSum(limits) < amountRequired) {
        console.log('Недостаточно денег');
        return
    } 
    
    let result = {}
    let i = 0
    let currentValue = amountRequired;
    while (true) {
        debugger
        let currentNominal = Number(listOfBankNotes[i]);
        if (currentValue === 50) {
            result[50] = 1
            break
        }
        if (currentValue - currentNominal >= 0) {
            currentValue -= currentNominal
            result[currentNominal] ? result[currentNominal] +=1 : result[currentNominal] = 1;
            if (currentValue === 0) break
        } else {
            i++
            if (listOfBankNotes.length === i) {
                i = 0
            }
            continue
        }

        i++
        if (listOfBankNotes.length === i) {
            i = 0
        }
    }
    return result
}


// const limits = new LimitAmount(854,857,696,356,279,147,73);


// function getValidAmountRequired () {
//     while (true) {
//         let max = Object.values(limits).reduce((acc, curr) => Number(acc) + Number(curr.sum),0)
//         let number = getRandomIntInclusive(0, max)
//         if (number % 50 === 0 || number % 100 === 0) {
//             return number 
//         }
//         continue
//     }
// }

// function getRandomIntInclusive(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min; 
// } 

// function checkATMOperation() {
//     let moneyAvailable = true
//     while (moneyAvailable) {
        
//         let amountRequired = getValidAmountRequired();
//         console.log('amountRequired: ', amountRequired);
//         console.log('cash ', getMoneyATM(amountRequired,limits));
//         console.log('limits: ', limits);
//         if(Object.values(limits).reduce((acc, curr) => Number(acc) + Number(curr.countBanknotes),0) < 100) return
//         continue

//     }
// }

//   checkATMOperation()