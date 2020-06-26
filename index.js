let paramCount = 0;

let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';
let jsonBox = document.getElementById('jsonBox');

function getElementFromString(string){
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

let json = document.getElementById('json');
json.addEventListener('click', ()=>{
    jsonBox.style.display = 'block';
    parametersBox.style.display = 'none';
});

let params = document.getElementById('params');
params.addEventListener('click', ()=>{
    jsonBox.style.display = 'none';
    parametersBox.style.display = 'block';
});

let addParams = document.getElementById('addParams');
addParams.addEventListener('click', ()=>{
    let string = `
                <div class="form-row my-2">
                <label for="requestParam" class="col-sm-2 col-form-label">Parameter ${paramCount+2}</label>
                <div class="col-md-4">
                    <input id="parameterKey${paramCount+2}" type="text" class="form-control" placeholder="Enter Parameter ${paramCount+2} key">
                </div>
                <div class="col-md-4">
                    <input id="parameterValue${paramCount+2}" type="text" class="form-control" placeholder="Enter Parameter ${paramCount+2} value">
                </div>
                <button class="btn btn-primary deleteParam"> - </button>
                </div>
                 `;
    paramCount += 1;
    let paramElement = getElementFromString(string);
    // console.log(paramElement);
    parametersBox.appendChild(paramElement);
    let deleteParam = document.getElementsByClassName('deleteParam');
    for(item of deleteParam){
        let confirm1;
        item.addEventListener('click', (e)=>{
            // confirm1 = confirm('Are you sure, Do you want to delete?');
            // if(confirm1){
                e.target.parentElement.remove();
            // }
        });
    };
});

//Submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', ()=>{
    //Show please wait in the response box to req patience from the user
    document.getElementById('responseBoxText').innerHTML = 'Please wait while we fetch the response....';
    let url = document.getElementById('url').value;
    let requestType = document.querySelector('input[name="requestType"]:checked').value;
    let contentType = document.querySelector('input[name="contentType"]:checked').value;

    // if user used params instead of json:
    if(contentType == 'PARAMS'){
        data = {};
        for(i=0;i<paramCount+1;i++){
            if(document.getElementById(`parameterKey${i+1}`) != undefined){
                let key = document.getElementById(`parameterKey${i+1}`).value;
                let value = document.getElementById(`parameterValue${i+1}`).value;
                data[key] = value;
            }
        };
        data = JSON.stringify(data);
    }
    else{
        data = document.getElementById('RequestJsonText').value;
    }
    console.log('Url is', url);
    console.log('requestType is', requestType);
    console.log('contentType is', contentType);
    console.log('data is', data);

    //fetch api
    if(requestType == 'GET'){
        fetch(url, {
            method: 'GET'
        }).then(response => response.text()).then((text) => {
            document.getElementById('responseBoxText').innerHTML = text;
        });
    }
    else{
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
        }).then(response => response.text()).then((text) => {
            // console.log(text);
            document.getElementById('responseBoxText').innerHTML = text;
        });
    }
});