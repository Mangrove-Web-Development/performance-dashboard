import * as React from 'react';
import {useEffect} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';
import {SingleSite, TableColumn} from '../types'

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
		id: 'size',
		label: 'Size\u00a0(km\u00b2)',
		minWidth: 170,
		align: 'right',
		format: (value: number) => value.toLocaleString('en-US'),
	},
	{
		id: 'density',
		label: 'Density',
		minWidth: 170,
		align: 'right',
		format: (value: number) => value.toFixed(2),
	},
];

export default function MainTable() {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [siteData, setSiteData] = React.useState([]);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	useEffect(() => {
		fetch('https://courageous-panda-3bd74c.netlify.app/output/results.json')
				.then((response) => response.json())
				.then((data) => {
					setSiteData(data.results)
				})
	}, [])

	return (
			<Paper sx={{width: '100%', overflow: 'hidden'}}>
				<TableContainer sx={{maxHeight: 440}}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{columns.map((column) => (
										<TableCell
												key={column.id}
												align={column.align}
												style={{minWidth: column.minWidth}}
										>
											{column.label}
										</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{siteData
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((site: SingleSite) => {
										return (
												<TableRow hover tabIndex={-1} key={site.id}>
													<TableCell>{site.label}</TableCell>
													<TableCell>{site.createdTimestamp}</TableCell>
													<TableCell>{site.psi.metrics.lighthouse.Performance * 100}</TableCell>
												</TableRow>
										);
									})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
						rowsPerPageOptions={[10, 25, 100]}
						component="div"
						count={siteData.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
	)
}
