import * as React from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Paper,
	Typography,
} from '@mui/material';
import {useQueries} from "react-query";
import {usePsiQuery} from "../hooks";
import {getData} from "../api";
import {CLIENT_LIST} from "../constants";
import CruxDetails from "./CruxDetails";
import LightHouseDetails from "./LightHouseDetails";
import { timestampToDate } from "../utils";

export default function MainTable() {
	const [expanded, setExpanded] = React.useState<string | false>(false);

	const handleChange =
			(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
				setExpanded(isExpanded ? panel : false);
			};


	const clientQueries = useQueries(
			CLIENT_LIST.map((client, index) => ({
						queryKey: [`client-${index}`],
						queryFn: () => getData(usePsiQuery(client)),
					})
			)
	)

	return (
			<Paper sx={{width: '100%', overflow: 'hidden'}}>
				{clientQueries?.map((site, index) => (
						<div key={`report-${index}`}>
							{site.isLoading && (
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
							{site.isFetched && (
									<Accordion key={site?.data?.id} expanded={expanded === site?.data?.id} onChange={handleChange(site?.data?.id)}>
										<AccordionSummary
												expandIcon={
													<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path
																d="M0.239639 0.244056C0.559112 -0.0813333 1.07718 -0.0813889 1.39671 0.244111L8.99981 7.98817L16.6033 0.244056C16.9228 -0.0813333 17.4408 -0.0813889 17.7604 0.244111C18.0799 0.569556 18.0799 1.09717 17.7604 1.42261L9.57832 9.75594C9.42488 9.91222 9.21679 10 8.99981 10C8.78282 10 8.57468 9.91217 8.4213 9.75589L0.239694 1.42256C-0.079888 1.09717 -0.0798884 0.5695 0.239639 0.244056Z"
																fill="white"/>
													</svg>
												}
												aria-controls="panel1bh-content"
												id="panel1bh-header"
										>
											<Typography sx={{width: '33%', flexShrink: 0}}>
												{site?.data?.id}
											</Typography>
											<Typography sx={{color: 'text.secondary'}}>
												<b>Report Time:</b> {timestampToDate(site?.data?.analysisUTCTimestamp)}
											</Typography>
										</AccordionSummary>
										<AccordionDetails>
											{site?.data?.loadingExperience.metrics && (
													<Box sx={{marginBottom: 3 }}>
														<CruxDetails cruxValues={site?.data?.loadingExperience.metrics}/>
													</Box>
											)}

											{site?.data?.lighthouseResult && (
													<Box sx={{marginBottom: 3 }}>
														<LightHouseDetails lighthouseValues={site?.data?.lighthouseResult?.audits}/>
													</Box>
											)}

										</AccordionDetails>
									</Accordion>
							)}
						</div>
				))}
			</Paper>
	)
}
