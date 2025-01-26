export interface Chat {
    id: bigint;
    name: string; // Nombre del chat
    messages: string[]; // Mensajes del usuario en el chat
    aimessages: string[]; // Mensajes de la IA en el chat
}

export interface State {
    text1: string;
    text2: string;
    text3: string;
    loading: boolean;
    result: string;
    chat: boolean;
    messages: string[];
    aimessages: string[];
    newMessage: string;
    showModal: boolean;
    editedText: string;
    email: string;
    password: string;
    currentChatId: bigint;
    chats: Chat[]; // Nueva propiedad para almacenar todos los chats

}

export type Action =
    | { type: 'SET_TEXT1'; payload: string }
    | { type: 'SET_TEXT2'; payload: string }
    | { type: 'SET_TEXT3'; payload: string }
    | { type: 'GET_RESULT'; payload: string }
    | { type: 'SET_LOAD'; payload: boolean }
    | { type: 'SET_CHAT'; payload: boolean }
    | { type: 'SET_MESSAGES'; payload: string[] }
    | { type: 'SET_AIMESSAGES'; payload: string[] }
    | { type: 'SET_NEWMESSAGE'; payload: string }
    | { type: 'SET_SHOWMODAL'; payload: boolean }
    | { type: 'SET_EDITEDTEXT'; payload: string }
    | { type: 'SET_EMAIL'; payload: string }
    | { type: 'SET_PASSWORD'; payload: string }
    | { type: 'SET_CURRENTCHATID'; payload: bigint}
    | { type: 'ADD_CHAT'; payload: Chat}
    | { type: 'SET_CHATS'; payload: Chat[]}
    | { type: 'DELETE_CHAT'; payload: string } // Nueva acción para eliminar un chat por ID
    | { type: 'UPDATE_CHAT_MESSAGES'; payload: { currentChatID: bigint; messages: string[] } } // Actualiza los mensajes de un chat específico
    | { type: 'UPDATE_CHAT_AIMESSAGES'; payload: { currentChatID: bigint; aimessages: string[] } }; // Actualiza los mensajes de IA de un chat específico

export enum SectionType {
    Box1 = 'box1',
    Box2 = 'box2',
    Box3 = 'box3',
}

declare module './components/DropdownMenu.jsx' {
    const value: never;
    export default value;
}

//declare module './hooks/useUser.ts' {
//    const value: never;
//    export default value;
//}
