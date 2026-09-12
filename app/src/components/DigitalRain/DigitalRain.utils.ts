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
    mui: 'MUI',
    'mui-x': 'MUI',
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
    airflow: 'Airflow',
    'api-gateway': 'API Gateway',
    'aws-lambda': 'AWS Lambda',
    'aws-sam': 'AWS SAM',
    axios: 'Axios',
    beautifulsoup: 'BeautifulSoup',
    black: 'Black',
    bootstrap: 'Bootstrap',
    boto3: 'boto3',
    copilot: 'Copilot',
    d3: 'D3.js',
    eslint: 'ESLint',
    etl: 'ETL',
    excel: 'Excel',
    express: 'Express',
    fastapi: 'FastAPI',
    figlet: 'Figlet',
    flask: 'Flask',
    'flask-sqlalchemy': 'SQLAlchemy',
    'github-api': 'GitHub API',
    'github-pages': 'GitHub Pages',
    gradle: 'Gradle',
    gunicorn: 'Gunicorn',
    hibernate: 'Hibernate',
    'hibernate-orm': 'Hibernate ORM',
    inquirer: 'Inquirer',
    jest: 'Jest',
    jquery: 'jQuery',
    'jupyter-notebook': 'Jupyter Notebook',
    lambda: 'Lambda',
    leaflet: 'Leaflet',
    lodash: 'Lodash',
    mapbox: 'Mapbox',
    'mapbox-gl': 'Mapbox GL',
    'material-ui': 'Material UI',
    matplotlib: 'Matplotlib',
    'mui-x-charts': 'MUI X Charts',
    mvc: 'MVC',
    'open-api': 'OpenAPI',
    pg: 'PostgreSQL',
    pg8000: 'pg8000',
    plotly: 'Plotly',
    plpgsql: 'PL/pgSQL',
    prettier: 'Prettier',
    pymongo: 'PyMongo',
    rds: 'RDS',
    'react-query': 'React Query',
    regex: 'Regex',
    'ruby-on-rails': 'Ruby on Rails',
    'scikit-learn': 'scikit-learn',
    selenium: 'Selenium',
    splinter: 'Splinter',
    'spring-boot': 'Spring Boot',
    sqlalchemy: 'SQLAlchemy',
    'swagger-ui': 'Swagger UI',
    'tanstack-react-query': 'TanStack React Query',
    thymeleaf: 'Thymeleaf',
    'unit-testing': 'Unit Testing',
    unittest: 'unittest',
    userform: 'UserForm',
    vba: 'VBA',
    vlookup: 'VLOOKUP',
    vscode: 'VS Code',
    'web-scraping': 'Web Scraping',
    ws: 'ws',
    zod: 'Zod',
};

export const properCase = (topics: string[]): string[] => {
    const result: string[] = [];

    topics.forEach((topic) => {
        const properCase: string | undefined = ProperCase[topic];

        if (properCase) {
            result.push(properCase);
        } else {
            result.push(topic);
        }
    });

    return result;
};

/**
 * Generates a random number within a range (intended to avoid generating a random number too close to the edges).
 * @param {number} columnCount - Number of columns.
 * @param {number} previousNumber - Previous random number (ensures new random number)
 * @returns {number} - A random number within a range.
 */
export const generateValidRandomNumber = (
    columnCount: number,
    previousNumber: number
): number => {
    const threshold: number = 10;
    let randomNumber: number = Math.floor(Math.random() * columnCount);

    while (randomNumber === previousNumber) {
        randomNumber = Math.floor(Math.random() * columnCount);
    }

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
