// xxxxxxxxxx Working For Sign Up Form xxxxxxxxxx
// xxxxxxxxxx Full Name Validation xxxxxxxxxx
let decks;
var numberofCards = 0;
var firebaseConfig = {
    apiKey: "AIzaSyBdQExQyiaC1lKP-Ee0398hfdTSpdqpOog",
    authDomain: "clashofcards-6eed8.firebaseapp.com",
    databaseURL: "https://clashofcards-6eed8.firebaseio.com",
    projectId: "clashofcards-6eed8",
    storageBucket: "clashofcards-6eed8.appspot.com",
    messagingSenderId: "497481072404",
    appId: "1:497481072404:web:5e8d1d9926e4a2c6678c01",
    measurementId: "G-R027NXH3TF"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
let db = firebase.firestore();



function checkUserFullName() {
    var userSurname = document.getElementById("userFullName").value;
    var flag = false;
    if (userSurname === "") {
        flag = true;
    }
    if (flag) {
        document.getElementById("userFullNameError").style.display = "block";
    } else {
        document.getElementById("userFullNameError").style.display = "none";
    }
}
// xxxxxxxxxx User Surname Validation xxxxxxxxxx
function checkUserSurname() {
    var userSurname = document.getElementById("userSurname").value;
    var flag = false;
    if (userSurname === "") {
        flag = true;
    }
    if (flag) {
        document.getElementById("userSurnameError").style.display = "block";
    } else {
        document.getElementById("userSurnameError").style.display = "none";
    }
}
// xxxxxxxxxx Email Validation xxxxxxxxxx
function checkUserEmail() {
    var userEmail = document.getElementById("userEmail");
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if (userEmail.value.match(userEmailFormate)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        document.getElementById("userEmailError").style.display = "block";
    } else {
        document.getElementById("userEmailError").style.display = "none";
    }
}
// xxxxxxxxxx Password Validation xxxxxxxxxx
function checkUserPassword() {
    var userPassword = document.getElementById("userPassword");
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
    var flag;
    if (userPassword.value.match(userPasswordFormate)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        document.getElementById("userPasswordError").style.display = "block";
    } else {
        document.getElementById("userPasswordError").style.display = "none";
    }
}

// xxxxxxxxxx Submitting and Creating new user in firebase authentication xxxxxxxxxx
function signUp() {
    var userFullName = document.getElementById("userFullName").value;
    var userSurname = document.getElementById("userSurname").value;
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    var userFullNameFormate = /^([A-Za-z.\s_-])/;
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;

    var checkUserFullNameValid = userFullName.match(userFullNameFormate);
    var checkUserEmailValid = userEmail.match(userEmailFormate);
    var checkUserPasswordValid = userPassword.match(userPasswordFormate);

    if (checkUserFullNameValid == null) {
        return checkUserFullName();
    } else if (userSurname === "") {
        return checkUserSurname();
    } else if (checkUserEmailValid == null) {
        return checkUserEmail();
    } else if (checkUserPasswordValid == null) {
        return checkUserPassword();
    } else {
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {
            var user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            }
            var userData = {
                name: userFullName,
                surname: userSurname,
                email: userEmail,
            }
            db.collection("Users").doc(uid).set(userData);
            swal('Your Account Created', 'Your account was created successfully, you can log in now.', ).then((value) => {
                setTimeout(function() {
                    window.location.replace("../index.html");
                }, 1000)
            });
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: "Error",
            })
        });
    }
}
// xxxxxxxxxx Working For Sign In Form xxxxxxxxxx
// xxxxxxxxxx Sign In Email Validation xxxxxxxxxx
function checkUserSIEmail() {
    var userSIEmail = document.getElementById("userSIEmail");
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if (userSIEmail.value.match(userSIEmailFormate)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        document.getElementById("userSIEmailError").style.display = "block";
    } else {
        document.getElementById("userSIEmailError").style.display = "none";
    }
}
// xxxxxxxxxx Sign In Password Validation xxxxxxxxxx
function checkUserSIPassword() {
    var userSIPassword = document.getElementById("userSIPassword");
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
    var flag;
    if (userSIPassword.value.match(userSIPasswordFormate)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        document.getElementById("userSIPasswordError").style.display = "block";
    } else {
        document.getElementById("userSIPasswordError").style.display = "none";
    }
}
// xxxxxxxxxx Check email or password exsist in firebase authentication xxxxxxxxxx    
function signIn() {
    var userSIEmail = document.getElementById("userSIEmail").value;
    var userSIPassword = document.getElementById("userSIPassword").value;
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;

    var checkUserEmailValid = userSIEmail.match(userSIEmailFormate);
    var checkUserPasswordValid = userSIPassword.match(userSIPasswordFormate);

    if (checkUserEmailValid == null) {
        return checkUserSIEmail();
    } else if (checkUserPasswordValid == null) {
        return checkUserSIPassword();
    } else {
        firebase.auth().signInWithEmailAndPassword(userSIEmail, userSIPassword).then((success) => {
            swal({
                type: 'successfull',
                title: 'Succesfully signed in',
            }).then((value) => {
                setTimeout(function() {
                    window.location.replace("./pages/profile.html");
                }, 500)
            });
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: "Error",
            })
        });
    }
}
// xxxxxxxxxx Working For Profile Page xxxxxxxxxx
// xxxxxxxxxx Get data from server and show in the page xxxxxxxxxx

