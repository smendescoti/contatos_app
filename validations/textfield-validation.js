//Validador customizado para o REACT HOOK FORMS
//fazendo validação de campos de texto
const textFieldValidation = (value) => {

    //mínimo de caracteres do campo
    if(value.trim().length < 10){
        return "Por favor, informe no mínimo 10 caracteres."
    }
    else if(value.trim().length > 150) {
        return "Por favor, informe no máximo 150 caracteres."
    }

    return true;
}

export default textFieldValidation;