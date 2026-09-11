export type RenderTopic = { char: string; hasRendered: boolean }[];

const ProperCase: Record<string, string> = {
    html: 'HTML',
    css: 'CSS',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    python: 'Python',
    java: 'Java',
    csharp: 'C#',
    cpp: 'C++',
    ruby: 'Ruby',
    go: 'Go',
    rust: 'Rust',
    sql: 'SQL',
    bash: 'Bash',
    shell: 'Shell',
    node: 'Node.js',
    nodejs: 'Node.js',
    npm: 'npm',
    yarn: 'Yarn',
    pnpm: 'pnpm',
    react: 'React',
    next: 'Next.js',
    nextjs: 'Next.js',
    vue: 'Vue',
    angular: 'Angular',
    svelte: 'Svelte',
    vite: 'Vite',
    tailwind: 'Tailwind',
    tailwindcss: 'Tailwind CSS',
    docker: 'Docker',
    dockerfile: 'Dockerfile',
    kubernetes: 'Kubernetes',
    k8s: 'Kubernetes',
    aws: 'AWS',
    azure: 'Azure',
    gcp: 'GCP',
    terraform: 'Terraform',
    git: 'Git',
    github: 'GitHub',
    gitlab: 'GitLab',
    bitbucket: 'Bitbucket',
    linux: 'Linux',
    macos: 'macOS',
    windows: 'Windows',
    pandas: 'Pandas',
    numpy: 'NumPy',
    tensorflow: 'TensorFlow',
    pytorch: 'PyTorch',
    mongodb: 'MongoDB',
    postgres: 'PostgreSQL',
    postgresql: 'PostgreSQL',
    mysql: 'MySQL',
    sqlite: 'SQLite',
    redis: 'Redis',
    websocket: 'WebSocket',
    graphql: 'GraphQL',
    rest: 'REST',
    api: 'API',
    'rest-api': 'REST API',
};

export const properCase = (topics: string[]): string[] => {
    const result: string[] = [];

    topics.forEach((topic) => {
        const properCase: string | undefined = ProperCase[topic];

        if (properCase) {
            result.push(properCase);
        }
    });

    return result;
};

/**
 * Generates a random number within a range (intended to avoid generating a random number too close to the edges).
 * @param {number} columnCount - Number of columns.
 * @returns {number} - A random number within a range.
 */
export const generateValidRandomNumber = (columnCount: number): number => {
    const threshold: number = 8;
    const randomNumber: number = Math.floor(Math.random() * columnCount);

    if (randomNumber > columnCount - threshold) {
        return columnCount - threshold;
    }

    if (randomNumber < threshold) {
        return threshold;
    }

    return randomNumber;
};

export const formatRenderTopic = (topic: string): RenderTopic => {
    return topic.split('').map((letter: string) => {
        return {
            char: letter,
            hasRendered: false,
        };
    });
};
