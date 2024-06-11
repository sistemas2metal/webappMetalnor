import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"
import {getDocs, collection } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"
import { auth, db } from './app/firebase.js'
import { loginCheck} from './app/loginCheck.js'
import {setupPosts} from './app/postList.js'
import './app/loginCheck.js'
import './app/signupForm.js'
import './app/logout.js'

import './app/signinForm.js'
import './app/googleLogin.js'

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const querySnapshot = await getDocs(collection(db, 'posts'))
        setupPosts(querySnapshot.docs)
        
    } else {
        setupPosts([])
    }

    loginCheck(user)



})