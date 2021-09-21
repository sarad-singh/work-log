import hbs from 'hbs'

export const registerHbsHelpers = (): void => {
    hbs.registerHelper('toLocaleDateString', (dateString: string): string => {
        if (!dateString) {
            return ""
        }
        return (new Date(dateString)).toLocaleString()
    })
    hbs.registerHelper('capitalize', (string: string): string => {
        if (!string) {
            return ""
        }
        const words = string.split(" ")
        const capitalized: string[] = []
        words.forEach(word => {
            word = word[0].toUpperCase() + word.slice(1)
            capitalized.push(word)
        })
        return capitalized.join(" ")
    })
}
