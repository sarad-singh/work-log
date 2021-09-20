import hbs from 'hbs'

export const registerHbsHelpers = (): void => {
    hbs.registerHelper('toLocaleDateString', (dateString: string): string => {
        return (new Date(dateString)).toLocaleString()
    })
    hbs.registerHelper('capitalize', (string: string): string => {
        const words = string.split(" ")
        const capitalized: string[] = []
        words.forEach(word => {
            word = word[0].toUpperCase() + word.slice(1)
            capitalized.push(word)
        })
        console.log(capitalized.join(" "))
        return capitalized.join(" ")
    });
}
