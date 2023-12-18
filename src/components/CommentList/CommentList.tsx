import { FC } from "react";
import { useSelector } from "react-redux";
import { selectors } from "../../store/ducks";
import { CommentComponent } from "./components";
import { Comment } from "../../store/types";
import styled from "styled-components";



export const CommentList: FC = () => {
    const comments = useSelector(selectors.comment.selectAllComment)
    return <Wrapper>{comments.map((comment: Comment) => <CommentComponent key={comment.id} {...comment} />)}</Wrapper>
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 40px;
`