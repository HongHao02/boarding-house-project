import React from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import { forwardRef, useRef, useImperativeHandle } from 'react';

import LoginForm from '~/components/LoginForm'

function DialogDefault({ children, type , isOpen = true , onClose}) {
    const [open, setOpen] = React.useState(isOpen);
    const handleOpen = () => setOpen(!open);

    const handleClose = () => {
        onClose()
    }
    console.log("dialog open ", open);
    return (
        <>
            <Dialog open handler={handleClose}>
                <DialogHeader className="text-red-600">Lỗi rồi</DialogHeader>
                <DialogBody>{children}</DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleClose} className="mr-1">
                        <span>Cancel</span>
                    </Button>
                    {type === 'login' ? (
                        <LoginForm />
                    ) : (
                        <Button variant="gradient" color="green" onClick={handleClose}>
                            <span>Confirm</span>
                        </Button>
                    )}
                </DialogFooter>
            </Dialog>
        </>
    );
}
export default DialogDefault;
