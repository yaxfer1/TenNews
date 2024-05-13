import React from 'react';
import {Form} from 'react-bootstrap';
import {SectionType} from '../types.d';

interface TextBoxProps {
    type: SectionType;
    value: string;
    loading?: boolean;
    onChange: (value: string) => void;
    showAdditionalContent: boolean;
    children?: React.ReactNode; // Acepta elementos hijos
}

const commonStyles = {
    border: 0,
    height: '200px',
    fontSize: '1.2em',
    resize: 'none',
    backgroundColor: 'rgba(190, 198, 255, 0.21)'
};

const getInitialValue = ({ type, loading }: { type: SectionType; loading?: boolean }) => {
    if (type === SectionType.Box1) return 'Este es el Box1';
    if (type === SectionType.Box2) return 'Este es el Box2';
    if (loading === true) return 'Cargando...';
    return 'Este es el Box3';
};

export const TextBox = ({ type, value, loading, onChange, showAdditionalContent, children }: TextBoxProps) => {
    const styles =
        type === SectionType.Box3
            ? commonStyles
            : {
                ...commonStyles,
                opacity: showAdditionalContent ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out'
            };
    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value);
    };

    return (
        <div>
            <Form.Control
                autoFocus={type === SectionType.Box1}
                as={'textarea'}
                cols={1000}
                placeholder={getInitialValue({ type, loading })}
                value={value}
                style={styles}
                onChange={handleTextChange}
            />
            {/* Renderiza los elementos hijos */}
            {(type === SectionType.Box1 ||  type === SectionType.Box3) && (
                <div style={{position: 'relative', bottom: 50, right: -350}}>{children}</div>)}
        </div>
    );
};

export default TextBox;
