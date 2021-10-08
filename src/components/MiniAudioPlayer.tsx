import React from 'react'
import classNames from 'classnames'
import { MDBIcon } from 'mdbreact'
import './MiniAudioPlayer.scss'

enum AudioStatus {
  LOADING,
  ERROR,
  STOP,
  PLAY,
}

type Props = {
  url: string
}

type States = {
  state: AudioStatus
  active: boolean
}

class MiniAudioPlayer extends React.Component<Props, States> {
  static selectedAudio: HTMLAudioElement = null

  audio: HTMLAudioElement = null

  constructor(props) {
    super(props)
    this.state = {
      active: false,
      state: AudioStatus.LOADING,
    }

    this.generateAudio(props.url)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.url !== nextProps.url) {
      this.generateAudio(nextProps.url)
    }
  }

  componentWillUnmount() {
    this.audio.pause()
    if (MiniAudioPlayer.selectedAudio === this.audio) {
      MiniAudioPlayer.selectedAudio = null
    }
  }

  generateAudio(url: string) {
    if (this.audio && this.audio === MiniAudioPlayer.selectedAudio) {
      this.audio.onpause = null
      this.audio.pause();
      MiniAudioPlayer.selectedAudio = null;
    }

    this.audio = new Audio(url)
    this.audio.oncanplay = () => {
      this.setState({ active: true, state: AudioStatus.STOP })
    }
    this.audio.onerror = () => {
      this.setState({ state: AudioStatus.ERROR })
    }
    this.audio.onplay = () => {
      this.setState({ state: AudioStatus.PLAY })
    }
    this.audio.onpause = () => {
      this.setState({ state: AudioStatus.STOP })
    }
  }

  togglePlay = () => {
    const { active, state } = this.state

    if (!active) return

    if (state === AudioStatus.STOP) {
      if (MiniAudioPlayer.selectedAudio) {
        MiniAudioPlayer.selectedAudio.pause()
      }
      MiniAudioPlayer.selectedAudio = this.audio

      this.audio.play()
    } else {
      this.audio.pause()
    }
  }

  render() {
    const { state, active } = this.state

    let icon
    if (state === AudioStatus.LOADING) {
      icon = <MDBIcon far icon="arrow-alt-circle-down" title="Downloading..." />
    } else if (state === AudioStatus.PLAY) {
      icon = <MDBIcon icon="stop-circle" far title="Click to stop" />
    } else if (state === AudioStatus.STOP) {
      icon = <MDBIcon icon="play-circle" far title="Click to play" />
    } else {
      icon = <MDBIcon far icon="dizzy" title="Not available" />
    }

    return (
      <span
        className={classNames('mini-audio', { active })}
        onClick={this.togglePlay}
      >
        {icon}
      </span>
    )
  }
}

export default MiniAudioPlayer
