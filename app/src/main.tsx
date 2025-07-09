// React
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Custom contexts
import ProjectsContextProvider from './contexts/ProjectsContext';
import ViewCountContextProvider from './contexts/ViewCountContext/ViewCountContext';

// Components
import App from './App.tsx';

const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ProjectsContextProvider>
                <ViewCountContextProvider>
                    <App />
                </ViewCountContextProvider>
            </ProjectsContextProvider>
        </QueryClientProvider>
    </StrictMode>
);
