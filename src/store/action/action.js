
import ActionTypes from '../constant/constant';
import history from '../../History';
import *as firebase from 'firebase';
import { userInfo } from 'os';
import axios from 'axios';

import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'
import PhoneInput, { getCountryCallingCode, } from 'react-phone-number-input'
import { strict } from 'assert';
// import createBrowserHistory from 'history/createBrowserHistory';
// const history = createBrowserHistory()
var config = {
    apiKey: "AIzaSyCqeckiLP7FD5y-xQ7OCtntkch3VJ5EWiU",
    authDomain: "etate-life.firebaseapp.com",
    databaseURL: "https://etate-life.firebaseio.com",
    projectId: "etate-life",
    storageBucket: "etate-life.appspot.com",
    messagingSenderId: "362075881918",
    appId: "1:362075881918:web:d2cb5df22c28e94a78f9ef",
    measurementId: "G-XM0SFJKWTT"
};
firebase.initializeApp(config);
const xmlToJson = require('xml-to-json-stream');
const parser = xmlToJson({ attributeMode: false });
var db = firebase.firestore();
export function loaderCall() {
    return dispatch => {
        dispatch({ type: ActionTypes.LOADER })
    }
}
export function errorCall(errorMessage) {
    return dispatch => {
        console.log(errorMessage);
        dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
        setTimeout(() => {
            dispatch({ type: ActionTypes.HIDEERROR })
        }, 3000)
    }
}
export function payment(obj) {
    return dispatch => {
        dispatch({ type: ActionTypes.LOADER })

        let currentUserUid = firebase.auth().currentUser.uid;
        let objClone = obj
        objClone.uid = currentUserUid
        db.collection("payment").add(objClone)
            .then(function () {
                dispatch({ type: ActionTypes.LOADER })
                alert("your package is activated")
                history.push("/home")
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                dispatch({ type: ActionTypes.LOADER })
                console.error("Error writing document: ", error);
            });
    }
}
export function buyPackage(cart) {
    return dispatch => {
        let currentUserUid = firebase.auth().currentUser;

        console.log(cart, "9999999999");
        if (currentUserUid) {

            history.push({ pathname: '/test', state: cart });
        }
        else {
            alert("login first")
        }


    }
}
export function logout() {
    return dispatch => {
        firebase.auth().signOut().then(function (e) {
            console.log("signout succes", e)
            dispatch({ type: ActionTypes.CURRENTUSER, payload: undefined })
            history.push('/LandingPage');


        }, function (error) {
            // An error happened.
        });
    }
}

export function forgetPassword(email) {
    console.log(email, "ererreee")
    return dispatch => {
        dispatch({ type: ActionTypes.LOADER })
        firebase.auth().sendPasswordResetEmail(email)
            .then(function (user) {
                console.log(user, "*/*/*/")
                alert("check you email we send yout the link")
                dispatch({ type: ActionTypes.LOADER })

            })
            .catch((error) => {
                console.log(error, "ererreee")
                dispatch(errorCall(error.message))

            });
    }
}
export function UserActivation(verifyCodeObj) {
    console.log(verifyCodeObj, "verifyCodeObj")
    return dispatch => {
        dispatch({ type: ActionTypes.LOADER })
        if (verifyCodeObj && verifyCodeObj.againstVerifyCode) {
            let startTimeStamp = verifyCodeObj.againstVerifyCode.timeStamp
            let currentUserUid = firebase.auth().currentUser.uid;
            let lastTimeStamp = Date.now()
            let expiry = lastTimeStamp - startTimeStamp
            console.log("ifff", verifyCodeObj, startTimeStamp, currentUserUid, lastTimeStamp, expiry)
            if (verifyCodeObj.againstVerifyCode.code === verifyCodeObj.verifyCode && expiry < 400000) {
                console.log("ifff")
                db.collection("users").doc(currentUserUid).update({ status: true })
                    .then(function () {
                        dispatch({ type: ActionTypes.LOADER })
                        dispatch(UserDataGet(currentUserUid, firebase.auth().currentUser.email, "login"))
                        // history.push('/login');
                    })
                    .catch(function (error) {
                        dispatch({ type: ActionTypes.LOADER })
                        console.error("Error writing document: ", error);
                    });
            }
            else {
                dispatch(errorCall("Invalid code or expired"))
            }
        }
        else {
            dispatch(errorCall("Invalid code or expired"))
        }
    }
}
export function emailVerify(email) {
    return dispatch => {
        // axios.post('http://localhost:5000/sendVerificationEmail', {
        axios.post('https://etate-life.herokuapp.com/sendVerificationEmail', {
            email: email
        })
            .then(function (response) {
                dispatch({ type: ActionTypes.LOADER })
                console.log("response", response.data);
                let obj = response.data
                obj.email = email
                history.push({ pathname: '/Verify', state: obj });
            })
            .catch(function (error) {
                dispatch(errorCall("Invalid tokern"))

                console.log("error", error);
            });
    }
}
export function signUpAction(user) {
    // alert("wok")
    console.log(user)
    return dispatch => {
        dispatch({ type: ActionTypes.LOADER })
        let validate = true
        for (var key in user) {
            if ((user[key] === "")) {
                dispatch(errorCall(key + " is required"))
                validate = false
                break
            }
            else if (user.password !== user.confirmPassword) {
                dispatch(errorCall("Password does not match"))
                validate = false
                break
            }
        }
        validate &&
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((userData) => {

                    console.log("user signed in", userData)
                    let currentUserUid = firebase.auth().currentUser.uid;
                    let userClone = user
                    userClone.uid = currentUserUid
                    // db.collection("cities").doc("LA").set({
                    db.collection("users").doc(currentUserUid).set(userClone)
                        .then(function () {
                            console.log("Document successfully written!");
                            dispatch(emailVerify(userClone.email))
                        })
                        .catch(function (error) {
                            dispatch({ type: ActionTypes.LOADER })

                            console.error("Error writing document: ", error);
                        });
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    console.log(errorMessage, "errorMessage");
                    dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
                    setTimeout(() => {
                        dispatch({ type: ActionTypes.HIDEERROR })
                    }, 3000)
                })
    }
}

