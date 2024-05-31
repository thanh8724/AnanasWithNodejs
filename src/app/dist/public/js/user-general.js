function start() {
    const firebaseConfig = {
        apiKey: "AIzaSyBh5uox4NQaKOIGgmmeeaJzQBimDjHmjT8",
        authDomain: "probable-summer-406516.firebaseapp.com",
        projectId: "probable-summer-406516",
        storageBucket: "probable-summer-406516.appspot.com",
        messagingSenderId: "781752648085",
        appId: "1:781752648085:web:49f47c9c3502b785ddf69c",
        measurementId: "G-TG3NMR4DWP"
    };
    firebase.initializeApp(firebaseConfig);
    getAccountByIdUser(renderInfoUser);
    getAccountByIdUser(postImageToFireBase);
    getAccountByIdUser(deleteAvatarAccount);
}
const loader = document.querySelector('#loadingContainer');
start();
async function getAccountByIdUser(callback) {
    const addressApi = 'http://localhost:3000/accounts';
    fetch(addressApi)
        .then((response) => {
        return response.json();
    })
        .then(callback);
}
function updateData(data, url) {
    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
function renderInfoUser(listAccounts) {
    const account = listAccounts.filter(account => {
        return account.id == JSON.parse(localStorage.getItem('account')).idAccount;
    });
    document.querySelectorAll('.avatarImage').forEach(avatar => {
        if (account[0].avatarAccount == "") {
            avatar.src = '../images/avatarNone.png';
        }
        else {
            avatar.src = account[0].avatarAccount;
        }
    });
}
function postImageToFireBase() {
    let storageRef = firebase.storage().ref();
    let fileInput = document.getElementById("input__uploadFile");
    let imageURL = document.querySelector('.avatar__container img').src;
    fileInput.onchange = (e) => {
        if (!imageURL.includes("avatarNone.png")) {
            let imageDelRef = firebase.storage().refFromURL(imageURL);
            imageDelRef
                .delete();
        }
        let file = e.target.files[0];
        let imagePostRef = storageRef.child("avatarAccount/" + file.name);
        if (loader)
            loader.classList.add('loading'); // -> gọi loading để hiển thị
        imagePostRef.put(file).then(function (snapshot) {
            snapshot.ref.getDownloadURL().then(function (downloadURL) {
                uploadAvatar(downloadURL);
                if (loader)
                    loader.classList.remove('loading'); // -> ẩn đi loading
            });
        });
    };
}
function uploadAvatar(srcImage) {
    const idAccount = JSON.parse(localStorage.getItem('account')).idAccount;
    const url = `http://localhost:3000/accounts/${idAccount}`;
    const data = {
        avatarAccount: srcImage
    };
    updateData(data, url);
}
function deleteAvatarAccount() {
    const buttonDeleteAvatar = document.querySelector('.delete__avatar');
    if (buttonDeleteAvatar) {
        buttonDeleteAvatar.onclick = () => {
            let imageURL = document.querySelector('.avatar__container img').src;
            let imageRef = firebase.storage().refFromURL(imageURL);
            uploadAvatar("../images/avatarNone.png");
            imageRef
                .delete();
        };
    }
}
export {};
//# sourceMappingURL=user-general.js.map