/* eslint-disable jsx-a11y/label-has-associated-control */
import { Scales, WhatsappLogo, YoutubeLogo } from 'phosphor-react';
import React from 'react';
import { Input } from './Components/Input';

import styles from './App.module.css';

function SubContainer({ children }: { children: React.ReactNode }) {
	return <div className={styles.subContainer}>{children}</div>;
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
				<Input placeholder="Com onChange" onChange={e => console.log(e)} />
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
						customlabel={{ text: 'Com Label no Top' }}
						id="withLabelInTop"
					/>

					<Input
						customlabel={{ text: 'Com Label na esquerda', position: 'Left' }}
						id="withLabelinLeft"
					/>
					<label
						style={{
							width: '100%',
							background: 'green',
							color: 'white',
						}}
					>
						Label personalizada
						<Input />
					</label>
				</div>
			</SubContainer>

			<div>
				Você pode anexar informações ao seu input através das propriedades{' '}
				<span className="highlight">startAttach</span> e{' '}
				<span className="highlight">endAttach</span>, essas informações podem
				ser de texto ou conteúdo:
				<div>
					<Input
						customlabel={{ text: 'Com anexo de texto no início' }}
						id="withAttchText"
					/>

					<Input
						customlabel={{ text: 'Com anexo personalizado no início' }}
						id="withAttchTextCustom"
					/>

					<Input
						customlabel={{ text: 'Com anexo de texto no fim' }}
						id="withAttchTextEnd"
					/>

					<Input
						customlabel={{ text: 'Com anexo personalizado no fim' }}
						id="withAttchTextCustomEnd"
					/>

					<Input
						customlabel={{ text: 'Com anexo de texto no início e no fim' }}
						id="attchStartAndEnd"
					/>

					<Input
						customlabel={{
							text: 'Com anexo de personalizado no início e no fim',
						}}
						id="attchStartAndEndCustom"
					/>
				</div>
			</div>

			<div>
				Através da propriedade <span className="highlight">startContent</span> e{' '}
				<span className="highlight">endContent</span> é possível inserir
				conteúdo dentro do input:
				<div>
					<Input
						placeholder="Conteúdo dentro no início"
						startContent={
							<button
								style={{ minWidth: '10px', height: '31px' }}
								type="button"
								onClick={() => alert('Clicou')}
							>
								<WhatsappLogo size={30} />
							</button>
						}
					/>
					<Input
						placeholder="Conteúdo dentro no fim"
						endContent={
							<button
								style={{ minWidth: '10px', height: '31px' }}
								type="button"
								onClick={() => alert('Clicou')}
							>
								<YoutubeLogo size={30} />
							</button>
						}
					/>
					<Input
						type="number"
						step="any"
						placeholder="Conteúdo dentro no início e no fim"
						onChange={e => console.log({ e })}
						startContent={
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: '40px',
									height: '30px',
									color: 'black',
								}}
							>
								<Scales size={30} />
							</div>
						}
						endContent={
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: '40px',
									height: '32px',
									fontSize: '20px',
									fontWeight: 'bold',
									color: 'black',
								}}
							>
								KG
							</div>
						}
					/>
				</div>
			</div>

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
