import axios from 'axios';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from "../userProfile/userSlice";
import { getUser } from "../../utils/utils";
import { hideAlert, showAlert } from "../alertMessage/alertMessageSlice";
import { useNavigate } from 'react-router';
import FormBtn from '../formButton/FormBtn';
import { BsGoogle } from "react-icons/bs";

const GoogleLoginBtn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const responseSuccessGoogle = async (response) => {
        try{
            const {data} = await axios.post("/auth/google-login", {tokenId: response.tokenId})
            localStorage.setItem("ET-token", data.token)
            dispatch(setToken(data.token));
        
            const { user } = await getUser(data.token);
            dispatch(setUser(user));
        
            navigate("/");
        }catch(error){
            dispatch(
                showAlert({
                  message: error.response.data.error
                    ? error.response.data.error
                    : "Sorry, there is an issues on the server.",
                  variant: "danger",
                })
              );
              setTimeout(() => {
                dispatch(hideAlert());
              }, 5000);
        }
    }

    const responseErrorGoogle = (response) => {
        dispatch(
            showAlert({
              message: "Sorry, something went wrong.",
              variant: "danger",
            })
          );
          setTimeout(() => {
            dispatch(hideAlert());
          }, 5000);
    }

    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={renderProps => (
                <FormBtn
                onClick={renderProps.onClick}
                name="Continue with Google"
                icon={<BsGoogle className="icon" />}
              />
                )}
            onSuccess={responseSuccessGoogle}
            onFailure={responseErrorGoogle}
            cookiePolicy={'single_host_origin'}
        />
    )
}

export default GoogleLoginBtn;