import {Box, Chip, Typography} from "@mui/material";
import {colorScore} from "../utils";
import {ScoreTitleInterface} from "../interfaces";

export default function ScoreTitle(props: ScoreTitleInterface) {
	const {score, title} = props
	return (
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				<Typography sx={{ textTransform: 'uppercase', letterSpacing: 3, opacity: .7 }}>
					{title}
				</Typography>
				<Chip
						label={score}
						color={colorScore(score)}
				/>
			</Box>
	)
}
