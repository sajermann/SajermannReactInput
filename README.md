# @sajermann/react-input

Library created for implements super power in input.

## Install

```npm i @sajermann/react-input```

## Links

[NPM](https://www.npmjs.com/package/@sajermann/react-input)
[Github](https://github.com/sajermann/SajermannReactInput)

## Props
**label?:** string; **Note:** Override in label attribute input;

**labelProps?:** React.DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;

**containerProps?:** React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

**onChange?:** (e: React.ChangeEvent<HTMLInputElement>) => void;

**onBeforeChange?:** {
&nbsp;&nbsp;&nbsp;&nbsp;removeNumber?: boolean;
&nbsp;&nbsp;&nbsp;&nbsp;removeLetterUpper?: boolean;
&nbsp;&nbsp;&nbsp;&nbsp;removeLetterLow?: boolean;
&nbsp;&nbsp;&nbsp;&nbsp;removeSpecialCharacter?: boolean;
&nbsp;&nbsp;&nbsp;&nbsp;regexForReplace?: RegExp;
&nbsp;&nbsp;&nbsp;&nbsp;fn?: (e: React.ChangeEvent<HTMLInputElement>) => React.ChangeEvent<HTMLInputElement>;
};

**applyMask?:** TCurrency | TCnpj | TCpf | TCep;

**debounce?:** number;

## Examples

### label
```js
<Input
	placeholder="Simple Label"
	id="Simple Label"
	label="Simple Label"
/>
```

### labelProps
```js
<Input
	placeholder="Label Props"
	labelProps={{
		children: 'Test',
		style: { color: 'red' },
	}}
	id="Label Props"
/>
```

### containerProps
```js
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
```

### onChange
```js
<Input
	placeholder="On Change"
	onChange={e => console.log(e.target.value)}
/>
```

### onBeforeChange.removeNumber
```js
<Input
	placeholder="Remove Number"
	onBeforeChange={{ removeNumber: true }}
/>
```

### onBeforeChange.removeUpperCase
```js
<Input
	placeholder="Remove Upper Case"
	onBeforeChange={{ removeUpperCase: true }}
/>
```

### onBeforeChange.removeLowerCase
```js
<Input
	placeholder="Remove Lower Case"
	onBeforeChange={{ removeLowerCase: true }}
/>
```

### onBeforeChange.removeSpecialCharacter
```js
<Input
	placeholder="Remove Special Character"
	onBeforeChange={{ removeSpecialCharacter: true }}
/>
```

### onBeforeChange.regexForReplace
```js
<Input
	placeholder="Remove numbers from 1 to 5"
	onBeforeChange={{ regexForReplace: /[1-5]/g }}
/>
```

### onBeforeChange.fn
```js
<Input
	placeholder="Function Before Change"
	onChange={e => console.log(e.target.value)}
	onBeforeChange={{
		fn: e => {
			const temp = { ...e };
			temp.target.value = addMessage(temp.target.value); // Any Custom Function
			return temp;
		},
	}}
/>
```

### applyMask.currency
```js
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
```

### applyMask.cnpj
```js
<Input
	placeholder="Apply Mask - Cnpj"
	onBeforeChange={{
		applyMask: {
			cnpj: true,
		},
	}}
/>
```

### applyMask.cpf
```js
<Input
	placeholder="Apply Mask - Cpf"
	onBeforeChange={{
		applyMask: {
			cpf: true,
		},
	}}
/>
```

### applyMask.cep
```js
<Input
	placeholder="Apply Mask - Cep"
	onBeforeChange={{
		applyMask: {
			cep: true,
		},
	}}
/>
```

### debounce
```js
<Input
	placeholder="Debounce 2 seconds"
	onChange={e => console.log(e.target.value)}
	debounce={2000}
/>
```
