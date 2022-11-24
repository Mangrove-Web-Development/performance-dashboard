export interface SingleSite {
    id: string,
    label: string,
    status: string,
    createdTimestamp: number,
    psi: {
        metadata: {
            fetchTime: string
        },
        metrics: {
            lighthouse: {
                Performance: number,
                SEO: number,
                BestPractices: number,
            }
        }
    },
}
