const initialState = {
    autocadFile: {
        name: "",
        path: "",
        fullFile: ""
    },
    pdfFile: {
        name: "",
        path: "",
        fullFile: ""
    },
    deleteCadFile: [],
    stateChange: "state1",
    uploadRefImg: [],
    uploadRefImg1: [],
    uploadRefImg2: [],
    uploadRefImg3: [],
    uploadRefImg4: [],
    uploadRefImg5: [],
    uploadRefImg6: [],
    uploadRefImg7: [],
    deleteRefImg: [],
    payMethod: "full",

};

// JSON.parse(localStorage.getItem("filteredRoom")) && (JSON.parse(localStorage.getItem("filteredRoom"))[0] === 1 ? "state1" : JSON.parse(localStorage.getItem("filteredRoom"))[0] === 2 ? "state2" : JSON.parse(localStorage.getItem("filteredRoom"))[0] === 3 ? "state3" : JSON.parse(localStorage.getItem("filteredRoom"))[0] === 4 ? "state4" : JSON.parse(localStorage.getItem("filteredRoom"))[0] === 5 ? "state5" : JSON.parse(localStorage.getItem("filteredRoom"))[0] === 6 ? "state6" : JSON.parse(localStorage.getItem("filteredRoom"))[0] === 7 ? "state7" : JSON.parse(localStorage.getItem("filteredRoom"))[0] === 8 ? "state8" : ""),

const threedReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPLOAD_AUTOCAD":
            return {
                ...state,
                autocadFile: {
                    name: action.payload.name,
                    path: action.payload.path,
                    fullFile: action.payload.fullFile
                }
            }
        case "UPLOAD_PDF":
            return {
                ...state,
                pdfFile: {
                    name: action.payload.name,
                    path: action.payload.path,
                    fullFile: action.payload.fullFile
                }
            }
        case "DELETE_CAD_FILE":
            return {
                ...state,
                autocadFile: delete state.autocadFile

            }
        case "DELETE_PDF_FILE":
            return {
                ...state,
                pdfFile: delete state.pdfFile

            }
        case "UPLOAD_REF_IMG":
            if (action.payload.state === "state1") {
                return {
                    ...state,
                    uploadRefImg: [...state.uploadRefImg, action.payload]
                }
            }
            else if (action.payload.state === "state2") {
                return {
                    ...state,
                    uploadRefImg1: [...state.uploadRefImg1, action.payload]
                }
            }
            else if (action.payload.state === "state3") {
                return {
                    ...state,
                    uploadRefImg2: [...state.uploadRefImg2, action.payload]
                }
            }
            else if (action.payload.state === "state4") {
                return {
                    ...state,
                    uploadRefImg3: [...state.uploadRefImg3, action.payload]
                }
            }
            else if (action.payload.state === "state5") {
                return {
                    ...state,
                    uploadRefImg4: [...state.uploadRefImg4, action.payload]
                }
            }
            else if (action.payload.state === "state6") {
                return {
                    ...state,
                    uploadRefImg5: [...state.uploadRefImg5, action.payload]
                }
            }
            else if (action.payload.state === "state7") {
                return {
                    ...state,
                    uploadRefImg6: [...state.uploadRefImg6, action.payload]
                }
            }
            else if (action.payload.state === "state8") {
                return {
                    ...state,
                    uploadRefImg7: [...state.uploadRefImg7, action.payload]
                }
            }

        case "STATE_CHANGE":
            return {
                ...state,
                stateChange: action.payload
            }

        case "DELETE_REF_IMG":

            if (action.payload.state === "state1") {
                // console.log(action.payload.image)
                return {
                    ...state,
                    uploadRefImg: state.uploadRefImg.filter((curElem) => {
                        // console.log(curElem.image.name)
                        return curElem.image.name != action.payload.image;
                    })
                }
            }
            else if (action.payload.state === "state2") {
                return {
                    ...state,
                    uploadRefImg1: state.uploadRefImg1.filter((curElem) => {
                        return curElem.image.name != action.payload.image;
                    })
                }
            }
            else if (action.payload.state === "state3") {
                return {
                    ...state,
                    uploadRefImg2: state.uploadRefImg2.filter((curElem) => {
                        return curElem.image.name != action.payload.image;
                    })
                }
            }
            else if (action.payload.state === "state4") {
                return {
                    ...state,
                    uploadRefImg3: state.uploadRefImg3.filter((curElem) => {
                        return curElem.image.name != action.payload.image;
                    })
                }
            }
            else if (action.payload.state === "state5") {
                return {
                    ...state,
                    uploadRefImg4: state.uploadRefImg4.filter((curElem) => {
                        return curElem.image.name != action.payload.image;
                    })
                }
            }
            else if (action.payload.state === "state6") {
                return {
                    ...state,
                    uploadRefImg5: state.uploadRefImg5.filter((curElem) => {
                        return curElem.image.name != action.payload.image;
                    })
                }
            }
            else if (action.payload.state === "state7") {
                return {
                    ...state,
                    uploadRefImg6: state.uploadRefImg6.filter((curElem) => {
                        return curElem.image.name != action.payload.image;
                    })
                }
            }
            else if (action.payload.state === "state8") {
                return {
                    ...state,
                    uploadRefImg7: state.uploadRefImg7.filter((curElem) => {
                        return curElem.image.name != action.payload.image;
                    })
                }
            }

        case "SAVE_INPUT":
            if (action.payload.state === "state1") {
                const idx = state.uploadRefImg.findIndex((e) => {
                    return e.image.name === action.payload.name
                })
                if (idx >= 0) {
                    const newArr = [...state.uploadRefImg];
                    newArr[idx].desc = action.payload.value;
                    // console.log(newArr)
                    return {
                        ...state,
                        uploadRefImg: newArr
                    }
                }
            }
            if (action.payload.state === "state2") {
                const idx = state.uploadRefImg1.findIndex((e) => {
                    return e.image.name === action.payload.name
                })
                if (idx >= 0) {
                    const newArr = [...state.uploadRefImg1];
                    newArr[idx].desc = action.payload.value;
                    // console.log(newArr)
                    return {
                        ...state,
                        uploadRefImg1: newArr
                    }
                }
            }
            if (action.payload.state === "state3") {
                const idx = state.uploadRefImg2.findIndex((e) => {
                    return e.image.name === action.payload.name
                })
                // console.log(idx)
                if (idx >= 0) {
                    const newArr = [...state.uploadRefImg2];
                    newArr[idx].desc = action.payload.value;
                    return {
                        ...state,
                        uploadRefImg2: newArr
                    }
                }
            }
            if (action.payload.state === "state4") {
                const idx = state.uploadRefImg3.findIndex((e) => {
                    return e.image.name === action.payload.name
                })
                if (idx >= 0) {
                    const newArr = [...state.uploadRefImg3];
                    // console.log(newArr)
                    newArr[idx].desc = action.payload.value;
                    return {
                        ...state,
                        uploadRefImg3: newArr
                    }
                }
            }
            if (action.payload.state === "state5") {
                const idx = state.uploadRefImg4.findIndex((e) => {
                    return e.image.name === action.payload.name
                })
                if (idx >= 0) {
                    const newArr = [...state.uploadRefImg4];
                    newArr[idx].desc = action.payload.value;
                    // console.log(newArr)
                    return {
                        ...state,
                        uploadRefImg4: newArr
                    }
                }
            }
            if (action.payload.state === "state6") {
                const idx = state.uploadRefImg5.findIndex((e) => {
                    return e.image.name === action.payload.name
                })
                if (idx >= 0) {
                    const newArr = [...state.uploadRefImg5];
                    newArr[idx].desc = action.payload.value;
                    return {
                        ...state,
                        uploadRefImg5: newArr
                    }
                }
            }
            if (action.payload.state === "state7") {
                const idx = state.uploadRefImg6.findIndex((e) => {
                    return e.image.name === action.payload.name
                })
                if (idx >= 0) {
                    const newArr = [...state.uploadRefImg6];
                    newArr[idx].desc = action.payload.value;
                    return {
                        ...state,
                        uploadRefImg6: newArr
                    }
                }
            }
            if (action.payload.state === "state8") {
                const idx = state.uploadRefImg7.findIndex((e) => {
                    return e.image.name === action.payload.name
                })
                if (idx >= 0) {
                    const newArr = [...state.uploadRefImg7];
                    newArr[idx].desc = action.payload.value;
                    return {
                        ...state,
                        uploadRefImg7: newArr
                    }
                }
            }

        case "PAY_METHOD":
            return {
                ...state,
                payMethod: action.payload
            }

        case "CLEAR_ALL":
            return {
                ...state,
                autocadFile: {
                    name: "",
                    path: "",
                    fullFile: ""
                },
                pdfFile: {
                    name: "",
                    path: "",
                    fullFile: ""
                },
                deleteCadFile: [],
                stateChange: "state1",
                uploadRefImg: [],
                uploadRefImg1: [],
                uploadRefImg2: [],
                uploadRefImg3: [],
                uploadRefImg4: [],
                uploadRefImg5: [],
                uploadRefImg6: [],
                uploadRefImg7: [],
                deleteRefImg: [],
            }
        default:
            return state;
    }
};
export default threedReducer;
