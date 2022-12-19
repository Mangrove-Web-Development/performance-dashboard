import * as React from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Grid,
	Paper,
	Typography,
} from '@mui/material';
import {useQueries} from "@tanstack/react-query";
import {usePsiQuery} from "../hooks";
import {getData} from "../api";
import {CLIENT_LIST} from "../constants";
import CruxDetails from "./CruxDetails";
import LightHouseDetails from "./LightHouseDetails";
import {timestampToDate, colorScore} from "../utils";
import ScoreTitle from "./ScoreTitle";

export default function MainTable() {
	const [expanded, setExpanded] = React.useState<string | false>(false);

	const handleChange =
			(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
				setExpanded(isExpanded ? panel : false);
			};

	const getDesktopAndMobileData = async (client: string) => {
		return {
			desktop: await getData(usePsiQuery(client, 'DESKTOP')),
			mobile: await getData(usePsiQuery(client, 'MOBILE')),
		}
	}


	const clientQueries = useQueries({
		queries: CLIENT_LIST.map(client => ({
			queryKey: ['client', client],
			queryFn: () => getDesktopAndMobileData(client),
		}))
	})

	return (
			<Paper sx={{width: '100%', overflow: 'hidden'}}>
				{clientQueries?.map((site, index) => (
						<div key={`report-${index}`}>
							{site?.isLoading && (
									<Box sx={{
										height: '48px',
										padding: '0 16px',
										display: 'flex',
										alignItems: 'center',
										backgroundColor: 'warning.light',
										borderBottom: '1px solid #e0e0e0',
									}}>
										Creating report...
									</Box>
							)}
							{site?.isFetched && (
									<Accordion
											key={site?.data?.desktop?.id}
											expanded
									>
										<AccordionSummary
												aria-controls="panel1bh-content"
												id="panel1bh-header"
										>
											<Typography sx={{width: '33%', flexShrink: 0}}>
												{site?.data?.desktop?.id}
											</Typography>
											<Typography sx={{color: 'text.secondary'}}>
												<b>Report Time:</b> {timestampToDate(site?.data?.desktop?.analysisUTCTimestamp)}
											</Typography>
										</AccordionSummary>
										<AccordionDetails>

											<Grid container spacing={2} mb={1}>
												<Grid item md={6}>
													<ScoreTitle
															title="Desktop"
															score={site?.data?.desktop?.lighthouseResult?.categories?.performance?.score * 100}
													/>
												</Grid>
												<Grid item md={6}>
													<ScoreTitle
															title="Mobile"
															score={site?.data?.mobile?.lighthouseResult?.categories?.performance?.score * 100}
													/>
												</Grid>
											</Grid>


											<Grid container spacing={2} sx={{ maxHeight: '300px', overflow: 'auto' }}>
												<Grid item md={6}>
													{site?.data?.desktop?.loadingExperience.metrics && (
															<Box sx={{marginBottom: 3}}>
																<CruxDetails cruxValues={site?.data?.desktop?.loadingExperience.metrics}/>
															</Box>
													)}

													{site?.data?.desktop?.lighthouseResult && (
															<Box sx={{marginBottom: 3}}>
																<LightHouseDetails lighthouseValues={site?.data?.desktop?.lighthouseResult?.audits}/>
															</Box>
													)}
												</Grid>
												<Grid item md={6}>
													{site?.data?.mobile?.loadingExperience.metrics && (
															<Box sx={{marginBottom: 3}}>
																<CruxDetails cruxValues={site?.data?.mobile?.loadingExperience.metrics}/>
															</Box>
													)}

													{site?.data?.mobile?.lighthouseResult && (
															<Box sx={{marginBottom: 3}}>
																<LightHouseDetails lighthouseValues={site?.data?.mobile?.lighthouseResult?.audits}/>
															</Box>
													)}
												</Grid>
											</Grid>

										</AccordionDetails>
									</Accordion>
							)}
						</div>
				))}
			</Paper>
	)
}
