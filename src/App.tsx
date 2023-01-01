import React from 'react';
import { Input } from './Components/Input';

import styles from './App.module.css';

function SubContainer({ children }: { children: React.ReactNode }) {
	return <div className={styles.subContainer}>{children}</div>;
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
					placeholder="Sem debounce"
					onChange={e => console.log(e.target.value)}
					removeBeforeChange={{
						fn: e => {
							const temp = { ...e };
							temp.target.value = formatarStringForReal(temp.target.value);

							return temp;
						},
					}}
				/>
				<Input placeholder="Com Class" className="MyClass" />
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
				Através da propriedade{' '}
				<span className="highlight">removeBeforeChange</span> é possível
				bloquear caracteres indesejados no momento do onChange, os bloqueios pré
				definidos são <span className="highlight">number</span> |{' '}
				<span className="highlight">letterUpper</span> |{' '}
				<span className="highlight">letterLow</span> |{' '}
				<span className="highlight">specialCharacter</span> e você também pode
				informar um regex personalizado através da opção{' '}
				<span className="highlight">regexForReplace</span>, veja abaixo os
				exemplos:
				<div>
					<Input
						placeholder="Bloquear números"
						removeBeforeChange={{ number: true }}
					/>
					<Input
						placeholder="Bloquear letras"
						removeBeforeChange={{ letterLow: true, letterUpper: true }}
					/>
					<Input
						placeholder="Bloquear letras maiúsculas"
						removeBeforeChange={{ letterUpper: true }}
					/>
					<Input
						placeholder="Bloquear letras minúsculas"
						removeBeforeChange={{ letterLow: true }}
					/>
					<Input
						placeholder="Bloquear caracteres especiais"
						removeBeforeChange={{ specialCharacter: true }}
					/>
					<Input
						placeholder="Bloquear números do 1 ao 5"
						removeBeforeChange={{ regexForReplace: /[1-5]/g }}
					/>
				</div>
			</div>
		</main>
	);
}

export default App;
