import { Button } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { CommentModal } from './components';

/**
 * Компонент создания комментария
 */


export const CreateComment = () => {
    const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
    const handleClickOpen = () => setIsOpenCreateModal(true);
    const handleClose = () => setIsOpenCreateModal(false);

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Добавить комментарий
            </Button>
            <CommentModal isOpen={isOpenCreateModal} handleClose={handleClose} />
        </React.Fragment >
    );
}

