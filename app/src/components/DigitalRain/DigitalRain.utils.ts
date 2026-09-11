const ProperCase: Record<string, string> = {
    html: 'HTML',
    css: 'CSS',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    python: 'Python',
    java: 'Java',
    csharp: 'C#',
    cpp: 'C++',
    c: 'C',
    ruby: 'Ruby',
    go: 'Go',
    rust: 'Rust',
    swift: 'Swift',
    kotlin: 'Kotlin',
    scala: 'Scala',
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
    firebase: 'Firebase',
    redis: 'Redis',
    websocket: 'WebSocket',
    websockets: 'WebSockets',
    graphql: 'GraphQL',
    rest: 'REST',
    api: 'API',
    'rest-api': 'REST API',
    websocketapi: 'WebSocket API',
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
