import { useContext, useEffect, useState } from "react"
import Input from "../../components/input/input"
import useForm from "../../hooks/useForm"
import { VALIDATOR_REGEX, VALIDATOR_REQUIRE } from "../../utils/valid"
import Button from "../../components/button/button"
import { loginUser } from "../../services/api"
import Modal from "../../components/uiElements/modal"
import { AuthContext } from "../../context/authContext"
import "./login.scss";
import { Link, useNavigate } from "react-router-dom"

const Login = ()=>{
    const[loading,setLoading]=useState(false)
    const[showModal,setShowModal]=useState(false)
    const[errorMessage,setErrorMessage]=useState("")
    const {loggedIn,login,logout } = useContext(AuthContext)
    const navigate = useNavigate();
    
    const loginHandler = async()=>{
        try{
            setLoading(true)
            const email = formState.inputs?.email?.value
            const password = formState.inputs?.password?.value
            const response = await loginUser({email:email,password:password})
            login(response.data.token)
            setLoading(false)
            navigate("/user-profile")
        }catch(error){
            setLoading(false)
            setErrorMessage(error.response.data.message)
            setShowModal(true)
        }
    }

    const {formState,inputHandler,resetHandler,submitHandler} = useForm({},loginHandler)

    return(
        <div className="login-page wrapper-page">
            <div className="login-page-title">
                <h1>Login</h1>
            </div> 
            <div className="login-page-form">
                <form onSubmit={submitHandler}>
                    <div className="login-page-form-fields">
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
                    </div>  
                    <Button 
                        type="submit" 
                        disabled={!formState.isValid}
                        fullWidth
                    >
                        Login
                    </Button>
                </form>
                <div className="login-page-link">
                    Not a Member? <Link to="/signup">Signup</Link>
                </div>
            </div> 
            <Modal
                header={<h2>Error</h2>}
                closeHandler={()=>setShowModal(false)}
                show={showModal}
            >
                {errorMessage}
            </Modal>
        </div>
    )
}

export default Login;