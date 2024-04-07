const frameworks = {
  express: "Express",
  flask: "Flask",
  react: "React",
  "react-native": "React Native",
  "spring-boot": "Spring Boot",
  junit: "jUnit",
  jest: "Jest",
  jasmine: "Jasmine",
  unittest: "unittest",
};
const competencies = {
  "web-development": "Web development",
  "mobile-development": "Mobile development",
  "data-engineering": "Data engineering",
  "data-analytics": "Data analytics",
};
const languages = {
  python: "Python",
  javascript: "JavaScript",
  java: "Java",
  typescript: "TypeScript",
  sql: "SQL",
  vba: "VBA",
  bash: "Bash",
  html: "HTML",
};
const tools = {
  node: "Node",
  pandas: "Pandas",
  docker: "Docker",
  postgresql: "PostgreSQL",
  mysql: "MySQL",
  mongodb: "MongoDB",
  matplotlib: "Matplotlib",
};

const topicMap = { ...frameworks, ...competencies, ...languages, ...tools };

export const findTopicLabel = (topicKey) => {
  if (topicMap[topicKey]) return topicMap[topicKey];

  throw new Error("Invalid topic key");
};

export const findKeyForTopicLabel = (topicLabel) => {
  let topicKey = null;

  for (const [key, value] of Object.entries(topicMap)) {
    if (value === topicLabel) {
      topicKey = key;
      break;
    }
  }

  if (topicKey) return topicKey;

  throw new Error("Invalid topic label");
};

/**
 *
 * @param {*} repos
 * @returns {Object} topicCounts
 */
export const getTopicCounts = (repos) => {
  const topicCounts = {
    frameworks: {},
    competencies: {},
    languages: {},
    tools: {},
  };

  for (const repo of repos) {
    for (const topic of repo.topics) {
      if (frameworks[topic]) {
        topicCounts.frameworks[frameworks[topic]] =
          (topicCounts.frameworks[frameworks[topic]] || 0) + 1;
      } else if (competencies[topic]) {
        topicCounts.competencies[competencies[topic]] =
          (topicCounts.competencies[competencies[topic]] || 0) + 1;
      } else if (languages[topic]) {
        topicCounts.languages[languages[topic]] =
          (topicCounts.languages[languages[topic]] || 0) + 1;
      } else if (tools[topic]) {
        topicCounts.tools[tools[topic]] =
          (topicCounts.tools[tools[topic]] || 0) + 1;
      }
    }
  }

  return topicCounts;
};
