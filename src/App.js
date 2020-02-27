/* eslint no-unused-vars:0, no-dupe-keys:0 */
import React from "react"
import "./App.scss"

let langData = {
  Color: "색깔",
  white: "흰색",
  Black: "or dark	검은색",
  Brown: "갈색",
  Gray: "회색",
  Green: "녹색",
  Black: "and white	흑백",
  White: "백색",
  Yellow: "노란색",
  deep: "-red,crimson	빨간색",
  rainbow: "무지개",
  Pink: "color	분홍색",
  Blue: "파란색",
  Green: "초록색",
  Purple: "보라색",
  Light: "green, lime green	연두색",
  Black: "까만색",
  White: "하얀색",
  skin: "color	살색",
  color: "색",
  color: "색상",
  black: "검정색",
  orange: "주황색",
  deep: "blue, navy blue	남색",
  light: "blue, sky blue	하늘색",
  silver: "은색",
  gold: "금색",
  pink: "핑크색",
  To: "be blue, to be green	푸르다",
  White: ", fair	희다",
  White: "하얗다",
  Be: "red, scalet	붉다",
  deep: "-red,crimson	빨갛다",
  Be: "yellow	노랗다",
  Black: "까맣다",
  To: "be blue	파랗다",
  "To be pitch-black": "캄캄하다"
}

async function fetchImg(word) {
  let url = `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_KEY}&q=${word}&image_type=photo&pretty=true`
  const response = await fetch(url)
  return await response.json()
}

const randomize = () => {}

class App extends React.PureComponent {
  state = {
    counter: 0,
    picFlipped: false,
    word: Object.keys(langData)[0],
    translation: langData["Color"],
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
    if (this.state.counter !== Object.keys(langData).length) {
      let word = Object.keys(langData)[this.state.counter + 1]
      fetchImg(word).then(data => {
        console.log(data)
        this.setState({
          counter: this.state.counter + 1,
          word,
          imgURL: data.hits[0] ? data.hits[0].largeImageURL : null,
          translation: langData[word]
        })
      })
    } else {
      let word = Object.keys(langData)[0]
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
            </div>
          )}
          {/* </header>   <div>
                  <p>{this.state.translation}</p>
                  <button>100% recall</button>
                  <button>50% recall</button>
                  <button>blank</button>
                </div> */}
          <p>{this.state.word}</p>
          <button onClick={this.nextWord}>next</button>
        </header>
      </div>
    )
  }
}

export default App
