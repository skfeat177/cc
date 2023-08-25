const ctsresultdate = document.getElementById("ctsresultdate");
const ctsresultsearchButton = document.getElementById("ctsresultsearch");
const ctserror = document.getElementById("ctsresulterror");
const token = localStorage.getItem('token');

async function verifyToken() {
    try {
        const response = await fetch('https://server-as2k.onrender.com/verify', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const userData = await response.json();

        if (response.ok) {
            return userData.roll;
        } else {
            console.error('Token verification failed:', userData);
            throw new Error('Token verification failed');
        }
    } catch (error) {
        console.error('Error verifying token:', error);
        throw error;
    }
}

async function ctsresultsearch() {
    ctsresultsearchButton.innerText = "Searching..";
    ctsresultsearchButton.disabled = true;
    console.log("Date ", ctsresultdate);
    
    try {
        const ctsresultroll = await verifyToken();
        const response = await fetch(`https://server-as2k.onrender.com/getresult/cts/${ctsresultroll}/${ctsresultdate.value}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        if (response.ok) {
            console.log(data.Exam_Date);
            console.log(data.Exam_Type);
            ctserror.classList.add("none");
            const showctsresult = document.getElementById("ctsresultdisplay");
            showctsresult.innerHTML = `
        <div class="container mt-3 mb-5">
          <h3 class="text-center bold bottom-border mb-2 ">Your Result</h3>
          <div class="table-responsive">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <td class="bold">Exam Type</td>
                  <td>${data.Exam_Type}</td>
                </tr>
                <tr>
                  <td class="bold" >Exam Month</td>
                  <td>${data.Exam_Date}</td>
                </tr>
                <tr>
                  <td class="bold" >Full Marks</td>
                  <td>${data.Full_Marks}</td>
                </tr>
                <tr>
                  <td class="bold" >Obtained Marks</td>
                  <td>${data.Obtained_Marks}</td>
                </tr>
                <tr>
                  <td class="bold" >Percentage</td>
                  <td>${((data.Obtained_Marks / data.Full_Marks) * 100).toFixed(2)}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>`;
        } else {
            ctserror.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert" id="incorrectalert">
          <strong>Not Found!</strong> Exam Month is incorrect.
        </div>`;
        }
    } catch (error) {
        console.error("Error:", error);
    } finally {
        ctsresultsearchButton.innerText = "Search";
        ctsresultsearchButton.disabled = false;
    }
}

ctsresultsearchButton.addEventListener('click', ctsresultsearch);
