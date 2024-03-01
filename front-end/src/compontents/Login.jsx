import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './CSS/Login.css'

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  async function login(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:9099/api/v1/employee/login", {
        email: email,
        password: password,
      }).then((res) => {
        console.log(res.data);

        if (res.data.message == "Email not exits") {
          alert("Email not exits");
        }
        else if (res.data.message == "Login Success") {

          navigate('/home');
        }
        else {
          alert("Incorrect Email and Password not match");
        }
      }, fail => {
        console.error(fail); // Error!
      });
    }


    catch (err) {
      alert(err);
    }

  }

  return (
    <div >
      <div className={'mainContainer'}>
        <div className={'titleContainer'}>
          <div>Login</div>
        </div>
        <br />
        <div>
          <div>

            <form>
              <div className={'inputContainer'}>
                <label>Email</label>
                <input type="email"  className={'inputBox'} id="email" placeholder="Enter Name"

                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}

                />

              </div>

              <div>
                <label>password</label>
                <input type="password" className='inputBox' id="password" placeholder="Enter Fee"

                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}

                />
              </div>
              <button type="submit" class="btn btn-primary" onClick={login} style={{marginTop:"20px",height:"50px",width:"400px"}} >Login</button>
            </form>
            <div class="signup-wrapper text-center">
    <a href="/register">Don't have an accout? <span class="text-primary">Create One</span></a>
  </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default Login;