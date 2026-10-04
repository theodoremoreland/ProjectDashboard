export enum TypicalityRating {
    Emblematic = 'Emblematic',
    Typical = 'Typical',
    Common = 'Common',
    Uncommon = 'Uncommon',
    Atypical = 'Atypical',
    Outlier = 'Outlier',
}

const rateTypicality = (percentage: number): string => {
    if (percentage >= 90) {
        return TypicalityRating.Emblematic;
    } else if (percentage >= 70) {
        return TypicalityRating.Typical;
    } else if (percentage >= 50) {
        return TypicalityRating.Common;
    } else if (percentage >= 40) {
        return TypicalityRating.Uncommon;
    } else if (percentage >= 20) {
        return TypicalityRating.Atypical;
    } else {
        return TypicalityRating.Outlier;
    }
};

export default rateTypicality;
