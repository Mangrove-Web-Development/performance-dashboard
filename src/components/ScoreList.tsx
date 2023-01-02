import {Box, BoxProps, Divider, Grid, Paper, Typography, styled} from '@mui/material'
import {Link} from 'react-router-dom'
import ScoreTitle from './ScoreTitle'
import {useQuery} from '@tanstack/react-query'
import {getClients} from '../api'

const NavLink = styled(Link)<BoxProps>(({theme}) => ({
	color: theme.palette.success.main,
	textUnderlineOffset: 4,
	marginTop: theme.spacing(2),
}));

export default function ScoreList() {

	const {data, isSuccess} = useQuery({
		queryKey: ['clients'],
		queryFn: () => getClients(import.meta.env.VITE_NOTION_REPORTS_DATABASE_ID),
	})

	return (
			<Paper sx={{padding: 3}}>
				{
						isSuccess && data.map((client: any) => (
								<Box key={client.id}>
									<Grid
											container
											spacing={2}
											justifyContent="space-between"
											alignItems="center"
											py={3}
									>
										<Grid item md={3}>
											{ client?.properties?.Name?.rich_text?.[0]?.plain_text }
											<Typography variant="subtitle2" sx={{opacity: .5}}>
												{ client?.properties?.URL?.url }
											</Typography>
										</Grid>

										<Grid item md={6}>
											<Box display="flex" gap={4}>
												<ScoreTitle
														title="Desktop"
														score={100}
												/>
												<ScoreTitle
														title="Mobile"
														score={100}
												/>
											</Box>
										</Grid>

										<NavLink to={`/${client.id}`}>See details</NavLink>

									</Grid>
									<Divider />
								</Box>
						))
				}
			</Paper>
	)
}
