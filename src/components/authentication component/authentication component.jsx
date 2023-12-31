
import SignIn from '../form component/sign-in form'
import SignUp from '../form component/sign-up form'
import { useState, useContext } from 'react'

import { signInWithGooglePopUp,  
    createUserDoc, 
    genericSignIn, genericSignUp} from '../../utils/firestore'

   

function Authentication(){
    let formData, form, formElement
  

   
    async function googleSignIn (){
        try {
            const {user} = await signInWithGooglePopUp()
            console.log(user)
            
            
            createUserDoc(user)
           

            formElement.reset()

            
            
            
        } catch (error) {
            console.error(error)
        }
        
    }

    async function signIn(e){
        e.preventDefault()
        try {
           const {email, password} = formData
           const {user} = await genericSignIn(email, password)
           console.log(user)
          
           createUserDoc(user)

           formElement.reset()
           
          
        } 
        catch (error) {
            console.log(error.message)
        }
    }

    async function onSubmit(e){
        e.preventDefault()
        try {
            const {email, password, confirmPassword, displayName} = formData
            if(password != confirmPassword){
                alert("passwords dont match")
                throw new Error("password and confirm password does not match")

            } 
            const {user} = await genericSignUp(email, password)
            createUserDoc(user,{ displayName })
            

            formElement.reset()
            
            
            
           
        } 
        catch (error) {
            console.log(error)
        }
        
    }

    function handler(e){
        e.preventDefault()
        const className = e.target.closest('form').className
        formElement = document.querySelector(`.${className}`)
        form = new FormData(formElement)
        
        formData = Object.fromEntries(form)

        console.log(formData)
    }


    return (
        <div className="form-container">
            <SignIn onChange={handler} onSubmit={signIn} onClick={googleSignIn}></SignIn>

            <SignUp onSubmit = {onSubmit} onChange = {handler}></SignUp>
        </div>
    
    )
}
export default Authentication