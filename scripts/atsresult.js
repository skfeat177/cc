const atsresultdate = document.getElementById("atsresultdate");
const atsresultsearchButton = document.getElementById("atsresultsearch");
const atserror = document.getElementById("atsresulterror");
const token = localStorage.getItem('token');
const apiLink = process.env.API_LINK;
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

async function atsresultsearch() {
    atsresultsearchButton.innerText = "Searching..";
    atsresultsearchButton.disabled = true;
console.log("Date ",atsresultdate)
    try {
        const atsresultroll = await verifyToken();
        const response = await fetch(`https://server-as2k.onrender.com/getresult/ats/${atsresultroll}/${atsresultdate.value}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        if (response.ok) {
            console.log(data.Exam_Date)
            console.log(data.Exam_Type)
            atserror.classList.add("none");
            const showatsresult = document.getElementById("atsresultdisplay");
            showatsresult.innerHTML = `
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
            atserror.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert" id="incorrectalert">
          <strong>Not Found!</strong> Exam Month is incorrect.
        </div>`;
        }
    } catch (error) {
        console.error("Error:", error);
    } finally {
        atsresultsearchButton.innerText = "Search";
        atsresultsearchButton.disabled = false;
    }
}

atsresultsearchButton.addEventListener('click', atsresultsearch);
