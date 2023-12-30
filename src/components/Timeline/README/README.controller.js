const imgURLRegex = new RegExp("presentation/", "g");

export const fetchReadme = (name, link) => {
    const readme = fetch(link)
        .then(res => res.text())
        .then(text => {
            text = text === "404: Not Found"
                ? "This project does not currently feature a README.md file."
                : text
            text = text
                    .replace(imgURLRegex, `https://raw.githubusercontent.com/theodoremoreland/${name}/master/presentation/`);

            return text;
        })
        .catch((err) => {
            console.error(err);
            return err.toString();
        });
        
    return readme;
};