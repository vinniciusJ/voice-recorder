export default class View{
    constructor(){
        this.btnStart = document.querySelector('#btnStart')
        this.btnStop = document.querySelector('#btnStop')
        this.audioElement = document.querySelector('#audio')
    }

    onRecordClick(command){
        return () => {
            command() 
            
            this.toggleAudioElement({ visible: true })
        }
    }

    onStopRecordingClick(command){
        return () => command() 
    }

    configureStartRecordingButton(command){
        this.btnStart.addEventListener('click', this.onRecordClick(command))
    }

    configureStopRecordingButton(command){
        this.btnStop.addEventListener('click', this.onStopRecordingClick(command))
    }

    toggleAudioElement({ visible }){
        const { classList } = this.audioElement

        visible ? classList.remove('hidden') : classList.add('hidden')
    }

    playAudio(url){
        const audio = this.audioElement

        audio.src = url
        audio.muted = false

        this.toggleAudioElement({ visible: true })

        audio.addEventListener('loadedmetadata', () => audio.play())
    }
}