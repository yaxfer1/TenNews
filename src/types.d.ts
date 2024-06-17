export interface State {
    text1: string
    text2: string
    text3: string
    loading: boolean
    result: string
    chat: boolean
    messages: string[]
    aimessages: string[]
    newMessage: string
    showModal: boolean
    editedText: string
    email: string
    password: string
}
    
export type Action =
    | { type: 'SET_TEXT1', payload: string }
    | { type: 'SET_TEXT2', payload: string }
    | { type: 'SET_TEXT3', payload: string }
    | { type: 'GET_RESULT', payload: string }
    | { type: 'SET_LOAD', payload: boolean }
    | { type: 'SET_CHAT', payload: boolean }
    | { type: 'SET_MESSAGES', payload: string[] }
    | { type: 'SET_AIMESSAGES', payload: string[] }
    | { type: 'SET_NEWMESSAGE', payload: string }
    | { type: 'SET_SHOWMODAL', payload: boolean }
    | { type: 'SET_EDITEDTEXT', payload: string }
    | { type: 'SET_EMAIL', payload: string }
    | { type: 'SET_PASSWORD', payload: string }

export enum SectionType {
    Box1 = 'box1',
    Box2 = 'box2',
    Box3 = 'box3'
}

declare module './context/UserContext.jsx' {
    const value: never;
    export default value;
}
declare module './components/DropdownMenu.jsx' {
    const value: never;
    export default value;
}

declare module './hooks/useUser.jsx' {
    const value: never;
    export default value;
}