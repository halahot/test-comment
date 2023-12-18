import { FC, useEffect, useMemo } from "react";
import styled from "styled-components";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Avatar, IconButton } from "@mui/material";
import { Comment } from "../../../store/types";
import { useDispatch } from 'react-redux';
import { actions } from "../../../store/ducks";
import * as dayjs from 'dayjs';

/**
 * Компонент отражающий комментарий
 * 
 * @param {Comment} comment - объект комментария.
 */

export const CommentComponent: FC<Comment> = ({ id, author, text, date, rating, isHidden }) => {
    const dispatch = useDispatch()

    const increaseRating = () => dispatch(actions.comment.setRating({ id, rating: rating + 1 }))

    const decreaseRating = () => dispatch(actions.comment.setRating({ id, rating: rating - 1 }))

    useEffect(() => {
        if (rating < -10) {
            dispatch(actions.comment.toggleComment(id));
        }
    }, [dispatch, id, rating])

    const duration = useMemo(() => {
        const diff = dayjs.duration(dayjs().diff(date));
        if (diff.asHours() < 1) {
            return `${diff.asMinutes().toFixed()} минут назад`
        }
        if (diff.asHours() > 1 && diff.asHours() < 24) {
            return `${diff.asHours().toFixed()} часов назад`
        }
        return `${diff.asDays().toFixed()} суток назад`
    }, [date]);

    const toggleComment = () => {
        dispatch(actions.comment.toggleComment(id));
    }

    return rating < -10 && isHidden ? <LinkComment onClick={toggleComment}>Открыть комментарий</LinkComment> : <Wrapper>
        <Avatar>{author.slice(0, 2)?.toUpperCase()}</Avatar>
        <Column>
            <Row>
                <Text>{author}</Text>
                <Date>{duration}</Date>
            </Row>
            <Text>{text}</Text>
            <Row>
                <IconButton onClick={decreaseRating}><RemoveIcon /></IconButton>
                <Rating>{rating}</Rating>
                <IconButton onClick={increaseRating}><AddIcon /></IconButton>
            </Row>
        </Column>
    </Wrapper>
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    color: #000;

`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: #000;
`

const Row = styled.div`
    display: flex;
    align-items: center;
`

const Text = styled.p`
    color: black;
    margin: 0;
`

const Date = styled.span`
    margin-left: 20px;
    font-size: small;
    color: gray;
`

const Rating = styled(Text)`
    margin: 0 5px;
`
const LinkComment = styled.a`
    cursor: pointer;
`