export function signinAction(user) {
    return dispatch => {
        dispatch({ type: ActionTypes.LOADER })
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((userData) => {
                dispatch(UserDataGet(userData.user.uid, user.email, "login"))
                // history.push('/home');
                // dispatch({ type: ActionTypes.LOADER })
            })
            .catch((error) => {
                var errorMessage = error.message;
                if (errorMessage === "There is no user record corresponding to this identifier. The user may have been deleted.") {
                    errorMessage = "There is no user record"
                }
                console.log(errorMessage);
                dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
                setTimeout(() => {
                    dispatch({ type: ActionTypes.HIDEERROR })
                }, 3000)
            })
    }
}

export function UserDataGet(uid, email, route) {
    console.log(uid, email, "uid,email", route)
    return dispatch => {
        // for user data

        db.collection("users").where("uid", "==", uid).get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let currentUser = doc.data()
                    if (currentUser.status === true) {
                        console.log("working for re", currentUser)
                        axios.get('http://api.hostip.info')
                            .then(function (response) {
                                console.log("ip config", response.data);

                                parser.xmlToJson(response.data, (err, json) => {
                                    if (err) {
                                        //error handling
                                        console.log(err, "jserrerronjsonjson")
                                    }
                                    // console.log("jsonjsonjson",json.HostipLookupResultSet[`gml:featureMember`].Hostip.countryAbbrev)
                                    // console.log("jsonjsonjson",json.HostipLookupResultSet[`gml:featureMember`].Hostip.countryName)
                                    // let countryCode = 
                                    let country = {}
                                    country.country = json.HostipLookupResultSet[`gml:featureMember`].Hostip.countryName
                                    country.abbr = json.HostipLookupResultSet[`gml:featureMember`].Hostip.countryAbbrev
                                    // country.countryCode=getCountryCallingCode(json.HostipLookupResultSet[`gml:featureMember`].Hostip.countryAbbrev)
                                    currentUser.country = country
                                    console.log(currentUser, "jserrerroncurrentUserjsonjson")

                                    dispatch({ type: ActionTypes.LOADER })
                                    dispatch({ type: ActionTypes.CURRENTUSER, payload: currentUser })
                                });

                            })
                            .catch(function (error) {
                                // dispatch(errorCall("Invalid tokern"))

                                console.log("error", error);
                            });


                        if (route) {
                            history.push("/home");

                        }
                    }
                    else if (route) {
                        dispatch(emailVerify(currentUser.email))
                    }
                    else {
                        // history.push("/LandingPage");

                        dispatch({ type: ActionTypes.LOADER })

                    }
                });
                // dispatch({ type: ActionTypes.LOADER })
            })
            .catch(function (error) {
                dispatch(errorCall("Error getting documents: ", error))
            });
        // for clininc data
        db.collection("clinics").where("uid", "==", uid).get()
            .then(function (querySnapshot) {
                let myClinics = []
                querySnapshot.forEach(function (doc) {
                    let myClinicsObj = doc.data()
                    myClinicsObj.clinicId = doc.id
                    myClinics.push(myClinicsObj)
                    console.log(myClinicsObj, "-----------", doc.id)
                });
                dispatch({ type: ActionTypes.MYCLINICS, payload: myClinics })
            })
            .catch(function (error) {
                dispatch(errorCall("Error getting documents: ", error))
            });
        // for doctors data
        db.collection("doctors").where("uid", "==", uid).get()
            .then(function (querySnapshot) {
                let myDoctors = []
                querySnapshot.forEach(function (doc) {
                    let myDoctorsObj = doc.data()
                    myDoctorsObj.DoctorId = doc.id
                    myDoctors.push(myDoctorsObj)
                    console.log(myDoctorsObj, "-----------", doc.id)
                });
                dispatch({ type: ActionTypes.MYDOCTORS, payload: myDoctors })
            })
            .catch(function (error) {
                dispatch(errorCall("Error getting documents: ", error))
            });
        // for doctors data
        db.collection("admininstrators").where("uid", "==", uid).get()
            .then(function (querySnapshot) {
                let myAdmininstrators = []
                querySnapshot.forEach(function (doc) {
                    let myAdmininstratorsObj = doc.data()
                    myAdmininstratorsObj.AdmininstratorId = doc.id
                    myAdmininstrators.push(myAdmininstratorsObj)
                    console.log(myAdmininstratorsObj, "-----------", doc.id)
                });
                dispatch({ type: ActionTypes.MYADMINISTRATORS, payload: myAdmininstrators })
            })
            .catch(function (error) {
                dispatch(errorCall("Error getting documents: ", error))
            });
        // for ip config
        axios.get('http://api.hostip.info')
            .then(function (response) {
                console.log("ip config", response.data);

                parser.xmlToJson(response.data, (err, json) => {
                    if (err) {
                        //error handling
                        console.log(err, "jserrerronjsonjson")
                    }
                    console.log(json, "jsonjsonjson")

                    //json
                    //{
                    //  employee: {
                    //      name: "Alex"
                    //  }    
                    //}
                });

            })
            .catch(function (error) {
                // dispatch(errorCall("Invalid tokern"))

                console.log("error", error);
            });




    }
}
export function userUpdate(user) {
    return dispatch => {
        dispatch({ type: ActionTypes.LOADER })
        let currentUserUid = firebase.auth().currentUser;
        console.log(user, "userUpdate", currentUserUid)
        if (!user.phone || !user.fullName) {
            dispatch(errorCall("Name & Phone number are required"))

        }
        else {
            if ((user.CheckCurrPass === user.currentPassword) &&
                (user.password === user.confirmPassword) && (user.password !== "")) {
                currentUserUid.updatePassword(user.password).then(function () {
                    console.log("succes")
                    db.collection("users").doc(currentUserUid.uid).update({ fullName: user.fullName, phone: user.phone, password: user.password, confirmPassword: user.password })
                        .then(function () {
                            window.location.reload();
                            dispatch({ type: ActionTypes.LOADER })

                        })
                        .catch(function (error) {
                            console.error("Error writing document: ", error);
                            dispatch({ type: ActionTypes.LOADER })

                        });
                }).catch(function (error) {
                    console.log("errrrrrrrrr", error.message)
                    dispatch(errorCall(error.message))
                    // alert(error.message)
                });
                console.log("work", user)
            }
            else if (user.confirmPassword !== "" || user.currentPassword !== "" || user.password !== "") {
                dispatch(errorCall("authentication failed"))
            }
            else {
                db.collection("users").doc(currentUserUid.uid).update({ fullName: user.fullName, phone: user.phone })
                    .then(function () {
                        dispatch({ type: ActionTypes.LOADER })
                        window.location.reload();
                    })
                    .catch(function (error) {
                        dispatch({ type: ActionTypes.LOADER })
                        console.error("Error writing document: ", error);
                    });
            }



        }
    }
}

