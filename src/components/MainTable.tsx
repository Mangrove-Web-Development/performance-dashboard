import * as React from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Chip,
	Paper,
	Typography,
} from '@mui/material';
import {SingleSite, TableColumn} from '../types'
import {colorScore} from '../utils'
import {useQuery} from "react-query";
import {usePsiQuery} from "../hooks";
import {getData} from "../api";
import {CLIENT_LIST} from "../constants";
import CruxDetails from "./CruxDetails";
import LightHouseDetails from "./LightHouseDetails";


const columns: readonly TableColumn[] = [
	{id: 'name', label: 'Name', minWidth: 170},
	{id: 'time', label: 'Test Time', minWidth: 100},
	{
		id: 'performance',
		label: 'Performance',
		minWidth: 170,
		format: (value: number) => value.toLocaleString('en-US'),
	},
	{
		id: 'seo',
		label: 'SEO',
		minWidth: 170,
		format: (value: number) => value.toLocaleString('en-US'),
	},
	{
		id: 'best-practices',
		label: 'Best Practices',
		minWidth: 170,
		format: (value: number) => value.toFixed(2),
	},
];

export default function MainTable() {
	const [expanded, setExpanded] = React.useState<string | false>(false);

	const handleChange =
			(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
				setExpanded(isExpanded ? panel : false);
			};

	const {data} = useQuery('sites', async () => {
		// Loop through the list of clients and get the data for each site
		return await Promise.all(CLIENT_LIST.map(async (client: string) => {
			const query = usePsiQuery(client);
			return await getData(query);
		}))
	})

	return (
			<Paper sx={{width: '100%', overflow: 'hidden'}}>
				{data?.map((site) => (
						<Accordion key={site.id} expanded={expanded === site.id} onChange={handleChange(site.id)}>
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
									{site.id}
								</Typography>
								<Typography sx={{color: 'text.secondary'}}>{site.analysisUTCTimestamp}</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Box sx={{marginBottom: 3 }}>
									<CruxDetails cruxValues={site.loadingExperience.metrics}/>
								</Box>
								<LightHouseDetails lighthouseValues={site.lighthouseResult.audits}/>
							</AccordionDetails>
						</Accordion>
				))}
			</Paper>
	)
}
