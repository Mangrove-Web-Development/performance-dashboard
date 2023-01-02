import {
	CssBaseline,
	Container,
} from '@mui/material'
import Header from '../components/Header'
import {Outlet} from 'react-router-dom'

export function Layout() {
	return (
			<>
				<CssBaseline/>
				<div className="App">
					<Header/>
					<Container>
						<Outlet/>
					</Container>
				</div>
			</>
	)
}
