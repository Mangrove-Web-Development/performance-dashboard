export const colorScore = (score: number) => {
    const roundedScore = Math.round(score)
    if (roundedScore > 89) return 'success'
    if (roundedScore > 49) return 'warning'
    return 'error'
}
