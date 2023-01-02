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
				Input mais próximo possível do vanilla:
				<Input placeholder="Sem Label" />
				<Input
					placeholder="Com debounce"
					onChange={e => console.log(e.target.value)}
					debounce={2000}
				/>
				<Input
					placeholder="Antigo"
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
					placeholder="Novo"
					onChange={e => console.log(e.target.value)}
					onBeforeChange={{
						fn: e => {
							const temp = { ...e };

							temp.target.value = atacado({
								value: temp.target.value,
								decimal_place: 4,
							});

							return temp;
						},
					}}
				/>
				<Input
					placeholder="Correto que nao funciona"
					onChange={e => console.log(e.target.value)}
					onBeforeChange={{
						fn: e => {
							const temp = { ...e };
							const valueUnformated = unformat(temp.target.value);
							console.log({ valueUnformated });
							temp.target.value = formatForReal(valueUnformated);

							return temp;
						},
					}}
				/>
			</SubContainer>

			<SubContainer>
				<div>
					É possível adicionar label no input através da propriedade
					<span className="highlight"> customlabel</span> ou colocando a label
					por fora caso queira uma personalização mais livre:
				</div>
				<div>
					<Input
						labelProps={{ children: <span>Com Label no Top</span> }}
						id="withLabelInTop"
					/>

					<Input
						containerProps={{
							style: {
								display: 'flex',
								flexDirection: 'column',
							},
						}}
						labelProps={{
							children: 'Com Label na esquerda',
							className: 'Batata',
						}}
						id="withLabelinLeft"
						label="BaTATA"
					/>
				</div>
			</SubContainer>

			<div>
				Através da propriedade <span className="highlight">onBeforeChange</span>{' '}
				é possível bloquear caracteres indesejados no momento do onChange, os
				bloqueios pré definidos são <span className="highlight">number</span> |{' '}
				<span className="highlight">removeLetterUpper</span> |{' '}
				<span className="highlight">removeLetterLow</span> |{' '}
				<span className="highlight">removeSpecialCharacter</span> e você também
				pode informar um regex personalizado através da opção{' '}
				<span className="highlight">regexForReplace</span>, veja abaixo os
				exemplos:
				<div>
					<Input
						placeholder="Bloquear números"
						onBeforeChange={{ removeNumber: true }}
					/>
					<Input
						placeholder="Bloquear letras"
						onBeforeChange={{ removeLetterLow: true, removeLetterUpper: true }}
					/>
					<Input
						placeholder="Bloquear letras maiúsculas"
						onBeforeChange={{ removeLetterUpper: true }}
					/>
					<Input
						placeholder="Bloquear letras minúsculas"
						onBeforeChange={{ removeLetterLow: true }}
					/>
					<Input
						placeholder="Bloquear caracteres especiais"
						onBeforeChange={{ removeSpecialCharacter: true }}
					/>
					<Input
						placeholder="Bloquear números do 1 ao 5"
						onBeforeChange={{ regexForReplace: /[1-5]/g }}
					/>
				</div>
			</div>
		</main>
	);
}

export default App;
