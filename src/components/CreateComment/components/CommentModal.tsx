import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormLabel, TextField, TextareaAutosize, styled } from '@mui/material';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from './ErrorMessage';
import { useDispatch } from 'react-redux';
import { actions } from '../../../store/ducks';
import * as dayjs from 'dayjs';

type Props = {
    isOpen: boolean;
    handleClose: () => void;
}

type FormType = {
    name: string,
    email: string,
    commentText: string,
}

/**
 * Модальное окно с формой создания комментария
 * 
 * @param {boolean} isOpen - Флаг отображения модального окна.
 * @param {boolean} handleClose - Функция закрытия модального окна.
 */

export const CommentModal: FC<Props> = ({isOpen, handleClose}) => {
    const dispatch = useDispatch()
    
    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormType>({
        defaultValues: {
            name: '',
            email: '',
            commentText: '',
        }
    });

    const onCloseModal = () => {
        reset();
        handleClose();
    }
    
    const onSubmit = (data: FormType) => {
        const newComment = {
            id: dayjs().toString(),
            author: data.name,
            email: data.email,
            text: data.commentText,
            date: dayjs(),
            isHidden: false,
            rating: 0
        }

        dispatch(actions.comment.addComment(newComment));
        onCloseModal();
    };
    
    return <Dialog open={isOpen} onClose={onCloseModal}>
        <DialogTitle>Создание комментария</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
                <DialogContentText>
                    Заполните поля чтобы добавить комментарий
                </DialogContentText>

                <Controller
                    name="name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => <TextField {...field} autoFocus
                        margin="dense"
                        id="name"
                        error={!!fieldState.error}
                        label="Имя"
                        fullWidth
                        variant="standard" />}
                />
                {errors.name?.type === 'required' && <ErrorMessage>Обязательное поле</ErrorMessage>}
                <Controller
                    name="email"
                    control={control}
                    rules={{ required: true, pattern: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/i }}
                    render={({ field }) => <TextField {...field}
                        margin="dense"
                        id="name"
                        label="Электронная почта"
                        type="email"
                        fullWidth
                        variant="standard" />}
                />
                {errors.email?.type === 'required' && <ErrorMessage>Обязательное поле</ErrorMessage>}
                <FormLabel>Комментарий</FormLabel>
                <Controller
                    name="commentText"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <Textarea {...field}
                        id="textComment"
                        minRows={3} />}
                />
                {errors.commentText?.type === 'required' && <ErrorMessage>Обязательное поле</ErrorMessage>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onCloseModal}>Отмена</Button>
                <button type='submit'>Отправить</button>
            </DialogActions>
        </form>
    </Dialog>
}

const Textarea = styled(TextareaAutosize)(
    `
    width: 500px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: #000;
    background: transparent;
    border: 1px solid gray;
    box-shadow: 0px 2px 2px gray;

    &:hover {
      border-color: #b6b6db;
    }

    &:focus {
      outline: 0;
      border-color: #b6b6db;
      box-shadow: 0 0 0 1px #b6b6db;
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);
