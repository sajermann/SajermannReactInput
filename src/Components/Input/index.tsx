import { useEffect, useState } from 'react';

interface Props extends React.HTMLProps<HTMLInputElement> {
	labelProps?: React.DetailedHTMLProps<
		React.LabelHTMLAttributes<HTMLLabelElement>,
		HTMLLabelElement
	>;

	containerProps?: React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	>;

	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

	onBeforeChange?: {
		removeNumber?: boolean;
		removeUpperCase?: boolean;
		removeLowerCase?: boolean;
		removeSpecialCharacter?: boolean;
		regexForReplace?: RegExp;
		fn?: (
			e: React.ChangeEvent<HTMLInputElement>
		) => React.ChangeEvent<HTMLInputElement>;
	};

	debounce?: number;
}

function Input({
	labelProps,
	onBeforeChange,
	containerProps,
	onChange,
	debounce,
	...props
}: Props) {
	const [event, setEvent] = useState<React.ChangeEvent<HTMLInputElement>>();

	function onChangeCustom(e: React.ChangeEvent<HTMLInputElement>) {
		if (!onBeforeChange && onChange) {
			onChange(e);
			return;
		}

		const temp = { ...e };
		let valueTemp = temp.target.value;
		if (onBeforeChange?.removeLowerCase) {
			valueTemp = valueTemp.replace(/[a-z]/g, '');
		}
		if (onBeforeChange?.removeUpperCase) {
			valueTemp = valueTemp.replace(/[A-Z]/g, '');
		}
		if (onBeforeChange?.removeNumber) {
			valueTemp = valueTemp.replace(/[0-9]/g, '');
		}
		if (onBeforeChange?.removeSpecialCharacter) {
			valueTemp = valueTemp.replace(
				/[!@#$%^&*(),.?":{ }|<>'¨_=+[;^~´`°\]\\\-/]/g,
				''
			);
		}
		if (onBeforeChange?.regexForReplace) {
			valueTemp = valueTemp.replace(onBeforeChange?.regexForReplace, '');
		}

		temp.target.value = valueTemp;

		if (onBeforeChange?.fn && onChange) {
			const newEvent = onBeforeChange?.fn(temp);
			onChange(newEvent);
			return;
		}

		if (onChange) {
			onChange(temp);
		}
	}

	async function preOnChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (!debounce) {
			onChangeCustom(e);
			return;
		}
		setEvent(e);
	}

	if (debounce) {
		useEffect(() => {
			const timer = setTimeout(() => {
				if (debounce && event) {
					onChangeCustom(event);
				}
			}, debounce);

			return () => clearTimeout(timer);
		}, [event]);
	}

	return (
		<div {...containerProps}>
			{(labelProps || props.label) && (
				<label htmlFor={props.id} {...labelProps}>
					{labelProps?.children || props.label}
				</label>
			)}

			<input {...props} onChange={preOnChange} />
		</div>
	);
}

export { Input };
