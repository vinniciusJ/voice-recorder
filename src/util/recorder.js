export default class Recorder{
    constructor(){
        this.audioType = 'audio/webm;codecs=opus'
        this.mediaRecorder = {}
        this.recordedBlobs = []
    }

    #setup(){
        const options = { mimeType: this.audioType }
        const isSupported = MediaRecorder.isTypeSupported(options.mimeType)

        if(!isSupported){
            const message = `the codec: ${options.mimeType} isn't supported`

            alert(message)

            throw new Error(message)
        }

        return options
    }

    async startRecording(stream){
        const options = this.#setup()

        this.mediaRecorder = new MediaRecorder(stream, options)

        this.mediaRecorder.onstop = event => {
            console.log('Recorded blobs', this.recordedBlobs)
        }

        this.mediaRecorder.ondataavailable = event => {
            if(!event.data || !event.data.size) return

            this.recordedBlobs.push(event.data)
        }

        this.mediaRecorder.start()
    }

    async stopRecording(){
        if(this.mediaRecorder.state === 'inactive') return

        this.mediaRecorder.stop()
    }

    getRecordingURL(){
        const blob = new Blob(this.recordedBlobs, { type: this.audioType})

        return window.URL.createObjectURL(blob)
    }
}