/* eslint no-unused-vars:0, no-dupe-keys:0 */
import React from "react"
import "./App.scss"
import langData from "./data/colors"

async function fetchImg(word) {
  let url = `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_KEY}&q=${word}&image_type=photo&pretty=true`
  const response = await fetch(url)
  return await response.json()
}

const randomize = () => {}

class App extends React.PureComponent {
  state = {
    recallRate: 100,
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

  handleRecall100 = () => {
    this.nextWord()
  }

  handleRecall50 = () => {
    let review = this.state.langData[this.state.counter]
    console.log("review: ", review)
    let langData = this.state.langData.concat(review)
    this.setState(
      {
        langData
      },
      () => console.log(this.state)
    )
    this.nextWord()
  }

  reveal = () => {
    this.setState({
      imgURL: null,
      picFlipped: true
    })
  }

  /* 
  @params

  */
  nextWord = () => {
    this.setState(
      {
        picFlipped: false
      },
      () => {
        if (this.state.counter !== this.state.langData.length - 1) {
          let word = this.state.langData[this.state.counter + 1].word
          fetchImg(word).then(data => {
            let counter = this.state.counter + 1
            this.setState({
              counter,
              word,
              imgURL: data.hits[0] ? data.hits[0].largeImageURL : null,
              translation: this.state.langData[counter].translation
            }, ()=>console.log(this.state.counter);
            )
          })
        } else {
          let word = this.state.langData[0].word
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
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Recall {this.state.recallRate}%</h2>
          {this.state.imgURL && !this.state.picFlipped ? (
            <img
              onClick={() => {
                this.reveal()
              }}
              src={this.state.imgURL}
              alt="word"
            />
          ) : !this.state.imgURL && !this.state.picFlipped ? (
            <div
              className="reveal"
              onClick={() => {
                this.reveal()
              }}
            >
              No picture
            </div>
          ) : (
            <div>
              <h1>{this.state.translation}</h1>
              <div>
                <button className="recallBtn" onClick={this.handleRecall100}>
                  100% recall
                </button>
                <button
                  className="recallBtn btn-50"
                  onClick={this.handleRecall50}
                >
                  50% recall
                </button>
                <button
                  className="recallBtn blank"
                  onClick={this.handleRecall50}
                >
                  blank
                </button>
              </div>
            </div>
          )}
          <p>{this.state.word}</p>
          {/* <button className="recallBtn next-btn" onClick={this.nextWord}>
            next
          </button> */}
        </header>
      </div>
    )
  }
}

export default App
