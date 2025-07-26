export const generateContextString = (
    context: 'Coursework / Exercise' | 'Professional' | 'Personal'
): string | null => {
    switch (context) {
        case 'Coursework / Exercise':
            return 'This project was originally created as coursework or an exercise, but has since been expanded upon.';
        case 'Professional':
            return 'This project was created for a client.';
        case 'Personal':
            return 'This project was created to solve a personal problem.';
        default:
            return null;
    }
};
