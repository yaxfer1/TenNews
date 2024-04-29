import {getQuestion} from "./getQuestion.ts";


export async function useGetQuestion () {
    const resultado = await getQuestion()

    // para recuperar la cita al cargar la página

    return resultado
}

// NO PUBLIQUES ESTO O SE COLARÁ TU API KEY EN EL CLIENTE
// ESTO LO HACEMOS PORQUE NOS ESTAMOS ENFOCANDO EN ESTE CURSO
// EN REACT y TYPESCRIPT
// DEBES CREAR UNA API PARA ESTO

