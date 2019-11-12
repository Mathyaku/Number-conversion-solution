export function convertNumberToEnglishText(n: number): string {
    if(n === 0) {
        return "zero";
    }

    if(n > 99999 || n < -99999) {
        throw ("number is out of bounds, please enter another number inside -99999 to 99999 limits.");
    }

    const maxNumberOfDigits: number  = 5;
    let englishText: string = n >= 0 ? "" : "negative";
    let processingNumber: number = Math.abs(n);

    const dictionary: { [id: number]: string } = {
        1000: 'thousand',
        100: 'hundred',
        90: 'ninety',
        80: 'eighty',
        70: 'seventy',
        60: 'sixty',
        50: 'fifty',
        40: 'forty',
        30: 'thirty',
        20: 'twenty',
        19: 'nineteen',
        18: 'eighteen',
        17: 'seventeen',
        16: 'sixteen',
        15: 'fifteen',
        14: 'fourteen',
        13: 'thirteen',
        12: 'twelve',
        11: 'eleven',
        10: 'ten',
        9: 'nine',
        8: 'eight',
        7: 'seven',
        6: 'six',
        5: 'five',
        4: 'four',
        3: 'three',
        2: 'two',
        1: 'one'
    }

    const keyNumbers: number[] = Object.keys(dictionary).map(number => Number(number)).reverse();

    for(const keyNumber of keyNumbers) {
        if(processingNumber === 0){
            break;
        }
        else if(processingNumber >= keyNumber) {

            //split point to separate hundred and thousand
            if(keyNumber >= 100) {

                const number: string = processingNumber.toString();
                let times:number;

                if(number.length === maxNumberOfDigits) {
                    times = parseInt(number.substring(0, 2));
                } else {
                    times = parseInt(number.substring(0, 1));
                }

                englishText = `${englishText} ${convertNumberToEnglishText(times) } ${dictionary[keyNumber]}`;
                processingNumber -= times*keyNumber;
            } else {
                englishText = `${englishText} ${dictionary[keyNumber]}`;
                processingNumber -= keyNumber;
            }
        }
    }

    return englishText.trim();
}

