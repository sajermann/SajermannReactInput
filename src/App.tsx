/* eslint-disable camelcase */
import React from 'react';

import { Input } from './Components/Input';

import styles from './App.module.css';

function SubContainer({ children }: { children: React.ReactNode }) {
	return <div className={styles.subContainer}>{children}</div>;
}

function formatForReal(
	value: number,
	maximumSignificantDigits?: number
): string {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		maximumSignificantDigits,
	}).format(value);
}

function unformat(value: string) {
	return parseFloat(
		value
			.replace(/[^0-9,.]/g, '')
			.replace(/[.]/g, '')
			.replace(',', '.')
	);
}

type Props = {
	value: string;
	decimal_place?: number;
	thousand_separator?: string;
	decimal_separator?: string;
};

function atacado({
	value,
	decimal_place = 2,
	thousand_separator = '.',
	decimal_separator = ',',
}: Props) {
	const decimais_ele = 10 ** decimal_place;
	const thousand_separator_formatted = `$1${thousand_separator}`;
	let v = value.replace(/\D/g, '');
	v = `${(+v / decimais_ele).toFixed(decimal_place)}`;
	const splits = v.split('.');
	const p_parte = splits[0]
		.toString()
		.replace(/(\d)(?=(\d{3})+(?!\d))/g, thousand_separator_formatted);
	const final =
		typeof splits[1] === 'undefined'
			? p_parte
			: p_parte + decimal_separator + splits[1];

	return `R$ ${final}`;
}

function formatarStringForReal(valor: string) {
	try {
		const newValue = valor.replace(/\D/g, '');
		const arrayValues = `${(Number(newValue) / 100).toFixed(2)}`.split('.');
		const arrayValuesMain = arrayValues[0]
			.split('')
			.reverse()
			.join('')
			.match(/.{1,3}/g);

		if (!arrayValuesMain) {
			return 'R$ 0,00';
		}

		for (let i = 0; i < arrayValuesMain.length; i += 1)
			arrayValuesMain[i] = `${arrayValuesMain[i]
				.split('')
				.reverse()
				.join('')}.`;

		const valueMain = arrayValuesMain.reverse().join('');

		return `R$ ${valueMain.substring(0, valueMain.lastIndexOf('.'))},${
			arrayValues[1]
		}`;
	} catch {
		return 'R$ 0,00';
	}
}

function App() {
	return (
		<main className={styles.main}>
			<div>
				<div>{`import { Input } from '@sajermann/ui-react';`}</div>
			</div>

			<SubContainer>
				<Input
					placeholder="Label Simples"
					id="Label Simples"
					label="Label Simples"
				/>
				<Input
					placeholder="Label Props"
					labelProps={{
						children: 'Test',
						style: { color: 'red' },
					}}
					id="Label Props"
				/>
				<Input
					placeholder="Container Props"
					id="Container Props"
					label="Container Props"
					containerProps={{
						style: {
							display: 'flex',
							flexDirection: 'column',
							border: '1px solid',
							width: 300,
						},
					}}
				/>

				<Input
					placeholder="On Change"
					onChange={e => console.log(e.target.value)}
				/>

				<Input
					placeholder="Remove Number"
					onBeforeChange={{ removeNumber: true }}
				/>

				<Input
					placeholder="Remove All Letter"
					onBeforeChange={{ removeLowerCase: true, removeUpperCase: true }}
				/>

				<Input
					placeholder="Remove Upper Case"
					onBeforeChange={{ removeUpperCase: true }}
				/>

				<Input
					placeholder="Remove Lower Case"
					onBeforeChange={{ removeLowerCase: true }}
				/>

				<Input
					placeholder="Remove Special Character"
					onBeforeChange={{ removeSpecialCharacter: true }}
				/>

				<Input
					placeholder="Remove numbers from 1 to 5"
					onBeforeChange={{ regexForReplace: /[1-5]/g }}
				/>

				<Input
					placeholder="Function Before Change"
					onChange={e => console.log(e.target.value)}
					onBeforeChange={{
						fn: e => {
							const temp = { ...e };

							temp.target.value = formatarStringForReal(temp.target.value);

							return temp;
						},
					}}
				/>

				<Input
					placeholder="Debounce 2 seconds"
					onChange={e => console.log(e.target.value)}
					debounce={2000}
				/>
			</SubContainer>
		</main>
	);
}

export default App;
