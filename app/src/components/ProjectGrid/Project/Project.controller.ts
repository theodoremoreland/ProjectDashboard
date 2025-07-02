// Scripts
import covertDateToISOString from '../../../utils/convertDateToISOString';

export const getLastUpdatedDateInDaysString = (
    previousDateString: string
): string => {
    let currentDateObject: Date = new Date();
    const currentDateString: string = covertDateToISOString(currentDateObject);
    currentDateObject = new Date(currentDateString);
    const previousDateObject: Date = new Date(previousDateString);
    const timeDifference: number =
        currentDateObject.getTime() - previousDateObject.getTime();
    const dayDifference: number = timeDifference / (1000 * 3600 * 24);
    const stringEnd: string =
        dayDifference === 0
            ? 'today'
            : dayDifference === 1
              ? `yesterday`
              : `${dayDifference} days ago`;

    return `Last updated ${stringEnd}`;
};
