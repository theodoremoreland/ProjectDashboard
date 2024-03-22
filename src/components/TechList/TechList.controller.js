const frameworks = {
  flask: "Flask",
  react: "React",
  "react-native": "React-Native",
  "spring-boot": "Spring-Boot",
  junit: "jUnit",
  jest: "Jest",
  jasmine: "Jasmine",
  unittest: "unittest",
};
const competencies = {
  "web-development": "web-development",
  "mobile-development": "mobile-development",
  "data-engineering": "data-engineering",
  "data-analytics": "data-analytics",
};
const languages = {
  python: "Python",
  javascript: "JavaScript",
  java: "Java",
  typescript: "TypeScript",
  sql: "SQL",
  plpgsql: "PLpgSQL",
  vba: "VBA",
  bash: "Bash",
  html: "HTML",
  css: "CSS",
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
        topicCounts.frameworks[topic] =
          (topicCounts.frameworks[topic] || 0) + 1;
      } else if (competencies[topic]) {
        topicCounts.competencies[topic] =
          (topicCounts.competencies[topic] || 0) + 1;
      } else if (languages[topic]) {
        topicCounts.languages[topic] = (topicCounts.languages[topic] || 0) + 1;
      } else if (tools[topic]) {
        topicCounts.tools[topic] = (topicCounts.tools[topic] || 0) + 1;
      }
    }
  }

  return topicCounts;
};
