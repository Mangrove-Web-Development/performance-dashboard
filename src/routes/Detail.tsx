import * as React from 'react';
import {Box, Tab, Tabs, Typography} from '@mui/material'
import {useQuery, useQueryClient} from '@tanstack/react-query'
import {getReport, getReports} from '../api'
import {useParams} from "react-router-dom";
import {TabPanelProps} from "../interfaces";
import CruxDetails from "../components/CruxDetails";
import LightHouseDetails from "../components/LightHouseDetails";

export function Detail() {
	const [value, setValue] = React.useState(0);
	const {pageId} = useParams()
	const queryClient = useQueryClient()

	const {data, isSuccess} = useQuery({
		queryKey: [pageId],
		queryFn: () => getReports(pageId as string),
	})

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	// Group reports by report type
	const reports = data?.reduce((acc: any, report: any) => {
		const reportType = report?.properties?.Device?.select?.name

		acc[reportType] = acc[reportType] || []
		acc[reportType].push(report)
		return acc
	}, {})

	reports?.desktop.map(async (report: any) => {
		const reportDetail = await getReport(report.id)
		let reportDetailJson = '';

		reportDetail.results.map((detail: any) => {
			reportDetailJson += detail?.paragraph?.rich_text[0]?.plain_text
		})

		report.detail = JSON.parse(reportDetailJson)
		return report
	})

	reports?.mobile.map(async (report: any) => {
		const reportDetail = await getReport(report.id)
		let reportDetailJson = '';

		reportDetail.results.map((detail: any) => {
			reportDetailJson += detail?.paragraph?.rich_text[0]?.plain_text
		})

		report.detail = JSON.parse(reportDetailJson)
		return report
	})

	queryClient.setQueryData([`${pageId}-mobile`], reports?.mobile)
	queryClient.setQueryData([`${pageId}-desktop`], reports?.desktop)

	const mobileReports = queryClient.getQueryData([`${pageId}-mobile`])
	const desktopReports = queryClient.getQueryData([`${pageId}-desktop`])

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
				{ isSuccess && (
					<>
						{ desktopReports[0].properties.ClientName.rich_text[0].plain_text && (
								<Typography align="center" variant="h4" component="div" sx={{ p: 2, mb:3 }}>
									{desktopReports[0].properties.ClientName.rich_text[0].plain_text}
								</Typography>
						) }
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
							{desktopReports[0].detail?.loadingExperience.metrics && (
									<Box sx={{marginBottom: 3}}>
										<CruxDetails cruxValues={desktopReports[0].detail?.loadingExperience?.metrics}/>
									</Box>
							)}

							{desktopReports[0].detail?.lighthouseResult && (
									<Box sx={{marginBottom: 3}}>
										<LightHouseDetails lighthouseValues={desktopReports[0].detail?.lighthouseResult?.audits}/>
									</Box>
							)}
						</TabPanel>
						<TabPanel value={value} index={1}>
							{mobileReports[0].detail?.loadingExperience.metrics && (
									<Box sx={{marginBottom: 3}}>
										<CruxDetails cruxValues={mobileReports[0].detail?.loadingExperience?.metrics}/>
									</Box>
							)}

							{mobileReports[0].detail?.lighthouseResult && (
									<Box sx={{marginBottom: 3}}>
										<LightHouseDetails lighthouseValues={mobileReports[0].detail?.lighthouseResult?.audits}/>
									</Box>
							)}
						</TabPanel>
					</>
				)}
			</Box>
	)
}
