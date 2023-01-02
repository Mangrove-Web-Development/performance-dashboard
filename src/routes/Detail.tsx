import * as React from 'react';
import {Box, Paper, Tab, Tabs, Typography} from '@mui/material'
import {useQuery} from '@tanstack/react-query'
import {getReports} from '../api'
import {useParams} from "react-router-dom";
import {TabPanelProps} from "../interfaces";

export function Detail() {
	const [value, setValue] = React.useState(0);

	const {pageId} = useParams()

	const {data, isSuccess} = useQuery({
		queryKey: [pageId],
		queryFn: () => getReports(pageId as string),
	})

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	// Group reports by report type
	const reports = data?.reduce((acc: any, report: any) => {
		console.log(report)
		const {Device} = report.properties
		const reportType = Device?.select?.name
		acc[reportType] = acc[reportType] || []
		acc[reportType].push(report)
		return acc
	}, {})

	const latestDesktopReport = reports?.desktop?.[0]
	const latestMobileReport = reports?.mobile?.[0]
	const clientName = latestDesktopReport?.properties?.ClientName?.rich_text[0]?.plain_text;

	function a11yProps(index: number) {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`,
		};
	}

	function TabPanel(props: TabPanelProps) {
		const { children, value, index, ...other } = props;

		return (
				<div
						role="tabpanel"
						hidden={value !== index}
						id={`simple-tabpanel-${index}`}
						aria-labelledby={`simple-tab-${index}`}
						{...other}
				>
					{value === index && (
							<Box sx={{ p: 3 }}>
								<Typography>{children}</Typography>
							</Box>
					)}
				</div>
		);
	}

	return (
			<Box sx={{ width: '100%' }}>
				<Typography variant="h4" component="div" sx={{ p: 2 }}>
					{clientName}
				</Typography>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs
							value={value}
							onChange={handleChange}
							aria-label="Details tab"
							centered
					>
						<Tab label="Mobile" {...a11yProps(0)} />
						<Tab label="Desktop" {...a11yProps(1)} />
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					Item One
				</TabPanel>
				<TabPanel value={value} index={1}>
					Item Two
				</TabPanel>
			</Box>
	)
}
