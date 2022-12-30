import { generateGuid } from '../utils';
import styles from './styles.module.css';

type Props = {
	color?: string;
	size?: string;
	icon?: JSX.Element;
	type?: 'Default' | 'Points';
};

function Loading({ color, size, icon, type }: Props) {
	const ID = generateGuid();
	function insertCss() {
		const element = document.createElement('style');
		element.id = 'icon_sajermann_ui_loading';
		element.innerHTML = `
		@keyframes spin_${ID} {
			to {
				transform: rotate(360deg);
			}
		}
		`;
		const head = document.querySelector('head');
		if (head) {
			head.appendChild(element);
		}
	}
	insertCss();

	function mountByType() {
		if (type === 'Points') {
			return (
				<svg
					viewBox="-25 -25 100 100"
					style={{
						color: color || '#fff',
						width: size || '2.2rem',
						height: size || '2.2rem',
					}}
				>
					<circle fill="currentColor" stroke="none" cx="6" cy="25" r="6">
						<animateTransform
							attributeName="transform"
							dur="1s"
							type="translate"
							values="0 15 ; 0 -15; 0 15"
							repeatCount="indefinite"
							begin="0.1"
						/>
						<animate
							attributeName="opacity"
							dur="1s"
							values="0;1;0"
							repeatCount="indefinite"
							begin="0.1"
						/>
					</circle>
					<circle fill="currentColor" stroke="none" cx="30" cy="25" r="6">
						<animateTransform
							attributeName="transform"
							dur="1s"
							type="translate"
							values="0 10 ; 0 -10; 0 10"
							repeatCount="indefinite"
							begin="0.2"
						/>
						<animate
							attributeName="opacity"
							dur="1s"
							values="0;1;0"
							repeatCount="indefinite"
							begin="0.2"
						/>
					</circle>
					<circle fill="currentColor" stroke="none" cx="54" cy="25" r="6">
						<animateTransform
							attributeName="transform"
							dur="1s"
							type="translate"
							values="0 5 ; 0 -5; 0 5"
							repeatCount="indefinite"
							begin="0.3"
						/>
						<animate
							attributeName="opacity"
							dur="1s"
							values="0;1;0"
							repeatCount="indefinite"
							begin="0.3"
						/>
					</circle>
				</svg>
			);
		}

		return (
			<svg
				version="1.1"
				style={{
					animation: `spin_${ID} 1s linear infinite`,
					color: color || '#fff',
					width: size || '1.2rem',
					height: size || '1.2rem',
				}}
				className={`spin_${ID}`}
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				viewBox="0 0 32 32"
				xmlSpace="preserve"
			>
				<path
					fill="currentColor"
					d="M18,4.181v2.021c4.559,0.929,8,4.97,8,9.798c0,5.514-4.486,10-10,10S6,21.514,6,16c0-4.829,3.441-8.869,8-9.798V4.181
				C8.334,5.137,4,10.066,4,16c0,6.617,5.383,12,12,12s12-5.383,12-12C28,10.066,23.666,5.137,18,4.181z"
				/>
			</svg>
		);
	}

	return <div className={styles.container}>{icon || mountByType()}</div>;
}
export { Loading };
