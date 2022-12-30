export const ex1 = `<Input placeholder="Sem Label" />
<Input placeholder="Com onChange" onChange={e => console.log(e)} />
<Input placeholder="Com Class" className="MyClass" />
`;

export const ex2 = `<Input
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
`;

export const ex3 = `<Input
	customlabel={{ text: 'Com anexo de texto no início' }}
	startAttach="http://"
	id="withAttchText"
/>

<Input
customlabel={{ text: 'Com anexo personalizado no início' }}
startAttach={
	<div
		style={{
			backgroundColor: 'blue',
			height: '100%',
			alignItems: 'center',
			justifyContent: 'center',
			display: 'flex',
			width: '115px',
		}}
	>
		http://
	</div>
}
	id="withAttchTextCustom"
/>

<Input
	customlabel={{ text: 'Com anexo de texto no fim' }}
	endAttach=".com"
	id="withAttchTextEnd"
/>

<Input
	customlabel={{ text: 'Com anexo personalizado no fim' }}
	endAttach={
		<div
			style={{
				backgroundColor: 'blue',
				height: '100%',
				alignItems: 'center',
				justifyContent: 'center',
				display: 'flex',
				width: '115px',
			}}
		>
			.com
		</div>
	}
	id="withAttchTextCustomEnd"
/>

<Input
	customlabel={{ text: 'Com anexo de texto no início e no fim' }}
	id="attchStartAndEnd"
	startAttach="http://"
	endAttach=".com"
/>

<Input
	customlabel={{
		text: 'Com anexo de personalizado no início e no fim',
	}}
	id="attchStartAndEnd"
	startAttach={
		<div
			style={{
				backgroundColor: 'blue',
				height: '100%',
				alignItems: 'center',
				justifyContent: 'center',
				display: 'flex',
				width: '115px',
			}}
		>
			http://
		</div>
	}
	endAttach={
		<div
			style={{
				backgroundColor: 'blue',
				height: '100%',
				alignItems: 'center',
				justifyContent: 'center',
				display: 'flex',
				width: '115px',
			}}
		>
			.com
		</div>
	}
/>`;

export const ex4 = `<Input
	placeholder="Conteúdo dentro no início"
	startContent={
		<Button
			style={{ minWidth: '10px', height: '31px' }}
			colorStyle="Success"
			variant="Option"
			type="button"
			onClick={() => alert('Clicou')}
			endIcon={<WhatsappLogo size={30} />}
		/>
	}
/>
<Input
	placeholder="Conteúdo dentro no fim"
	endContent={
		<Button
			style={{ minWidth: '10px', height: '31px' }}
			colorStyle="Secondary"
			variant="Option"
			type="button"
			onClick={() => alert('Clicou')}
			endIcon={<YoutubeLogo size={30} />}
		/>
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
`;

export const ex5 = `<Input
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
/>`;
