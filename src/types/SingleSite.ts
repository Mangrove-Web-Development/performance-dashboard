export interface SingleSite {
    id: string,
    label: string,
    createdTimestamp: number,
    psi: {
        metrics: {
            lighthouse: {
                Performance: number
            }
        }
    },
}
