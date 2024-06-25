export const formatDate = (date) => {
    let formattedDate = new Date(date).getFullYear();
    let results = ''
    if (formattedDate) {
        results = formattedDate
    } else {
        results = date[0].toUpperCase() + date.slice(1)
    }
    return results;
}