import {LitElement, html, ref, nothing} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'

const loadVideo = file => new Promise((resolve, reject) => {
    try {
        let video = document.createElement('video')
        video.preload = 'metadata'

        video.onloadedmetadata = function () {
            resolve(this)
        }

        video.onerror = function () {
            reject("Invalid video. Please select a video file.")
        }

        video.src = window.URL.createObjectURL(file)
    } catch (e) {
        reject(e)
    }
})

const secondsToText = secondsFloat => {
    let hours = Math.floor(secondsFloat / 3600);
    let minutes = Math.floor((secondsFloat % 3600) / 60);
    let seconds = Math.floor(secondsFloat % 60);

    let timeString = "";

    if (hours > 0) {
        timeString += `${hours} hours `;
    }
    if (minutes > 0) {
        timeString += `${minutes} minutes `;
    }
    if (seconds > 0) {
        timeString += `${seconds} seconds`;
    }

    return timeString.trim();
}


const disabledButtonStyle = "justify-center mr-2 flex flex-row text-center bg-gray-300  my-1 items-center text-xs font-semibold text-white w-auto py-2 px-5 rounded-lg space-x-2 rounded-full py-1 px-1"
const enabledButtonStyle = "justify-center mr-2 flex flex-row text-center bg-blue-600  my-1 items-center text-xs font-semibold text-white w-auto py-2 px-5 rounded-lg space-x-2 rounded-full py-1 px-1"
  
export class DemoCard extends LitElement {
    static properties = {
        _page: {state: true},
        _videoDuration: {state: true},
        _cost: {state: true}
    }

    constructor() {
        super()
        this._page = 1
        this._videoDuration = null
        this._cost = "0.00"
    }

    createRenderRoot() {
        return this // turn off shadow DOM so we can use external styles
    }

    dropZoneChanged(dropzone) {
        if (dropzone == null) return

        dropzone.ondragover = e => {
            e.preventDefault()
            return false
        }

        dropzone.ondragleave = () => {
            return false
        }

        dropzone.ondrop = e => {
            e.preventDefault()
            //this.classList.remove('hover');
            //let file = e.dataTransfer.files[0];
            //// Now you can use 'file' in your functions
            //// For example, you can read the file with FileReader
            //let reader = new FileReader();
            //reader.onload = function(event) {
            //    console.log(event.target.result);
            //};
            console.error("drop not implemented")
        };

        const fileInput = dropzone.getElementsByTagName('input')[0]
        fileInput.onchange = async e => {
            const file = e.target.files[0];
            try {
                const video = await loadVideo(file)
                this._videoDuration = secondsToText(video.duration)
                this._page = 1
            } catch (e) {
                alert(e)
            }
        };
        
    }

    clearInput() {
        //const dropzone = this._dropZoneRef.value
        //const fileInput = dropzone.getElementsByTagName('input')[0]
        //fileInput.value = ''
    }

    uploadPage() {
        return html`
            <label ${ref(this.dropZoneChanged)} for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-200">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop content to be captioned</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">MP4, MOV, H.264 or GIF (MAX. 20GB)</p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" />
            </label>
            ${this._videoDuration != null ? html`
                <div class="flex flex-row bg-purple-100 border items-center text-xs font-semibold border-purple-600 text-purple-600 w-auto mt-3 py-2 px-5 rounded-lg space-x-2" id="file-uploaded">
                    <button class="border hover:bg-purple-200 justify-center items-center text-center border-purple-600 rounded-full py-1 px-1 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 8.707l5.646-5.647 1.414 1.414L11.414 10l5.646 5.647-1.414 1.414L10 11.414l-5.646 5.647-1.414-1.414L8.586 10 2.93 4.354l1.414-1.414L10 8.586z" clip-rule="evenodd" />
                        </svg>
                    </button>
                  File Uploaded:<div class="font-normal">${this._videoDuration}</div>
                </div>
            ` : nothing}
            <li class="flex flex-row items-center justify-center pt-3 space-x-2.5">
                <svg class="w-4 h-4 text-blue-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                    <path d="M14 7h-1.5V4.5a4.5 4.5 0 1 0-9 0V7H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-5 8a1 1 0 1 1-2 0v-3a1 1 0 1 1 2 0v3Zm1.5-8h-5V4.5a2.5 2.5 0 1 1 5 0V7Z"/>
                </svg>
                <span class="font-normal text-xs leading-tight text-gray-500 dark:text-gray-400"></span>
            </li>
        `
    }

