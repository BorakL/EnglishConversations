import { useEffect, useState } from "react"
import Button from "../../components/button/button"
import Input from "../../components/input/input"
import useForm from "../../hooks/useForm"
import { VALIDATOR_CHANGED, VALIDATOR_MINLENGTH, VALIDATOR_REGEX, VALIDATOR_REQUIRE } from "../../utils/valid" 
import { signupUser } from "../../services/api"

const Signup = ()=>{
    const[loading,setLoading] = useState(false)

    const signupHandler = async(data)=>{
        console.log("data.inputs",data.inputs)
        let newUser = {
            username: data.inputs.username.value,
            email: data.inputs.email.value,
            password: data.inputs.password.value,
            passwordConfirm: data.inputs.passwordConfirm.value
        }
        try{
            setLoading(true)
            await signupUser(newUser)
            setLoading(false)
        }catch(error){
            setLoading(false)
            console.log("error",error) 
        }
    }
    const {
        formState,
        submitHandler,
        inputHandler
    } = useForm({}, signupHandler)


    
    return(
        <>
            {loading ? <h1>Loading</h1> : null}
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
                            initValue="" 
                            isRequired={true}
                        />
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            onInput={inputHandler}
                            placeholder="Email"
                            initValue=""
                            validators={[VALIDATOR_REGEX(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]}
                            isRequired={true}
                            errorMessage={"Invalid email."}
                        />
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            onInput={inputHandler}
                            placeholder="Password"
                            initValue=""
                            validators={[VALIDATOR_MINLENGTH(5)]}
                            errorMessage={"Password is too weak."}
                            isRequired={true}
                        />
                        <Input
                            type="password"
                            name="passwordConfirm"
                            id="passwordConfirm"
                            onInput={inputHandler}
                            placeholder="Confirm password"
                            initValue=""
                            validators={[VALIDATOR_CHANGED(formState?.inputs?.password?.value)]}
                            errorMessage={"confirm password."}
                            isRequired={true}
                            disabled={!formState?.inputs?.password?.value || !formState?.inputs?.password?.isValid}
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

        </>
        
    )
}

export default Signup