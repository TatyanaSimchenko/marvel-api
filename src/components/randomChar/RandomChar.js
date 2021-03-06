// import { Component } from "react";
import { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../servises/MarvelService";
import "./randomChar.scss";
// import thor from '../../resourses/img/thor.jpeg';
import mjolnir from "../../resourses/img/mjolnir.png";

const RandomChar = () => {

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 60000);

        return () => {
            clearInterval(timerId)
        }
    }, [])

    const onCharLoaded = (char) => {
        setLoading(false);
        setChar(char);
    }

    const onCharLoading = () => {
        setLoading(true);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000)) + 1011000;
        onCharLoading();
        marvelService
            .getCharacter(id)
            .then(onCharLoaded)
            .catch(onError);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

// class RandomChar extends Component {
  
//   state = {
//     char: {},
//     loading: true,
//     error: false,
//   };

//   marvelService = new MarvelService();

//   componentDidMount() {
//     this.updateChar();
//     //  this.timerId = setInterval(this.updateChar, 3000)
//   }

//   componentWillUnmount() {
//     clearInterval(this.timerId);
//   }

//   onCharLoaded = (char) => {
//     this.setState({ char, loading: false });
//   };

//   onCharLoading = () => {
//     this.setState({
//       loading: true,
//     });
//   };

//   onError = () => {
//     this.setState({
//       loading: false,
//       error: true,
//     });
//   };

//   updateChar = () => {
//     const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
//     this.onCharLoading();
//     this.marvelService
//       .getCharacter(id)
//       .then(this.onCharLoaded)
//       .catch(this.onError);
//   };

//   // marvelService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name)));

//   render() {
//     const { char, loading, error } = this.state;
//     const errorMessage = error ? <ErrorMessage /> : null;
//     const spinner = loading ? <Spinner /> : null;
//     const content = !(loading || error) ? <View char={char} /> : null;
//     return (
//       <div className="randomchar">
//         {/* { loading ? <Spinner /> : <View char={char} />} */}

//         {errorMessage}
//         {spinner}
//         {content}

//         <div className="randomchar__static">
//           <p className="randomchar__title">
//             Random character for today!
//             <br />
//             Do you want to get to know him better?
//           </p>
//           <p className="randomchar__title">Or choose another one</p>
//           <button onClick={this.updateChar} className="button button__main">
//             <div className="inner">try it</div>
//           </button>
//           <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
//         </div>
//       </div>
//     );
//   }
// }

const View = ({ char }) => {
  const { name, thumbnail, description, homepage, wiki } = char;
  let imgStyle = { objectFit: "cover" };
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = { objectFit: "contain" };
  }

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={imgStyle}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
