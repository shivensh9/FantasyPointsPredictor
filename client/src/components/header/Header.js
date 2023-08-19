import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    checkUser();
  }, []);
  function checkUser() {
    let usr = localStorage.getItem("user");
    if (!usr) {
      navigate("/");
    } else {
      setUser(usr);
    }
  }
  const LogOutUser = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <header>
      <div class="top-bar">
        <div class="club-nav">
          <span class="cludsites-heading">
            Club sites{" "}
            <span class="ms-1">
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </span>
          </span>
          <ul class="club-list">
            <li>
              <a href="#" class="clubsites-link">
                <img src="images/t1.svg" alt="Club" />
              </a>
            </li>
            <li>
              <a href="#" class="clubsites-link">
                <img src="images/t14.svg" alt="Club" />
              </a>
            </li>
            <li>
              <a href="#" class="clubsites-link">
                <img src="images/t31.svg" alt="Club" />
              </a>
            </li>
            <li>
              <a href="#" class="clubsites-link">
                <img src="images/t43.svg" alt="Club" />
              </a>
            </li>
            <li>
              <a href="#" class="clubsites-link">
                <img src="images/t7.svg" alt="Club" />
              </a>
            </li>
            <li>
              <a href="#" class="clubsites-link">
                <img src="images/t8.svg" alt="Club" />
              </a>
            </li>
            <li>
              <a href="#" class="clubsites-link">
                <img src="images/t91.svg" alt="Club" />
              </a>
            </li>
            <li>
              <a href="#" class="clubsites-link">
                <img src="images/t94.svg" alt="Club" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="main-header p-relative">
        <nav class="navbar navbar-expand-lg p-0">
          <div class="container-fluid">
            <a href="#" class="logo-link">
              <img src="images/pl-main-logo.png" alt="Logo" />
            </a>
            <button
              class="navbar-toggler btn-box"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="btn_bar btn_width top"></span>
              <span class="btn_bar"></span>
              <span class="btn_bar btn_width bottom"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <div class="dropdown-block">
                    <span class="page-link-heading">Premier League</span>
                    <div class="custom-dropdown-menu">
                      <ul>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Wider Football
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li class="nav-item">
                  <div class="dropdown-block">
                    <span class="page-link-heading">Fantasy</span>
                    <div class="custom-dropdown-menu">
                      <ul>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li class="nav-item">
                  <div class="dropdown-block">
                    <span class="page-link-heading">Football & Community</span>
                    <div class="custom-dropdown-menu">
                      <ul>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li class="nav-item">
                  <div class="dropdown-block">
                    <span class="page-link-heading">About</span>
                    <div class="custom-dropdown-menu">
                      <ul>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li class="nav-item">
                  <div class="dropdown-block">
                    <span class="page-link-heading">More</span>
                    <div class="custom-dropdown-menu">
                      <ul>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" class="url-link">
                            Home
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="side-link-block">
                <ul>
                  <li>
                    {user && (
                      <a onClick={LogOutUser} href="#">
                        Log Out
                      </a>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div class="pagelinks">
        <ul>
          <li class="nav-item">
            {/* <a class="nav-link active" aria-current="page" href="#">
              Home
            </a> */}
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)">
              about
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)">
              services
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)">
              portfolio
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)">
              careers
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)">
              blogs
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
