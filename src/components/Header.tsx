import Box from '@mui/material/Box'

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
				<img src="/logo.svg" className="logo" alt="Mangrove Performance Dashboard"/>
			</Box>
	)
}
