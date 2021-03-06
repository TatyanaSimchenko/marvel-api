// import { Component } from "react";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import MarvelService from "../../servises/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
// import abyss from '../../resourses/img/abyss.jpg';

import "./charList.scss";

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newItemLoading, setNewItemeLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    onReqest();
  }, []);

  const onReqest = (offset) => {
    onCharListLoading();
    marvelService
      .getAllCharacters(offset)
      .then(onCharListLoaded)
      .catch(onError);
  };

  const onCharListLoading = () => {
    setNewItemeLoading(true);
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    setCharList((charList) => [...charList, ...newCharList]);
    setLoading((loading) => false);
    setNewItemeLoading((newItemLoading) => false);
    setOffset((offset) => offset + 9);
    setCharEnded((charEnded) => ended);
  };

  const onError = () => {
    setError(true);
    setLoading((loading) => false);
  };

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = { objectFit: "cover" };
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }
      return (
        <li
          className="char__item"
          tabIndex={0}
          ref={el => itemRefs.current[i] = el}
          key={item.id}
          onClick={() => {
            props.onCharSelected(item.id);
            focusOnItem(i);
          }}
          onKeyPress={(e) => {
            if (e.key === " " || e.key === "Enter") {
              props.onCharSelected(item.id);
              focusOnItem(i);
            }
          }}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{items}</ul>;
  }

    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{'display' : charEnded ? 'none' : 'block'}}
        onClick={() =>  onReqest(offset)}>
          <div className="inner">load more</div>
        </button>
      </div>
    );
  





};

// class CharList extends Component {
//   state = {
//     charList: [],
//     loading: true,
//     error: false,
//     newItemLoading: false,
//     offset: 1560,
//     charEnded: false
//   };

//   marvelService = new MarvelService();

//   componentDidMount() {
//     this.onReqest();
//   }

//   onReqest = ( offset) => {
//     this.onCharListLoading();
//     this.marvelService.getAllCharacters(offset)
//     .then(this.onCharListLoaded)
//     .catch(this.onError)
//   }

//   onCharListLoading = () => {
//     this.setState({
//       newItemLoading: true
//     })
//   }

//   onCharListLoaded = (newCharList) => {

//     let ended = false;
//     if (newCharList.length < 9) {
//       ended = true;
//     }

//     this.setState(({offset, charList}) => ({
//       charList: [...charList, ...newCharList],
//       loading: false,
//       newItemLoading:false,
//       offset: offset + 9,
//       charEnded: ended
//     }))
//   };

//   onError = () => {
//     this.setState({
//       error: true,
//       loading: false,
//     });
//   };

//   itemRefs = [];

//   setRef = (ref) => {
//     this.itemRefs.push(ref);
//   }

//   focusOnItem = (id) => {
//     this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
//     this.itemRefs[id].classList.add('char__item_selected');
//     this.itemRefs[id].focus();
//   }

//   //??????????????????????, ?????????? ???? ???????????????? ?????????? ?????????????????????? ?? render
//   renderItems(arr) {
//     const items = arr.map((item, i) => {
//       let imgStyle = { objectFit: "cover" };
//       if (
//         item.thumbnail ===
//         "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
//       ) {
//         imgStyle = { objectFit: "unset" };
//       }
//       return (
//         <li className="char__item"
//         tabIndex={0}
//         ref={this.setRef}
//         key={item.id}
//         onClick={() => {this.props.onCharSelected(item.id);
//         this.focusOnItem(i)}}
//         onKeyPress={(e) => {
//           if (e.key === ' ' || e.key === "Enter") {
//             this.props.onCharSelected(item.id);
//             this.focusOnItem(i);
//           }
//         }}>
//           <img src={item.thumbnail} alt={item.name} style={imgStyle} />
//           <div className="char__name">{item.name}</div>
//         </li>
//       );
//     });

//     // ?????????????????? ????????????????

//     return <ul className="char__grid">{items}</ul>;
//   }

//   render() {
//     const { charList, loading, error, offset, newItemLoading, charEnded } = this.state;

//     const items = this.renderItems(charList);

//     const errorMessage = error ? <ErrorMessage /> : null;
//     const spinner = loading ? <Spinner /> : null;
//     const content = !(loading || error) ? items : null;

//     return (
//       <div className="char__list">
//         {errorMessage}
//         {spinner}
//         {content}
//         <button
//         className="button button__main button__long"
//         disabled={newItemLoading}
//         style={{'display' : charEnded ? 'none' : 'block'}}
//         onClick={() => this.onReqest(offset)}>
//           <div className="inner">load more</div>
//         </button>
//       </div>
//     );
//   }
// }

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired
}

export default CharList;
