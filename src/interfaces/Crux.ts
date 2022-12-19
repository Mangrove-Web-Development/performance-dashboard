interface CruxValueInterface {
    category: string
}

export interface CruxInterface {
    cruxValues: {
        CUMULATIVE_LAYOUT_SHIFT_SCORE: CruxValueInterface,
        EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT: CruxValueInterface,
        EXPERIMENTAL_TIME_TO_FIRST_BYTE: CruxValueInterface,
        FIRST_CONTENTFUL_PAINT_MS: CruxValueInterface,
        LARGEST_CONTENTFUL_PAINT_MS: CruxValueInterface,
    }
}
