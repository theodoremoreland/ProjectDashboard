// Scripts
import covertDateToISOString from "../../../utils/convertDateToISOString";

export const getLastUpdatedDateInDaysString = (previousDateString) => {
  let currentDateObject = new Date();
  const currentDateString = covertDateToISOString(currentDateObject);
  currentDateObject = new Date(currentDateString);
  const previousDateObject = new Date(previousDateString);
  const timeDifference =
    currentDateObject.getTime() - previousDateObject.getTime();
  const dayDifference = timeDifference / (1000 * 3600 * 24);
  const stringEnd =
    dayDifference === 0
      ? "today"
      : dayDifference === 1
      ? `yesterday`
      : `${dayDifference} days ago`;

  return `Last updated ${stringEnd}`;
};
