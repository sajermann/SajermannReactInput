/**
 * ### For use of @sajermann/ui-react
 */
function delay(delayMs: number): Promise<void> {
	return new Promise(resolve => {
		setTimeout(() => resolve(), delayMs);
	});
}

/**
 * ### For use of @sajermann/ui-react
 */
function generateGuid(): string {
	let d = new Date().getTime();
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
		// eslint-disable-next-line no-bitwise
		const r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		// eslint-disable-next-line no-bitwise
		return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
	});
}

/**
 * ### For use of @sajermann/ui-react
 */
function insertCss(ID_BUTTON: string, ID: string) {
	const element = document.createElement('style');
	element.id = ID_BUTTON;
	element.innerHTML = `
	@keyframes forLight_${ID} {
		to {
			transform: scale(4);
			opacity: 0;
		}
	}
	`;
	const head = document.querySelector('head');
	if (head) {
		head.appendChild(element);
	}
}

/**
 * ### For use of @sajermann/ui-react
 */
function removeCss(ID_BUTTON: string) {
	setTimeout(() => document.querySelector(`#${ID_BUTTON}`)?.remove(), 1000);
}

type CreateEffectProps = {
	event: React.MouseEvent<HTMLButtonElement>;
	ID_BUTTON: string;
	ID: string;
	variant?: 'Default' | 'Outlined' | 'Option';
	verifyColorIcon?: (data: number) => string;
	onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

/**
 * ### For use of @sajermann/ui-react
 */
function createEffect({
	event,
	ID_BUTTON,
	ID,
	variant,
	verifyColorIcon,
	onClick,
}: CreateEffectProps) {
	const temp = event.target as HTMLElement;
	const { x: tempX, y: tempY } = temp.getBoundingClientRect();
	const tempPosition = {
		x: 0,
		y: 0,
	};
	if (event.pageX === 0) {
		// Is Enter
		tempPosition.x = tempX + temp.offsetWidth / 2;
		tempPosition.y = tempY + temp.offsetHeight / 2;
	} else {
		// Is Click
		tempPosition.x = event.pageX;
		tempPosition.y = event.pageY;
	}

	insertCss(ID_BUTTON, ID);
	const button = event.currentTarget;
	const effectArea = document.createElement('span');
	const diameter = Math.max(button.clientWidth, button.clientHeight);
	const radius = diameter / 2;

	// eslint-disable-next-line no-multi-assign
	effectArea.style.width = effectArea.style.height = `${diameter}px`;
	effectArea.style.left = `${tempPosition.x - button.offsetLeft - radius}px`;
	effectArea.style.top = `${tempPosition.y - button.offsetTop - radius}px`;
	effectArea.style.position = 'absolute';
	effectArea.style.borderRadius = '50%';
	effectArea.style.transform = 'scale(0)';
	effectArea.style.animation = `forLight_${ID} 600ms linear`;
	effectArea.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
	if ((variant === 'Option' || variant === 'Outlined') && verifyColorIcon) {
		effectArea.style.backgroundColor = `${verifyColorIcon(0.7)}`;
	}
	effectArea.classList.add(`forLight_${ID}`);

	const effectLight = button.getElementsByClassName(`forLight_${ID}`)[0];

	if (effectLight) {
		effectLight.remove();
	}

	button.appendChild(effectArea);
	if (onClick) {
		onClick(event);
	}
	removeCss(ID_BUTTON);
}

export { delay, generateGuid, createEffect };
