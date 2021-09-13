import hbs from 'hbs'

export const registerHbsHelpers = () => {
    hbs.registerHelper('toLocaleDateString', (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleString()
    });
}
