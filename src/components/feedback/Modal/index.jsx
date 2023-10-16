import PropTypes from 'prop-types';

import { Root, Trigger, Portal, Overlay, Content, Close } from '@radix-ui/react-dialog';
import ModalTitle from '@ui/feedback/Modal/Title';
import ModalDescription from '@ui/feedback/Modal/Description';
import CloseIcon from '@icons/regular/Close';

import { overlayStyles, contentStyles, closeBtnStyles } from '@ui/feedback/Modal/styles.cva';

/**
 * Render the Modal component.
 *
 * @return {Element} The Modal component.
 */
const Modal = ({
	defaultOpen,
	trigger,
	children,
	defaultTriggerContent,
	onOpenChange,
	overlayClassName,
	contentClassName,
	defaultTriggerClassName,
	...props
}) => (
	<Root defaultOpen={defaultOpen} onOpenChange={onOpenChange} {...props}>
		<Trigger asChild>
			{trigger || (
				<button type="button" className={defaultTriggerClassName}>
					{defaultTriggerContent}
				</button>
			)}
		</Trigger>
		<Portal>
			<Overlay className={overlayStyles({ className: overlayClassName })} />
			<Content className={contentStyles({ className: contentClassName })}>
				{children}
				<Close asChild>
					<button type="button" className={closeBtnStyles()}>
						<CloseIcon className="!text-sm" />
						<span className="sr-only">Close Modal</span>
					</button>
				</Close>
			</Content>
		</Portal>
	</Root>
);

/**
 * Sub-Components.
 */
Modal.Title = ModalTitle;
Modal.Description = ModalDescription;

/**
 * Default Props.
 */
Modal.defaultProps = {
	defaultOpen: false,
	trigger: null,
	children: '',
	defaultTriggerContent: 'Open Modal',
	onOpenChange: () => {},
	overlayClassName: '',
	contentClassName: '',
	defaultTriggerClassName: '',
};

/**
 * Prop Types.
 */
Modal.propTypes = {
	defaultOpen: PropTypes.bool,
	trigger: PropTypes.node,
	children: PropTypes.node,
	defaultTriggerContent: PropTypes.node,
	onOpenChange: PropTypes.func,
	overlayClassName: PropTypes.string,
	contentClassName: PropTypes.string,
	defaultTriggerClassName: PropTypes.string,
};

export default Modal;
