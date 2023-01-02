import Box from '@mui/material/Box'
import {Link} from 'react-router-dom'

export default function Header() {
	return (
			<Box
					sx={{
						borderBottom: '1px solid',
						borderBottomColor: 'divider',
						padding: 2,
						textAlign: 'center',
						marginBottom: 4
					}}>
				<Link to="/">
					<img src="/logo.svg" className="logo" alt="Mangrove Performance Dashboard"/>
				</Link>
			</Box>
	)
}
