import { useEffect, useState } from "react"
import Button from "../../components/button/button"
import Input from "../../components/input/input"
import useForm from "../../hooks/useForm"
import { VALIDATOR_CHANGED, VALIDATOR_MINLENGTH, VALIDATOR_REGEX, VALIDATOR_REQUIRE } from "../../utils/valid" 
import { signupUser } from "../../services/api" 
import Loader from "../../components/loader/loader"
import { redirect } from "react-router"

const Signup = ()=>{
    const[loading,setLoading] = useState(false)
    const[errorMessage,setErrorMessage] = useState("")
    const[resetFields,setResetFields] = useState(false)

    const signupHandler = async(data)=>{
        let newUser = {
            username: data.inputs.username.value,
            email: data.inputs.email.value,
            password: data.inputs.password.value,
            passwordConfirm: data.inputs.passwordConfirm.value
        }
        try{
            setLoading(true);
            setResetFields(true);
            setErrorMessage("")
            await signupUser(newUser);
            setLoading(false)
            resetHandler(); 
            redirect("/user");
        }catch(error){
            setResetFields(false)
            setLoading(false)
            resetHandler(); 
            console.log("error",error)
            if(error.response.data.code===11000){
                setErrorMessage(`${data.inputs.email.value} is the email value that caused the duplicate key violation`)
            }
            console.log("error",error) 
        }
    }
    const {
        formState,
        submitHandler,
        inputHandler,
        resetHandler
    } = useForm({}, signupHandler)

    useEffect(()=>{
        console.log("formState",formState)
    },[formState])
    
    return(
         <div className="login-page page-wrapper">
            <div className="login-page-title">
                <h1>Signup</h1>
            </div>
            <div className="login-page-form">
                <form onSubmit={submitHandler}>
                    <div className="login-page-form-fields">
                        <Input
                            type="text"
                            name="username"
                            id="username"
                            onInput={inputHandler}
                            placeholder="Username" 
                            isRequired={true}
                            resetField={resetFields}
                        />
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            onInput={inputHandler}
                            placeholder="Email" 
                            validators={[VALIDATOR_REGEX(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]}
                            isRequired={true}
                            errorMessage={"Invalid email."}
                            resetField={resetFields}
                        />
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            onInput={inputHandler}
                            placeholder="Password" 
                            validators={[VALIDATOR_MINLENGTH(5)]}
                            errorMessage={"Password is too weak."}
                            isRequired={true}
                            resetField={resetFields}                            
                        />
                        <Input
                            type="password"
                            name="passwordConfirm"
                            id="passwordConfirm"
                            onInput={inputHandler}
                            placeholder="Confirm password" 
                            validators={[VALIDATOR_CHANGED(formState?.inputs?.password?.value)]}
                            errorMessage={"confirm password."}
                            isRequired={true}
                            disabled={!formState?.inputs?.password?.value || !formState?.inputs?.password?.isValid}
                            resetField={resetFields} 
                        /> 
                    </div>
                    <Button
                        type="submit"
                        disabled={!formState.isValid}
                        fullWidth
                    >
                        Signup
                    </Button>
                </form>
            </div>
            {loading ? <Loader/> : null}
            {errorMessage ? <p>{errorMessage}</p> : null}
            
        </div>
        
        
    )
}

export default Signup