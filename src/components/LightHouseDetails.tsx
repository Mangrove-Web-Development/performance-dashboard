import Box from '@mui/material/Box'
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import * as React from "react";

import {LighthouseInterface} from "../interfaces";

export default function LightHouseDetails(props: LighthouseInterface) {
	const {lighthouseValues} = props

	return (
			<Box>
				<TableContainer component={Paper}>
					<Table sx={{backgroundColor: 'black'}} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Lighthouse Results</TableCell>
								<TableCell align="right">Result</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{lighthouseValues && (
									Object.entries(lighthouseValues).map(([key, value]) => {
										if (lighthouseValues[key].displayValue)
											return (
													<TableRow
															key={key}
															sx={{'&:last-child td, &:last-child th': {border: 0}}}
													>
														<TableCell component="th" scope="row">
															{lighthouseValues[key].title}
														</TableCell>
														<TableCell align="right">{lighthouseValues[key].displayValue}</TableCell>
													</TableRow>
											)
									})
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
	)
}
