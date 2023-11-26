import { useEffect } from "react"
import Button from "../../components/button/button"
import Input from "../../components/input/input"
import useForm from "../../hooks/useForm"
import { VALIDATOR_CHANGED, VALIDATOR_MINLENGTH, VALIDATOR_REGEX, VALIDATOR_REQUIRE } from "../../utils/valid"

const Signup = ()=>{
    const {
        formState,
        submitHandler,
        inputHandler
    } = useForm({},(x)=>{console.log("values",x)}) 
    
    return(
        <>
            <h1>Signup</h1>
            <form onSubmit={submitHandler}>
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
                      
                
                <Button
                    type="submit"
                    disabled={!formState.isValid}
                >Signup</Button>
            </form>
        </>
        
    )
}

export default Signup