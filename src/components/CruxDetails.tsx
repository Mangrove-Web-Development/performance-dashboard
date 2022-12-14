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

import {CruxInterface} from "../interfaces";

export default function CruxDetails(props: CruxInterface) {
	const {cruxValues} = props

	return (
			<Box>
				<TableContainer component={Paper}>
					<Table sx={{ backgroundColor: 'black' }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Chrome User Experience Report Results</TableCell>
								<TableCell align="right">Result</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{cruxValues && (
									// Loop through the crux values and display them
									Object.entries(cruxValues).map(([key, value]) => (
											<TableRow
													key={key}
													sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
											>
												<TableCell component="th" scope="row">
													{key}
												</TableCell>
												<TableCell align="right">{value?.category}</TableCell>
											</TableRow>
									))
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
	)
}