export function createClinic(clinic) {
    return dispatch => {
        let currentUserUid = firebase.auth().currentUser.uid;

        dispatch({ type: ActionTypes.LOADER })
        let clinicClone = clinic
        clinicClone.uid = currentUserUid
        console.log(clinicClone, "clinicclinicclinic")
        db.collection("clinics").add(clinicClone)
            .then(function () {
                console.log("Document successfully written!");
                window.location.reload();
                dispatch({ type: ActionTypes.LOADER })
            })
            .catch(function (error) {
                dispatch(errorCall("Error writing document: " + error))
                console.error("Error writing document: ", error);
            });

    }
}
export function createDoctor(doctors) {
    return dispatch => {
        let currentUserUid = firebase.auth().currentUser.uid;
        dispatch({ type: ActionTypes.LOADER })
        let doctorsClone = doctors
        doctorsClone.uid = currentUserUid
        console.log(doctorsClone, "doctorsdoctorsdoctors")
        db.collection("doctors").add(doctorsClone)
            .then(function () {
                console.log("Document successfully written!");
                window.location.reload();
                dispatch({ type: ActionTypes.LOADER })
            })
            .catch(function (error) {
                dispatch(errorCall("Error writing document: " + error))
                console.error("Error writing document: ", error);
            });
    }
}
export function createAdmininstrator(Admininstrator) {
    return dispatch => {
        let currentUserUid = firebase.auth().currentUser.uid;
        dispatch({ type: ActionTypes.LOADER })
        let AdmininstratorClone = Admininstrator
        AdmininstratorClone.uid = currentUserUid
        console.log(AdmininstratorClone, "doctorsdoctorsdoctors")
        db.collection("admininstrators").add(AdmininstratorClone)
            .then(function () {
                console.log("Document successfully written!");
                window.location.reload();
                dispatch({ type: ActionTypes.LOADER })
            })
            .catch(function (error) {
                dispatch(errorCall("Error writing document: " + error))
                console.error("Error writing document: ", error);
            });
    }
}
export function deleteClinicOrDoc(clinicOrDocId, collection) {

    return dispatch => {
        console.log(clinicOrDocId, "clinicOrDocId", collection)
        db.collection(collection).doc(clinicOrDocId).delete().then(function () {
            window.location.reload();
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });

    }
}
// firebase.storage().ref(`pictures/${payload.file.name}`).put(payload.file).then((res) => {})
// export function save(data) {
//     return dispatch => {
//         let courseNameAndBatchName = data.courseName + " " + data.batchNumber
//         console.log(courseNameAndBatchName, "courseNameAndBatchName")
//         firebase.database().ref('/books/' + courseNameAndBatchName).push(data)
//             .then(() => {
//                 dispatch({ type: ActionTypes.LOADER })
//             })
//             .catch((error) => {
//                 var errorMessage = error.message;
//                 // alert(errorMessage)
//                 console.log(errorMessage, "save book data");
//                 dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
//                 setTimeout(() => {
//                     dispatch({ type: ActionTypes.HIDEERROR })
//                 }, 3000)
//             })
//     }
// }
// export function deleteBook(bookId, folderName, pdfFilename) {
//     return dispatch => {
//         // console.log(pdfFilename, "delete func in action")
//         firebase.database().ref("/books/" + folderName + "/" + bookId).remove()

