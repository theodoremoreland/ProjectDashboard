const regexPattern: RegExp = new RegExp(
    '(https:|presentation).*[.](png|PNG)',
    'g'
);

const getImagesFromReadme = (readme: string): string[] => {
    const images: string[] = [];
    let match;

    while ((match = regexPattern.exec(readme)) !== null) {
        if (match[0]) {
            images.push(match[0]);
        }
    }

    return images;
};

export default getImagesFromReadme;
