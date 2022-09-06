import { WarnToast } from "Components/HSToast"
import Loader from "Components/Loader"

const AuthProtectionFunction = (useEffect, useSelector, useRouter, JSX) => {
    const isLoggedIn = useSelector(s => s.Auth.isLoggedIn)
    const router = useRouter()
    useEffect(() => {
      if(isLoggedIn === false){
        WarnToast("User Is Not Valid")
        router.push('/Login')
      }
    }, [isLoggedIn])

    return isLoggedIn ? JSX : <Loader />
}

export default AuthProtectionFunction;