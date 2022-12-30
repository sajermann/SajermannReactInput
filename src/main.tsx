import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { DarkModeProvider } from './Hooks/DarkMode';
import App from './Pages/App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<DarkModeProvider>
				<App />
			</DarkModeProvider>
		</BrowserRouter>
	</React.StrictMode>
);