    updateCost() {
        const textFormatRadios = document.getElementsByName("text-format")
        const deliveryTimeRadios = document.getElementsByName("delivery-time")
        const timeStampingIntervalSelect = document.getElementById("timestamping-interval-select")

        if (textFormatRadios.length === 0) return

        let textFormatCost;
        for(const radio of textFormatRadios){
            if(radio.checked){
                textFormatCost = Number(radio.value);
                break;
            }
        }

        let deliveryTimeCost;
        for(const radio of deliveryTimeRadios){
            if(radio.checked){
                deliveryTimeCost = Number(radio.value);
                break;
            }
        }

        const timestampIntervalPrices = {
            "10": 1.00,
            "30": 0.00
        }
        
        const timeStampingIntervalCost = timestampIntervalPrices[timeStampingIntervalSelect.value];

        const costNum = timeStampingIntervalCost + deliveryTimeCost + textFormatCost
        this._cost = costNum.toFixed(2);
    }

    settingsPage() {

        return html`
            <div class="flex flex-row justify-between mb-1">
                <button class="${enabledButtonStyle}">
                    <svg class="w-4 h-4 mr-2 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                      </svg>
                      Go Back
                    </button>
                <button @click="${() => this._page = 2}" class="${enabledButtonStyle}">
                    Finish & Review
                    <svg class=" ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </div>
            <div class="flex flex-row justify-between items-center py-2 px-2">
                <div class="flex flex-row space-x-5 items-center">
                    <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 2V1h10v1M6 1v12m-2 0h4m3-6V6h6v1m-3-1v7m-1 0h2"/>
                        </svg>
                    <div>
                        <label class="font-semibold text-gray-800 text-lg">Text Format</label>
                    </div>
                </div>
                <div class="flex flex-row space-x-5 items-center">
                    <div class="flex items-center border px-2 mx-2 border-gray-300 rounded-md dark:border-gray-700">
                        <input @change="${this.updateCost}" id="text-format-radio-1" type="radio" value="0.00" name="text-format" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="text-format-radio-1" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Verbatim Recording</label>
                    </div>
                    <div class="flex items-center px-2 border border-gray-300 rounded-md dark:border-gray-700">
                        <input @change="${this.updateCost}" checked id="text-format-radio-2" type="radio" value="0.00" name="text-format" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="text-format-radio-2" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Clean Recording</label>
                    </div>
                </div>
            </div>
            <hr class="h-px my-4 bg-gray-300 border-0">
            <div class="flex flex-row justify-between items-center px-2 pt-2">
                <div class="flex flex-row space-x-5 items-center">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    <div>
                        <label class="font-semibold text-gray-800 text-lg">Delivery Time</label>
                    </div> 
                </div>
                <div class="flex flex-row space-x-5 items-center">
                    <div class="flex items-center border px-2 ml-2 border-gray-300 rounded-md dark:border-gray-700">
                        <input @change="${this.updateCost}" ="delivery-time-radio-1" type="radio" value="0.20" name="delivery-time" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="delivery-time-radio-1" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">12 hrs</label>
                    </div>
                    <div class="flex items-center px-2 border border-gray-300 rounded-md dark:border-gray-700">
                        <input @change="${this.updateCost}" checked id="delivery-time-radio-2" type="radio" value="0.80" name="delivery-time" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="delivery-time-radio-2" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">24 hrs</label>
                    </div>
                    <div class="flex items-center px-2 border border-gray-300 rounded-md dark:border-gray-700">
                        <input @change="${this.updateCost}" checked id="delivery-time-radio-3" type="radio" value="1.20" name="delivery-time" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="delivery-time-radio-3" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">2 days</label>
                    </div>
                </div>
            </div>
            <div class="flex flex-row justify-between items-center px-2">
                <div class="flex flex-row space-x-5 items-center">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
                        </svg>
                    <div>
                        <label class="font-normal text-gray-800 text-lg">Price</label>
                    </div>
                </div>
                <div class="flex flex-row space-x-1">
                    <div class="flex items-center px-2 mx-2 rounded-md dark:border-gray-700">
                        <label d class="w-full py-4 ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">$1.20</label>
                    </div>
                    <div class="flex items-center px-2 mx-2 rounded-md dark:border-gray-700">
                        <label d class="w-full py-4 ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">$0.80</label>
                    </div>
                    <div class="flex items-center px-2 mx-2 rounded-md dark:border-gray-700">
                        <label d class="w-full py-4 ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">$0.20</label>
                    </div>
                </div>
            </div>
            <hr class="h-px my-4 bg-gray-300 border-0 ">
            <div class="flex flex-row justify-between items-center py-2 px-2">
                <div class="flex flex-row space-x-5 items-center">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                        <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                    </svg> 
                    <div>
                        <label class="font-semibold text-gray-800 text-lg">Timestamping Interval</label>
                    </div>
                </div>
                <div class="select-wrapper">
                    <select @change="${this.updateCost}" id="timestamping-interval-select" class="custom-select bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-2">
                        <option selected value="10">Every 10 Seconds</option>
                        <option value="30">Every 30 Seconds</option>
                    </select>
                </div>
            </div>
        </div>
        `
    }

