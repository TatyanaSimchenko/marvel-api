// import { Component } from "react";
import { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import MarvelService from "../../servises/MarvelService";

import "./charInfo.scss";
// import thor from "../../resourses/img/thor.jpeg";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    updateChar();
  }, [props.charId]);

  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }
    onCharLoading();
    marvelService.getCharacter(charId).then(onCharLoaded).catch(onError);
  };

  const onCharLoaded = (char) => {
    setLoading(false);
    setChar(char);
  };

  const onCharLoading = () => {
    setLoading(true);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const skeleton = char || loading || error ? null : <Skeleton />;

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

// class CharInfo extends Component {
//   state = {
//     char: null,
//     loading: false,
//     error: false,
//   };

//   marvelService = new MarvelService();

//   componentDidMount() {
//     this.updateChar();
//   }

//   componentDidUpdate(prevProps) {
//     if (this.props.charId !== prevProps.charId) {
//       this.updateChar();
//     }
//   }

//   componentDidCatch(err, info) {
//     console.log(err, info);
//     this.setState({ error: true });
//   }

//   updateChar = () => {
//     const { charId } = this.props;
//     if (!charId) {
//       return;
//     }

//     this.onCharLoading();
//     this.marvelService
//       .getCharacter(charId)
//       .then(this.onCharLoaded)
//       .catch(this.onError);
//   };

//   onCharLoaded = (char) => {
//     this.setState({
//       char,
//       loading: false,
//     });
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

//   render() {
//     const { char, loading, error } = this.state;

//     const skeleton = char || loading || error ? null : <Skeleton />;

//     const errorMessage = error ? <ErrorMessage /> : null;
//     const spinner = loading ? <Spinner /> : null;
//     const content = !(loading || error || !char) ? <View char={char} /> : null;

//     return (
//       <div className="char__info">
//         {skeleton}
//         {errorMessage}
//         {spinner}
//         {content}
//       </div>
//     );
//   }
// }

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  let imgStyle = { objectFit: "cover" };
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = { objectFit: "contain" };
  }
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <button href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </button>
            <button href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </button>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : "There is no comacs with this character"}
        {comics.map((item, i) => {
          // eslint-disable-next-line
          if (i > 9) return;
          return (
            <li key={i} className="char__comics-item">
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
