import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  useEffect(() => {
    checkUser();
  }, []);
  function checkUser() {
    let user = localStorage.getItem("user");
    if (user) {
      navigate("/home");
    }
  }
  const toSignUp = (e) => {
    navigate("/signup");
  };
  const onTextChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function validateForm() {
    let errorObject = { email: "", password: "" };
    let hasErrors = false;
    if (form?.email?.trim()?.length < 3) {
      errorObject = { ...errorObject, email: "Please enter valid email" };
      hasErrors = true;
    }
    if (form?.password?.trim()?.length < 3) {
      errorObject = { ...errorObject, password: "Please enter valid password" };
      hasErrors = true;
    }
    if (!hasErrors) {
      //request for login
      requestLogin();
    }
    setFormErrors(errorObject);
  }

  function requestLogin() {
    //api call
    axios
      .post("http://localhost:8081/login", form)
      .then((d) => {
        localStorage.setItem("user", JSON.stringify(d.data));
        navigate("/home");
      })
      .catch((e) => {
        alert(e?.message);
      });
  }

  return (
    <div class="row">
      <div class="col-12">
        <div class="tab-content content-blk" id="pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="tab-one"
            role="tabpanel"
            aria-labelledby="tab-one-tab"
            tabindex="0"
          >
            <div class="row gy-4">
              <div class="col-12">
                <div class="form-blk">
                  <form
                    onSubmit={(e) => {
                      validateForm();
                      e.preventDefault();
                    }}
                  >
                    <div class="row justify-content-center align-items-end">
                      <div class="col-lg-1">
                        <div class="signin-heading">
                          <h2>Sign In</h2>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div class="tab-input-blk">
                          <label for="email">Email</label>
                          <div class="tab-img-blk">
                            <input
                              onChange={onTextChange}
                              id="email"
                              name="email"
                              class="input-field"
                            />
                          </div>
                        </div>
                        {formErrors?.email?.trim()?.length > 0 && (
                          <p style={{ color: "red" }}>{formErrors?.email}</p>
                        )}
                      </div>
                      <div class="col-lg-3">
                        <div class="tab-input-blk">
                          <label for="password">Password</label>
                          <div class="tab-img-blk">
                            <input
                              onChange={onTextChange}
                              type="password"
                              id="password"
                              name="password"
                              class="input-field"
                            />
                          </div>
                          {formErrors?.password?.trim()?.length > 0 && (
                            <p style={{ color: "red" }}>
                              {formErrors?.password}
                            </p>
                          )}
                        </div>
                      </div>
                      <div class="col-lg-2">
                        <div class="tab-btn-blk">
                          <button class="signin">Sign in</button>
                        </div>
                      </div>
                      <div class="col-lg-2">
                        <div class="forget-link-blk">
                          <a href="#" class="forget-psw-link">
                            Forgot your password?
                            <span class="ms-1">
                              <i class="fa-solid fa-arrow-up-long fa-rotate-90"></i>
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="hr-divider">
                  <span class="login-with">or login with</span>
                </div>
                <div class="social-login">
                  <ul>
                    <li>
                      <a href="#" class="facebook-login">
                        <span class="social-logo">
                          <i class="fa-brands fa-facebook"></i>
                        </span>
                        facebook
                      </a>
                    </li>
                    <li>
                      <a href="#" class="twitter-login">
                        <span class="social-logo">
                          <i class="fa-brands fa-twitter"></i>
                        </span>
                        twitter
                      </a>
                    </li>
                    <li>
                      <a href="#" class="google-login">
                        <span class="social-logo">
                          <i class="fa-brands fa-google"></i>
                        </span>
                        Google
                      </a>
                    </li>
                    <li>
                      <a href="#" class="apple-login">
                        <span class="social-logo">
                          <i class="fa-brands fa-apple"></i>
                        </span>
                        Apple
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="cta-heading">
                  <h3>Register to Play Fantasy Premier League</h3>
                  <p>
                    With over 11 million players, Fantasy Premier League is the
                    biggest Fantasy Football game in the world.
                    <strong>
                      It’s FREE to play and you can win great prizes!
                    </strong>
                  </p>
                </div>
                <div class=" m-2 p-2 signup-btn-blk text-center">
                  <a onClick={toSignUp} class="sign-up-btn">
                    Sign Up Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