// xxxxxxxxxx Show edit profile form with detail xxxxxxxxxx
function showEditProfileForm() {
    document.getElementById("profileSection").style.display = "none"
    document.getElementById("editProfileForm").style.display = "block"
    var userPfFullName = document.getElementById("userPfFullName").innerHTML;
    var userPfSurname = document.getElementById("userPfSurname").innerHTML;
    document.getElementById("userFullName").value = userPfFullName;
    document.getElementById("userSurname").value = userPfSurname;
}
// xxxxxxxxxx Hide edit profile form xxxxxxxxxx
function hideEditProfileForm() {
    document.getElementById("profileSection").style.display = "block";
    document.getElementById("editProfileForm").style.display = "none";
}
// xxxxxxxxxx Save profile and update database xxxxxxxxxx
function saveProfile() {
    let userFullName = document.getElementById("userFullName").value
    let userSurname = document.getElementById("userSurname").value
    var userFullNameFormate = /^([A-Za-z.\s_-])/;
    var checkUserFullNameValid = userFullName.match(userFullNameFormate);
    if (checkUserFullNameValid == null) {
        return checkUserFullName();
    } else if (userSurname === "") {
        return checkUserSurname();
    } else {
        let user = firebase.auth().currentUser;
        let uid;
        if (user != null) {
            uid = user.uid;
        }
        var userData = {
            name: userFullName,
            surname: userSurname
        }
        db.collection("Users").doc(uid).set(userData);

        swal({
            type: 'successfull',
            title: 'Update successfull',
            text: 'Profile updated.',
        }).then((value) => {
            setTimeout(function() {
                document.getElementById("profileSection").style.display = "block";

                document.getElementById("editProfileForm").style.display = "none";
            }, 1000)
        });
    }
}
// xxxxxxxxxx Working For Sign Out xxxxxxxxxx
function signOut() {
    firebase.auth().signOut().then(function() {

        // Sign-out successful.
        swal({
            type: 'successfull',
            title: 'Signed Out',
        }).then((value) => {
            setTimeout(function() {
                window.location.replace("../index.html");
            }, 1000)
        });
    }).catch(function(error) {
        // An error happened.
        let errorMessage = error.message;
        swal({
            type: 'error',
            title: 'Error',
            text: "Error",
        })
    });
}


function toggleSignIn() {
    if (!firebase.auth().currentUser) {
        // [START createprovider]
        var provider = new firebase.auth.GoogleAuthProvider();
        // [END createprovider]
        // [START addscopes]
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        // [END addscopes]
        // [START signin]
        firebase.auth().signInWithRedirect(provider);
        // [END signin]

    } else {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
    }
    // [START_EXCLUDE]
    document.getElementById('quickstart-sign-in').disabled = true;
    // [END_EXCLUDE]
}

window.onload = function() {
    initApp();
};

function initApp() {
    // Result from Redirect auth flow.
    // [START getidptoken]
    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // [START_EXCLUDE]
            swal({
                type: 'successfull',
                title: 'Succesfully signed in',
            }).then((value) => {
                setTimeout(function() {
                    window.location.replace("./pages/profile.html");
                }, 1000)
            });
        } else {

            // [END_EXCLUDE]
        }
        // The signed-in user info.
        var user = result.user;
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // [START_EXCLUDE]
        if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
            // If you are using multiple auth providers on your app you should handle linking
            // the user's accounts here.
        } else {
            console.error(error);
        }
        // [END_EXCLUDE]
    });
    // [END getidptoken]

    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            //   User is signed in.
            let user = firebase.auth().currentUser;
            let uid;
            if (user != null) {
                uid = user.uid;
            }
            db.collection("Users").doc(user.uid).get().then(function(doc) {
                if (doc.exists) {
                    document.getElementById("userPfFullName").innerHTML = doc.data().name;
                    document.getElementById("userPfSurname").innerHTML = doc.data().surname;
                    decks = doc.data().decks;
                    console.log(doc.data().name)
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        }
    });
    // [END authstatelistener]
}





function goToDeck() {
    setTimeout(function() {
        window.location.replace("./deck.html");
    }, 1000)
}


