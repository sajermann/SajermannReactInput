import {
	createContext,
	useContext,
	ReactNode,
	useState,
	useMemo,
	useEffect,
} from 'react';

type DarkModeContextType = {
	darkMode: boolean;
	toggleDarkMode: () => void;
};

const darkModeContextDefaultValues: DarkModeContextType =
	{} as DarkModeContextType;

const DarkModeContext = createContext<DarkModeContextType>(
	darkModeContextDefaultValues
);

export function useDarkMode() {
	return useContext(DarkModeContext);
}

type Props = {
	children: ReactNode;
};

export function DarkModeProvider({ children }: Props) {
	const [darkMode, setDarkMode] = useState(true);

	function handleChangeDom(darkModeNow: boolean) {
		const body = document.querySelector('body');
		if (!darkModeNow) {
			if (body) {
				body.classList.remove('darkMode');
			}
			return;
		}

		if (body) {
			body.classList.add('darkMode');
		}
	}

	function toggleDarkMode() {
		sessionStorage.setItem('@sajermann/ui-react:darkMode', String(!darkMode));
		setDarkMode(!darkMode);
		handleChangeDom(!darkMode);
	}

	useEffect(() => {
		const result = sessionStorage.getItem('@sajermann/ui-react:darkMode');
		if (result) {
			setDarkMode(result === 'true');
			handleChangeDom(result === 'true');
		}
	}, []);

	const memoizedValue = useMemo(
		() => ({
			darkMode,
			toggleDarkMode,
		}),
		[darkMode]
	);

	return (
		<DarkModeContext.Provider value={memoizedValue}>
			{children}
		</DarkModeContext.Provider>
	);
}
