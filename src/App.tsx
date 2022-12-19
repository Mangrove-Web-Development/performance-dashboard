import Header from "./components/Header";
import MainTable from "./components/MainTable";
import './App.css'
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {QueryClient, QueryClientProvider} from "react-query";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ReactQueryDevtools } from 'react-query/devtools'

const theme = createTheme({
	palette: {
		mode: 'dark',
	},
})

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retryDelay: 10000,
			staleTime: (1000 * 60) * 30, // 30 minutes
		}
	}
})

function App() {

	return (
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<CssBaseline/>
					<div className="App">
						<Header/>
						<Container>
							<MainTable/>
						</Container>
					</div>
				</ThemeProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
	)
}

export default App
