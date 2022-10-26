export function uploadAutocad(file) {
    return {
        type: "UPLOAD_AUTOCAD",
        payload: file
    }
}
export function UploadPdf(pdf) {
    return {
        type: "UPLOAD_PDF",
        payload: pdf
    }
}
export function deleteCadFile(cadName) {
    return {
        type: "DELETE_CAD_FILE",
        payload: cadName
    }
}
export function deletePdfFile(pdfName) {
    return {
        type: "DELETE_PDF_FILE",
        payload: pdfName
    }
}
export function uploadRefImg(img,stateName) {
    return {
        type: "UPLOAD_REF_IMG",
        payload: {
            image: img,
            state: stateName
        }
    }
}
export function stateChange(state){
    return {
        type: "STATE_CHANGE",
        payload: state
    }
}
export function deleteRefImg(imgName,stateNameMain) {
    return {
        type: "DELETE_REF_IMG",
        payload: {
            image: imgName,
            state: stateNameMain,  
        }
    }
}
export function saveInput(inName,inVal,stateNm){
    return{
        type: "SAVE_INPUT",
        payload: {
            name: inName,
            value: inVal,
            state: stateNm
        }
    }
}
export function payMethod(pay){
    return{
        type: "PAY_METHOD",
        payload: {
            money: pay,
        }
    }
}

export function clearAll(){
    return{
        type: "CLEAR_ALL"
    }
}



