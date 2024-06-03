// GitHub
import { Octokit } from "@octokit/core";

// Scripts
import covertDateToISOString from "../utils/convertDateToISOString";

const accessToken = process.env.REACT_APP_GITHUB_API_ACCESS_TOKEN;
const octokit = new Octokit({ auth: accessToken });

export const getRepoData = async () => {
  const response = await octokit.request(
    "GET /user/repos?per_page=100&affiliation=owner&visibility=public&sort=created",
    {
      owner: "octocat",
      repo: "hello-world",
      mediaType: {
        previews: ["mercy"],
      },
    }
  );

  const repoDataArray = response.data.reduce((repos, repo) => {
    const repoData = {
      name: repo.name,
      url: repo.html_url,
      desc: repo.description,
      date_created: covertDateToISOString(repo.created_at),
      date_updated: covertDateToISOString(repo.pushed_at),
      topics: repo.topics,
      /**
       * Changing from png to webp to reduce image size. This should help with load times and minimize
       * data usage. Hopefully, it also helps with the frame rate of the animations on larger screens,
       * namely ultra-wide monitors.
       *
       * So far, my tests have shown the following results (first test):
       * Original images (png):
       * 83 requests
       * 21.12 MB / 20.26 MB transferred
       * Finish: 1.73 s
       * DOMContentLoaded: 280 ms
       * load: 534 ms
       *
       * WebP images:
       * 83 requests
       * 6.71 MB / 3.14 MB transferred
       * Finish: 1.40 s
       * DOMContentLoaded: 26 ms
       * load: 297 ms
       */
      image: `https://raw.githubusercontent.com/theodoremoreland/${repo.name}/master/presentation/thumbnail.webp`,
      demo_link: repo.homepage,
      readme: `https://raw.githubusercontent.com/theodoremoreland/${repo.name}/master/README.md`,
      size: Number(repo.size),
      stars: Number(repo.stargazers_count) || 0,
    };

    if (repoData.topics.length > 0) {
      return [...repos, repoData];
    } else {
      return repos;
    }
  }, []);

  return repoDataArray;
};
