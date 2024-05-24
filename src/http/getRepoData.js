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