//         // Create a reference to the file to delete
//         var desertRef = firebase.storage().ref('/pdfDocuments/').child(pdfFilename);

//         // Delete the file
//         desertRef.delete().then(function () {
//             // File deleted successfully


//             console.log("File deleted successfully")
//         }).catch(function (error) {
//             // Uh-oh, an error occurred!

//             console.log(error)

//         });




//     }
// }

// export function getBooksFromDb() {
//     return dispatch => {
//         dispatch({ type: ActionTypes.LOADER })
//         firebase.database().ref("/books/").once('value', (snapshot) => {
//             let obj = snapshot.val();

//             for (var key in obj) {
//                 // console.log(obj[key]),"1st loop"
//                 let data = obj[key]
//                 for (var datakey in data) {
//                     data[datakey].trackId = datakey
//                     // console.log(data[datakey]), "1st loop"
//                 }
//             }
//             let data = [];
//             let courseName = [];
//             for (var key in obj) {
//                 courseName.push(obj.folderName = key)
//                 obj[key].folderName = key
//                 // console.log(obj[key], "dataSort")
//                 // var dataSort = obj[key]
//                 // console.log(dataSort, "key")


//                 // for (var i = 0; )



//                 // for (var key in dataSort) {
//                 //     // dataSort[key].trackId = key
//                 //     // data.push(dataSort[key])
//                 //     console.log(key, "key")
//                 // }




//                 data.push(obj[key])


//             }

//             // console.log(data, "dataSort")

//             dispatch({ type: ActionTypes.FOLDERNAME, payload: courseName })
//             dispatch({ type: ActionTypes.DATA, payload: data })
//             dispatch({ type: ActionTypes.LOADER })
//         })
//             .catch((error) => {
//                 var errorMessage = error.message;
//                 console.log(errorMessage);
//                 dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
//                 setTimeout(() => {
//                     dispatch({ type: ActionTypes.HIDEERROR })
//                 }, 3000)
//             })

//     }
// }