    reviewPage() {
        return html`
            <div class="flex flex-col text-gray-900 dark:text-gray-400">
                <div class="flex items-baseline justify-between mx-2 py-2">
                    <span class="text-xl font-light text-gray-900 dark:text-white">Final Cost:</span>
                    <span class="mr-2 text-5xl font-extrabold text-gray-900 dark:text-white">$${this._cost}</span>
                </div>
                <hr class="h-px my-4 bg-gray-300 border-0">
                <ul role="list" class="mb-6 mt-2 space-y-4 text-left">
                    <li class="flex items-center space-x-3">
                        <!-- Icon -->
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                        <span>Whiteglove onboarding service</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <!-- Icon -->
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                        <span>No setup, monthly, or hidden fees</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <!-- Icon -->
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                        <span>Comprehensive security and rigorous</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <!-- Icon -->
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                        <span>Get hundreds of feature updates</span>
                    </li>
                </ul>
                <a href="#" title=""
                class="${disabledButtonStyle}">
                <span class="mr-5">Checkout Now</span>
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>
        ` 
    }

    makeButton(pageNum, buttonText, extraOnClick = () => {}) {
        const finishedStyle = "w-full p-4 text-green-700 border border-green-300 rounded-lg bg-green-50 hover:bg-green-100 hover:shadow-md dark:bg-gray-800 dark:border-green-800 dark:text-green-400"
        const selectedStyle = "w-full p-4 text-blue-700 bg-blue-100 border border-blue-300  hover:bg-blue-100 rounded-lg hover:shadow-md dark:bg-gray-800 dark:border-green-800 dark:text-green-400" 
        const futureStyle = "w-full p-4 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"

        let buttonStyle = this._page > pageNum ? finishedStyle
            : this._page === pageNum ? selectedStyle
            : futureStyle // this._page < pageNum

        let onClick = () => {
            if (this._page > pageNum) {
                this._page = pageNum
                extraOnClick()
            }
        }

        return html`
            <button @click="${onClick}" class="${buttonStyle}" role="alert">
                <div class="flex items-center justify-between">
                    <h3 class="font-medium">${buttonText}</h3>
                    ${this._page === pageNum ? html`
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    ` : this._page > pageNum ? html`
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                        </svg>
                    ` : nothing}
                </div>

            </button>
        `
    }

    updated() {
        this.updateCost()
    }

    render() {
        return html`
            <!-- number one -->
            <div id="divOne" class="flex-1">
                <div class="border-2 text-center sm:block hidden border-slate-300 bg-white py-5 px-5 rounded-2xl shadow-lg">
                    <div class="pb-4">
                        <ol class="flex items-center w-full space-x-2">
                            ${this.makeButton(0, "1. Select Content", this.clearInput)}
                            ${this.makeButton(1, "2. Select Settings")}
                            ${this.makeButton(2, "3. Review")}
                        </ol>
                    </div>
                    ${this._page === 0 ? this.uploadPage()
                        : this._page === 1 ? this.settingsPage()
                        : this._page === 2 ? this.reviewPage()
                        : html`<p>ERROR: UNKNOWN STATE</p>`}
                </div>
            </div>
        <!-- number two -->
        `
    }
}
customElements.define('demo-card', DemoCard)