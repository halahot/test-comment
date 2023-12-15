import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormLabel, TextField, TextareaAutosize, styled } from '@mui/material';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from './ErrorMessage';

type Props = {
    isOpen: boolean;
    handleClose: () => void;
}

type Comment = {
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
    
    const { control, handleSubmit, formState: { errors } } = useForm<Comment>({
        defaultValues: {
            name: '',
            email: '',
            commentText: '',
        }
    });
    const onSubmit = (data: Comment) => console.log(data);
    
    return <Dialog open={isOpen} onClose={handleClose}>
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
                <Button onClick={handleClose}>Отмена</Button>
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
      border-color: blue;
    }

    &:focus {
      outline: 0;
      border-color: blue;
      box-shadow: 0 0 0 3px blue;
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);
