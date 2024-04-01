import React from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Tooltip } from '@material-tailwind/react';

export default function DialogCustomAnimation({
    title = '',
    type = 'dialog-tooltip',
    children,
    button,
    toolTipContent = '',
}) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <>
            {type === 'dialog-tooltip' ? (
                <Tooltip content={toolTipContent}>
                    {button && React.cloneElement(button, { onClick: handleOpen })}
                </Tooltip>
            ) : (
                button && React.cloneElement(button, { onClick: handleOpen })
            )}
            <Dialog
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
                className='overflow-auto'
            >
                <DialogHeader>{title}</DialogHeader>
                <DialogBody>{children}</DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
                        <span>Cancel</span>
                    </Button>
                    {/* <Button variant="gradient" color="green" onClick={handleOpen}>
                        <span>Confirm</span>
                    </Button> */}
                </DialogFooter>
            </Dialog>
        </>
    );
}
