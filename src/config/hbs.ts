import hbs from 'hbs'

export const registerHbsHelpers = () => {
    hbs.registerHelper('toLocaleDateString', (dateString: string) => {
        return (new Date(dateString)).toLocaleString()
    });
}
