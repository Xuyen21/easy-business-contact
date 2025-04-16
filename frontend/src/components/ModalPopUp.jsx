import Modal from '@mui/material/Modal';

export default function ModalPopUp({ children, open, setOpen }) {
    // const [open, setOpen] = useState(false);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            {children}
        </Modal>
    )
}