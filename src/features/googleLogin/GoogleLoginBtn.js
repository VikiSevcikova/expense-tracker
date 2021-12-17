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
            const {data} = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/google-login`, {tokenId: response.tokenId})
            dispatch(setToken(data.token));
        
            const { user } = await getUser(data.token);
            dispatch(setUser(user));
        
            navigate("/");
        }catch(error){
            dispatch(
                showAlert({
                  message: error.response.data.error
                    ? error.response.data.error
                    : "Sorry, something went wrong on the server side",
                  variant: "danger",
                })
              );
        }
    }

    const responseErrorGoogle = (response) => {
        console.error(response)
        dispatch(
            showAlert({
              message: "Couldn't login with Google",
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
                className="google-btn"
              />
                )}
            onSuccess={responseSuccessGoogle}
            onFailure={responseErrorGoogle}
            cookiePolicy={'single_host_origin'}
        />
    )
}

export default GoogleLoginBtn;