function uploadDeckImage() {
    var radios = document.getElementsByName("options");
    if (radios[0].checked) {
        localStorage.setItem("premium", false);
    } else {
        localStorage.setItem("premium", true);
    }
    localStorage.setItem("cardprice", document.getElementById("cardprice").value);
    localStorage.setItem("description", document.getElementById("description").value);
    const ref = firebase.storage().ref();
    const file = document.querySelector("#deckImage").files[0];
    const name = +new Date() + "-" + file.name;
    const metadata = {
        contentType: file.type
    };
    const task = ref.child("deckImages/" + name).put(file, metadata);
    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            localStorage.setItem("deckImage", url);
            localStorage.setItem("deckName", document.getElementById("deckName").value);
            var deckImage = localStorage.getItem('deckImage');
            var deckName = localStorage.getItem('deckName');
            var premium = localStorage.getItem('premium');
            var description = localStorage.getItem('description');
            var price = localStorage.getItem('cardprice');


            if (premium == "true") {
                premium = true
            } else {
                premium = false
                price = ""
            }

            db.collection("Decks").add({
                    icons: deckImage,
                    alpha: deckName,
                    description: description,
                    premium: premium,
                    price: price
                }).then(function(docRef) {
                    localStorage.setItem("deckId", docRef.id);
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
            setTimeout(function() {
                window.location.replace("./card.html");
            }, 1000)

        })
        .catch(console.error);
}


function createCard() {
    var deckid = localStorage.getItem("deckId");
    console.log(deckid)
    localStorage.setItem("attributename1", document.getElementById("attributename1").value);
    localStorage.setItem("attributevalue1", document.getElementById("attributevalue1").value);
    var attributename1 = localStorage.getItem("attributename1");
    var attributevalue1 = localStorage.getItem("attributevalue1");
    localStorage.setItem("attributename2", document.getElementById("attributename2").value);
    localStorage.setItem("attributevalue2", document.getElementById("attributevalue2").value);
    var attributename2 = localStorage.getItem("attributename2");
    var attributevalue2 = localStorage.getItem("attributevalue2");
    localStorage.setItem("attributename3", document.getElementById("attributename3").value);
    localStorage.setItem("attributevalue3", document.getElementById("attributevalue3").value);
    var attributename3 = localStorage.getItem("attributename3");
    var attributevalue3 = localStorage.getItem("attributevalue3");
    localStorage.setItem("attributename4", document.getElementById("attributename4").value);
    localStorage.setItem("attributevalue4", document.getElementById("attributevalue4").value);
    var attributename4 = localStorage.getItem("attributename4");
    var attributevalue4 = localStorage.getItem("attributevalue4");
    localStorage.setItem("attributename5", document.getElementById("attributename5").value);
    localStorage.setItem("attributevalue5", document.getElementById("attributevalue5").value);
    var attributename5 = localStorage.getItem("attributename5");
    var attributevalue5 = localStorage.getItem("attributevalue5");


    console.log("ff" + attributename1)

    const ref = firebase.storage().ref();
    const file = document.querySelector("#cardImage").files[0];
    const name = +new Date() + "-" + file.name;
    const metadata = {
        contentType: file.type
    };
    const task = ref.child("cardImages/" + name).put(file, metadata);
    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            localStorage.setItem("cardImage", url);
            localStorage.setItem("cardName", document.getElementById("cardName").value);
        })
        .catch(console.error);

    var cardImages = localStorage.getItem('cardImage');
    var cardName = localStorage.getItem('cardName');
    var n = numberofCards.toString();
    console.log(n);
    db.collection("Decks").doc(deckid).collection("Cards").doc().set({
            icons: cardImages,
            alpha: cardName,
            attributename1: attributename1,
            attributevalue1: attributevalue1,
            attributename2: attributename2,
            attributevalue2: attributevalue2,
            attributename3: attributename3,
            attributevalue3: attributevalue3,
            attributename4: attributename4,
            attributevalue4: attributevalue4,
            attributename5: attributename5,
            attributevalue5: attributevalue5
        }).then(function(docRef) {
            localStorage.setItem("cardId", numberofCards);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });

    incrementValue();
}


function incrementValue() {
    //var value = parseInt(document.getElementById('number').value, 10);
    //value = isNaN(value) ? 0 : value;
    //value++;
    numberofCards++;
    document.getElementById('number').value = numberofCards;
    console.log(numberofCards);
}



function goProfile() {
    setTimeout(function() {
        window.location.replace("./profile.html");
    }, 1000)

}

function showDeck() {
    setTimeout(function() {
        window.location.replace("./showdeck.html");
    }, 1000)

}

function showCardofDeck(id) {
    localStorage.setItem("deckId", id);
    setTimeout(function() {
        window.location.replace("./showdeckcard.html");
    }, 1000)

}