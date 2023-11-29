import { useContext, useEffect, useState } from "react"
import Input from "../../components/input/input"
import useForm from "../../hooks/useForm"
import { VALIDATOR_REGEX, VALIDATOR_REQUIRE } from "../../utils/valid"
import Button from "../../components/button/button"
import { loginUser } from "../../services/api"
import Modal from "../../components/uiElements/modal"
import { AuthContext } from "../../context/authContext"

const Login = ()=>{
    const[loading,setLoading]=useState(false)
    const[showModal,setShowModal]=useState(false)
    const[errorMessage,setErrorMessage]=useState("")
    const {loggedIn,login,logout } = useContext(AuthContext)
    
    const loginHandler = async()=>{
        try{
            setLoading(true)
            const email = formState.inputs?.email?.value
            const password = formState.inputs?.password?.value
            const response = await loginUser({email:email,password:password}) 
            console.log("response",response)
            login(response.data.token)
            setLoading(false)
        }catch(error){
            setLoading(false)
            setErrorMessage(error.response.data.message)
            setShowModal(true)
        }
    }

    const {formState,inputHandler,resetHandler,submitHandler} = useForm({},loginHandler)

    return(
        <>
        <h1>Login</h1>
        <form onSubmit={submitHandler}> 
            <Input
                id="email"
                type="email"
                placeholder="Email"
                isRequired={true}
                initValue=""
                name="email" 
                onInput={inputHandler}
                validators={[VALIDATOR_REGEX(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]}
                errorMessage="Invalid email."
            />  
            <Input
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                initValue=""
                isRequired={true}
                onInput={inputHandler}
                errorMessage="Password is required"
            /> 
            <Button type="submit" disabled={!formState.isValid}>Login</Button>
        </form>
        <Modal
            header={<h2>Error</h2>}
            closeHandler={()=>setShowModal(false)}
            show={showModal}
        >
            {errorMessage}
        </Modal>
        </>
    )
}

export default Login;