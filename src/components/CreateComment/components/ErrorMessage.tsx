import { FC } from "react";
import styled from "styled-components";

/**
 * Сообщение о ошибке
 * 
 * @param {string} children - Текст сообщения.
 */

type Props = {
    children: string;
}

export const ErrorMessage: FC<Props> = ({children}) => {
    return <Text>{children}</Text>
}

const Text = styled.p`
    color: red;
    font-size: 10px;
`