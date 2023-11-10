import React, { useRef, useState } from 'react';

import { Input } from './ComponentsNpm/Input';

import styles from './App.module.css';

function SubContainer({ children }: { children: React.ReactNode }) {
	return <div className={styles.subContainer}>{children}</div>;
}

function addMessage(valor: string) {
	const result = valor.replace('Very Good - ', '');
	return `Very Good - ${result}`;
}

function App() {
	const [controlledValue, setControlledValue] = useState('');
	const ref = useRef<HTMLInputElement>(null);
	return (
		<main className={styles.main}>
			<div>
				<div>{`import { Input, ISajermannReactInput } from '@sajermann/ui-react';`}</div>
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
				<Input placeholder="On Change" onChange={console.log} />
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
					onChange={console.log}
					onBeforeChange={{
						fn: e => {
							const temp = { ...e };

							temp.target.value = addMessage(temp.target.value);

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
					placeholder="Apply Mask - Cep"
					onBeforeChange={{
						applyMask: {
							cep: true,
						},
					}}
				/>
				<Input
					placeholder="Debounce 2 seconds"
					onChange={console.log}
					debounce={2000}
				/>
				<Input
					placeholder="Controlled"
					onChange={e => setControlledValue(e.target.value)}
					value={controlledValue}
				/>
				Controlled Value: {controlledValue}
				<Input ref={ref} placeholder="Ref - Focus" />
				<button
					type="button"
					style={{ width: 173 }}
					onClick={() => ref.current?.focus()}
				>
					Focus
				</button>
				<Input
					placeholder="Errors"
					containerProps={{
						style: {
							display: 'flex',
							flexDirection: 'column',
							width: 173,
						},
					}}
					errorContainerProps={{
						style: {
							display: 'flex',
							flexDirection: 'column',
							color: 'red',
							fontSize: 14,
						},
					}}
					errors={['Required', 'Invalid email adress']}
				/>
				<Input placeholder="Render Top" renderTop={<div>Element In Top</div>} />
				<Input
					placeholder="Render Bottom"
					renderBottom={<div>Element In Top</div>}
				/>
				<Input
					placeholder="Custom Error"
					containerProps={{
						style: {
							position: 'relative',
							width: 173,
						},
					}}
					renderBottom={
						<div
							style={{
								position: 'absolute',
								top: 2,
								right: 10,
								color: 'black',
								cursor: 'pointer',
							}}
							title="Invalid email adress"
						>
							i
						</div>
					}
				/>
			</SubContainer>
		</main>
	);
}

export default App;
