import { clamp } from "./clamp"

export function hexToHsla(hex: string = "#ddd", theme: "dark" | "light" | "system", alpha = 1) {
    // Remove the hash symbol if it exists
    hex = hex.replace('#', '')

    const r = parseInt(hex.substring(0, 2), 16) / 255
    const g = parseInt(hex.substring(2, 4), 16) / 255
    const b = parseInt(hex.substring(4, 6), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    let l = (max + min) / 2

    if (max === min) {
        h = s = 0
    } else {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break
            case g: h = (b - r) / d + 2; break
            case b: h = (r - g) / d + 4; break
        }

        h /= 6
    }

    h = Math.round(h * 360)
    s = clamp(Math.round(s * 100) + (theme === "dark" ? 0 : -10), 0, 100)
    l = clamp(Math.round(l * 100) + (theme === "dark" ? -0 : 10), 0, 100)
    return `hsla(${h}, ${s}%, ${l}%, ${alpha})`
}
