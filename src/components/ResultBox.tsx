import React from 'react';
import { Form } from 'react-bootstrap';

interface ResultBoxProps {
    result: string;
    text1: string;
    text2: string;
    text3: string;
}

const ResultBox: React.FC<ResultBoxProps> = ({ result, text1, text2, text3 }) => {
    return (

        <Form.Control

            as="textarea"
            value={result}
            disabled={false}
            placeholder={`Prompt: \n\n${text1}\n\n${text2}\n\n${text3}`}
            style={{
                height: "700px",
                width: "1000px",
                overflowY: "scroll",
                border: "0px solid #ccc",
                marginBottom: "10px",
                marginTop: "10px",
                whiteSpace: "pre-wrap",
                textAlign: "left",
                resize:"none",
            }}

        />)

};

export default ResultBox;
