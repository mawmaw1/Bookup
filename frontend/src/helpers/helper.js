export const getPlaceholder = (q) => {
    if (q === "1") {
        return "Enter city name"
    } else if (q === "2") {
        return "Enter book title"
    } else if (q === "3") {
        return "Enter author name"
    } else if (q === "4") {
        return "Enter geolocation"
    }
}