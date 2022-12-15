import Box from '@mui/material/Box'
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from "@mui/material";
import * as React from "react";

export default function LightHouseDetails(props: Object) {
	const {lighthouseValues} = props

	return (
			<Box>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650, backgroundColor: 'black' }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Lighthouse Results</TableCell>
								<TableCell align="right">Result</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{lighthouseValues && (
									// Loop through the crux values and display them
									Object.entries(lighthouseValues).map(([key, value]) => (
											<TableRow
													key={key}
													sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
											>
												<TableCell component="th" scope="row">
													{lighthouseValues[key].title}
												</TableCell>
												<TableCell align="right">{lighthouseValues[key].displayValue}</TableCell>
											</TableRow>
									))
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
	)
}
