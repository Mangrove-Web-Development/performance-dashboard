import Header from "./components/Header";
import MainTable from "./components/MainTable";
import './App.css'
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { compress, decompress } from 'lz-string';

const theme = createTheme({
	palette: {
		mode: 'dark',
	},
})

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retryDelay: 5000,
			staleTime: (1000 * 60) * 30, // 30 minutes
			cacheTime: 1000 * 60 * 60 * 12, // 12 hours
		}
	}
})

const persister = createSyncStoragePersister({
	storage: window.localStorage,
	serialize: data => compress(JSON.stringify(data)),
	deserialize: data => JSON.parse(decompress(data)),
});

function App() {

	return (
			<PersistQueryClientProvider
					client={queryClient}
					persistOptions={{ persister }}
			>
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
			</PersistQueryClientProvider>
	)
}

export default App
