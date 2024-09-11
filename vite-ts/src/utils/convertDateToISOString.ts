const convertDateToISOString = (dateString: string): string => {
  const dateObject: Date = new Date(dateString);
  const UTCDateObject: Date = new Date(
    dateObject.getTime() - dateObject.getTimezoneOffset() * 60000
  );
  const UTCDateString: string = UTCDateObject.toISOString().split("T")[0];

  return UTCDateString;
};

export default convertDateToISOString;
