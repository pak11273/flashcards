/* eslint no-unused-vars:0, no-dupe-keys:0 */
import React from "react"
import "./App.scss"

let langData = [
  { word: "color", translation: "색깔", meta: "" },
  { word: "white", translation: "흰색", meta: "" },
  { word: "Black", translation: "or dark	검은색", meta: "" },
  { word: "Brown", translation: "갈색", meta: "" },
  { word: "Gray", translation: "회색", meta: "" },
  { word: "Green", translation: "녹색", meta: "" },
  { word: "Black", translation: "and white	흑백", meta: "" },
  { word: "White", translation: "백색", meta: "" },
  { word: "Yellow", translation: "노란색", meta: "" },
  { word: "deep-red crimson", translation: "빨간색", meta: "" },
  { word: "rainbow", translation: "무지개", meta: "" },
  { word: "Pink", translation: "color	분홍색", meta: "" },
  { word: "Blue", translation: "파란색", meta: "" },
  { word: "Green", translation: "초록색", meta: "" },
  { word: "Purple", translation: "보라색", meta: "" },
  { word: "Lime green", translation: "연두색", meta: "" },
  { word: "Black", translation: "까만색", meta: "" },
  { word: "White", translation: "하얀색", meta: "" },
  { word: "skin", translation: "color	살색", meta: "" },
  { word: "color", translation: "색", meta: "" },
  { word: "color", translation: "색상", meta: "" },
  { word: "black", translation: "검정색", meta: "" },
  { word: "orange", translation: "주황색", meta: "" },
  { word: "deep blue", translation: "남색", meta: "" },
  { word: "light blue", translation: "하늘색", meta: "" },
  { word: "silver", translation: "은색", meta: "" },
  { word: "gold", translation: "금색", meta: "" },
  { word: "pink", translation: "핑크색", meta: "" },
  { word: "To be green", translation: "푸르다", meta: "" },
  { word: "fair", translation: "희다", meta: "" },
  { word: "White", translation: "하얗다", meta: "" },
  { word: "Be red scarlet", translation: "붉다", meta: "" },
  { word: "deep-red crimson", translation: "빨갛다", meta: "" },
  { word: "Be", translation: "yellow	노랗다", meta: "" },
  { word: "Black", translation: "까맣다", meta: "" },
  { word: "To be blue", translation: "파랗다", meta: "" },
  { word: "To be pitch-black", translation: "캄캄하다", meta: "" }
]

async function fetchImg(word) {
  let url = `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_KEY}&q=${word}&image_type=photo&pretty=true`
  const response = await fetch(url)
  return await response.json()
}

const randomize = () => {}

class App extends React.PureComponent {
  state = {
    langData,
    counter: 0,
    picFlipped: false,
    word: langData[0].word,
    translation: langData[0].translation,
    imgURL: ""
  }

  async componentDidMount() {
    // fetch initial image
    fetchImg(this.state.word).then(data => {
      this.setState({
        imgURL: data.hits[10].largeImageURL
      })
    })
  }

  reveal = () => {
    this.setState({
      imgURL: null
    })
  }

  nextWord = () => {
    if (this.state.counter !== this.state.langData.length) {
      let word = this.state.langData[this.state.counter + 1].word
      fetchImg(word).then(data => {
        console.log(data)
        let counter = this.state.counter + 1
        console.log(this.state.langData[counter])
        this.setState({
          counter,
          word,
          imgURL: data.hits[0] ? data.hits[0].largeImageURL : null,
          translation: this.state.langData[counter].translation
        })
      })
    } else {
      let word = this.state.langData[0]
      fetchImg(word).then(data => {
        this.setState(
          {
            counter: 0,
            word,
            imgURL: data.hits[0].largeImageURL
          },
          () => fetchImg(this.state.word)
        )
      })
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.imgURL && !this.state.picFlipped ? (
            <img
              onClick={() => {
                this.reveal()
              }}
              src={this.state.imgURL}
              alt="word"
            />
          ) : this.state.picFlipped ? (
            <div>
              <div className="noPic">No picture</div>
            </div>
          ) : (
            <div>
              <h1>{this.state.translation}</h1>
              <div>
                <button className="recallBtn">100% recall</button>
                <button className="recallBtn btn-50">50% recall</button>
                <button className="recallBtn blank">blank</button>
              </div>
            </div>
          )}
          <p>{this.state.word}</p>
          <button className="recallBtn next-btn" onClick={this.nextWord}>
            next
          </button>
        </header>
      </div>
    )
  }
}

export default App
