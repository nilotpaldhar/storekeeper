import { create } from "zustand";

type ModalType = "CONFIRM_REMOVE_CART_ITEM";

type DialogDataMap = {
	CONFIRM_REMOVE_CART_ITEM: {
		lineItemId: string;
		productTitle?: string;
	};
};

type DialogStore = {
	type: ModalType | null;
	isOpen: boolean;
	data: DialogDataMap[ModalType] | null;
	onOpen: <T extends ModalType>(type: T, data: DialogDataMap[T]) => void;
	setOpen: (isOpen: boolean) => void;
	onClose: () => void;
};

const useDialogStore = create<DialogStore>((set) => ({
	type: null,
	isOpen: false,
	data: null,
	onOpen: (type, data) => set(() => ({ type, isOpen: true, data })),
	setOpen: (isOpen) => set({ isOpen }),
	onClose: () => set(() => ({ type: null, isOpen: false, data: null })),
}));

export { useDialogStore };
