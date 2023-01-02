import React from 'react';

import { Input } from './Components/Input';

import styles from './App.module.css';

function SubContainer({ children }: { children: React.ReactNode }) {
	return <div className={styles.subContainer}>{children}</div>;
}

function unformat(value: string) {
	return parseFloat(
		value
			.replace(/[^0-9,.]/g, '')
			.replace(/[.]/g, '')
			.replace(',', '.')
	);
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
					placeholder="Apply Mask - Currency"
					onBeforeChange={{
						applyMask: {
							currency: {
								decimalPlace: 2,
							},
						},
					}}
				/>

				<Input
					placeholder="Apply Mask - Cnpj"
					onBeforeChange={{
						applyMask: {
							cnpj: true,
						},
					}}
				/>

				<Input
					placeholder="Apply Mask - Cpf"
					onBeforeChange={{
						applyMask: {
							cpf: true,
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
