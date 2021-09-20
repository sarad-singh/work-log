import hbs from 'hbs'

export const registerHbsHelpers = (): void => {
    hbs.registerHelper('toLocaleDateString', (dateString: string): string => {
        return (new Date(dateString)).toLocaleString()
    });
}
