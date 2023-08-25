window.onload = function () {
    console.log("Page loaded");
    const loginStatus = document.getElementById('loginStatus');
    const token = localStorage.getItem('token');

    if (token) {
        fetch('https://server-as2k.onrender.com/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("Profile data:", data);
                if (data.data && data.data.name) {
                    loginStatus.innerHTML = `     <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle alink bold" href="#" role="button" data-bs-toggle="dropdown"
                       aria-expanded="false">
                       ${data.data.name}
                    </a>
                    <ul class="dropdown-menu px-1 py-2" style="width: 240px;">
                    <li class="py-1 "><a class=" underline-animation alink bold" href="profile.html"><i class="fa fa-user" aria-hidden="true"></i> My Profile</a></li>
                        <li class="py-1 "><a class=" underline-animation alink bold" href="result.html"><i class="fa fa-list-alt" aria-hidden="true"></i> My Result</a></li>
                        <li class="py-1"><a class=" underline-animation alink bold" href="attendance.html"><i class="fa fa-calendar" aria-hidden="true"></i> My Attendance</a></li>
                        <li class="py-1 "><a class=" underline-animation alink bold" href="notes.html"><i class="fa-solid fa-book"></i> My Notes</a></li>
                        <li class="py-1 "><a class="text-danger underline-animation alink bold" onclick="clearLocalStorage()"><i class="fa fa-sign-out" aria-hidden="true"></i> Log out</a></li>
                    </ul>
                </li>
                   `;
                    const btnadmn = document.getElementById("adminbutton")
                    btnadmn.classList.add("d-lg-none")
                }
            })
            .catch(error => {
                console.error('Error fetching profile:', error);
            });
    }

    document.getElementById('loginButton').addEventListener('click', async function (event) {
        event.preventDefault();

        const loginButton = document.getElementById('loginButton');
        const loginStatus = document.getElementById('loginStatus');
        const originalButtonText = loginButton.innerHTML;
        loginButton.innerHTML = 'Loading...';
        loginButton.disabled = true;

        const usernameValue = document.getElementById('username').value;
        const passwordValue = document.getElementById('password').value;

        try {
            const response = await fetch(`https://server-as2k.onrender.com/login/${usernameValue}/${passwordValue}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data); // Log the response to the console
            if (data.message == "User not found") {
                console.log("executed")
                const loginresp = document.getElementById("loginresponse")
                loginresp.innerHTML = ` <div class="alert alert-danger alert-dismissible fade show" role="alert" id="incorrectalert">
    <strong>Not Found!</strong> Incorrect username or password.
  </div>`
                const alerttext = document.getElementById("incorrectalert")
                setTimeout(function () {
                    alerttext.classList.add("none")
                }, 3000);

            }
            // Save the response to local storage
            if (response.ok && data.token) {
                localStorage.setItem('token', data.token);

                // Fetch profile data after successful login
                fetch('https://server-as2k.onrender.com/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${data.token}`
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("Profile data:", data);
                        if (data.data && data.data.name) {
                            loginStatus.innerHTML = `
                            <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle alink bold" href="#" role="button" data-bs-toggle="dropdown"
                               aria-expanded="false">
                               ${data.data.name}
                            </a>
                            <ul class="dropdown-menu px-1 py-2" style="width: 240px;">
                            <li class="py-1 "><a class=" underline-animation alink bold" href="profile.html"><i class="fa fa-user" aria-hidden="true"></i> My Profile</a></li>
                                <li class="py-1 "><a class=" underline-animation alink bold" href="result.html"><i class="fa fa-list-alt" aria-hidden="true"></i> My Result</a></li>
                                <li class="py-1"><a class=" underline-animation alink bold" href="attendance.html"><i class="fa fa-calendar" aria-hidden="true"></i> My Attendance</a></li>
                                <li class="py-1 "><a class=" underline-animation alink bold" href="notes.html"><i class="fa-solid fa-book"></i> My Notes</a></li>
                                <li class="py-1 "><a class="text-danger underline-animation alink bold" onclick="clearLocalStorage()"><i class="fa fa-sign-out" aria-hidden="true"></i> Log out</a></li>
                            </ul>
                        </li>
                            `;
                            const btnadmn = document.getElementById("adminbutton")
                            btnadmn.classList.add("d-lg-none")

                            const loginresp = document.getElementById("loginresponse")
                            loginresp.innerHTML = ` <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Success!</strong> Successfully logged in,Please wait.
              </div>`
                            setTimeout(function () {
                                location.reload();
                            }, 1000);



                        }

                    })
                    .catch(error => {
                        console.error('Error fetching profile:', error);

                    });
            }

            // Show alert with response message


        } catch (error) {
            console.error("Error:", error);
        } finally {
            loginButton.innerHTML = originalButtonText;
            loginButton.disabled = false;
        }
    });
};

