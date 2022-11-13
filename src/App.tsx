import Header from "./components/Header";
import MainTable from "./components/MainTable";
import './App.css'
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="App">
                <Header/>
                <Container>
	                <MainTable />
                </Container>
            </div>
        </ThemeProvider>
    )
}

export default App
