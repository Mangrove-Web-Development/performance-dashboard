import './App.css'
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {Routes, Route} from "react-router-dom";
import {QueryClient} from "@tanstack/react-query";
import {PersistQueryClientProvider} from "@tanstack/react-query-persist-client";
import {createSyncStoragePersister} from "@tanstack/query-sync-storage-persister";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {compress, decompress} from 'lz-string';
import {Layout} from './layouts/Dashboard'
import {Home} from './routes/Home'
import {Detail} from './routes/Detail'

const theme = createTheme({
	palette: {
		mode: 'dark',
	},
})

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retryDelay: 5000,
			staleTime: (1000 * 60) * 60, // 1 hour
			cacheTime: (1000 * 60) * 60, // 1 hour
		}
	}
})

const persister = createSyncStoragePersister({
	storage: window.localStorage,
	serialize: data => compress(JSON.stringify(data)),
	deserialize: data => JSON.parse(decompress(data) as string),
});

function App() {

	return (
			<PersistQueryClientProvider
					client={queryClient}
					persistOptions={{persister}}
			>
				<ThemeProvider theme={theme}>
					<Routes>
						<Route path="/" element={<Layout/>}>
							<Route index element={<Home/>}/>
							<Route path="/:pageId" element={<Detail/>}/>
						</Route>
					</Routes>
				</ThemeProvider>
				<ReactQueryDevtools initialIsOpen={false}/>
			</PersistQueryClientProvider>
	)
}

export default App
