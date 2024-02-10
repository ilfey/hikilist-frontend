export const toggleTheme = ({ commit }, newTheme) => {

    console.log(newTheme);

    // Apply theme
    const d = document.documentElement
    
    if (newTheme === "dark") {
        d.classList.add("dark")
    } else {
        d.classList.remove("dark")
    }

    // Save theme in localStorage
    localStorage.setItem("theme", newTheme)

    // Mutate store
    commit("setTheme", newTheme)
}