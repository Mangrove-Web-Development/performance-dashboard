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
									<Accordion key={site?.data?.desktop?.id} expanded={expanded === site?.data?.desktop?.id}
									           onChange={handleChange(site?.data?.desktop?.id)}>
										<AccordionSummary
												expandIcon={
													<svg width="18" height="10" viewBox="0 0 18 10" fill="none"
													     xmlns="http://www.w3.org/2000/svg">
														<path
																d="M0.239639 0.244056C0.559112 -0.0813333 1.07718 -0.0813889 1.39671 0.244111L8.99981 7.98817L16.6033 0.244056C16.9228 -0.0813333 17.4408 -0.0813889 17.7604 0.244111C18.0799 0.569556 18.0799 1.09717 17.7604 1.42261L9.57832 9.75594C9.42488 9.91222 9.21679 10 8.99981 10C8.78282 10 8.57468 9.91217 8.4213 9.75589L0.239694 1.42256C-0.079888 1.09717 -0.0798884 0.5695 0.239639 0.244056Z"
																fill="white"/>
													</svg>
												}
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

											<Grid container spacing={2}>
												<Grid item md={6}>
													<ScoreTitle
															title="Desktop"
															score={site?.data?.desktop?.lighthouseResult?.categories?.performance?.score * 100}
													/>

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
													<ScoreTitle
															title="Mobile"
															score={site?.data?.mobile?.lighthouseResult?.categories?.performance?.score * 100}
													/>

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
