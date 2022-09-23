import React, { useState } from "react";
import Router from "next/router";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// import { Form } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../pages/styles.module.scss";

class DisplayPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: null,
      movies: null,
      isLoading: true,
      type: false,
    };
  }

  componentDidMount() {
    this.postUploading();
  }

  postUploading = async () => {
    console.log("loading");
    const books = [];
    const movies = [];
    // const randommovies = [];
    // const randombooks = [];
    const { host, types } = this.props;

    const { countBooks, countMovies } = this.props;

    await Promise.all(
      ["book", "movie"].map(async (name) => {
        const docs = await this.getPosts(name);
        docs.forEach((doc) => {
          const data = doc.data();
          console.log("data:", data);
          data.docID = doc.id;
          if (name === "book") books.push(data);
          else if (name === "movie") movies.push(data);
        });
      })
    );
    // console.log("random전");

    // if (types === "random") {
    //   console.log("왜 random?");
    //   if (movies.length > 32) {
    //     const step = this.randomItem(movies.length);
    //     console.log(step);
    //     for (let i = 0; i < 32; i++) randommovies.push(movies[step[i]]);
    //   } else randommovies.concat(movies);
    //   if (books.length > 32) {
    //     const step = this.randomItem(books.length);
    //     for (let m = 0; m < 32; m++) randombooks.push(books[step[m]]);
    //   } else randombooks.concat(books);
    //   this.setState({
    //     movies: randommovies,
    //     books: randombooks,
    //     isLoading: false,
    //   });
    // } else {
    this.changeLoading(movies, books);
    // }

    if (host) {
      countMovies(movies.length);
      countBooks(books.length);
    }
  };

  getPosts = (name) => {
    const { host, color } = this.props;
    return host
      ? new Promise((resolve) => {
          const data = firebase
            .firestore()
            .collection(name)
            .where("userID", "==", host)
            .orderBy("colorhue")
            .get();
          resolve(data);
        })
      : new Promise((resolve) => {
          const data = firebase
            .firestore()
            .collection(name)
            .orderBy("colorhue")
            .get();
          resolve(data);
        });
  };

  changeLoading = (movies, books) => {
    if (books !== [] && movies !== []) {
      this.setState({
        movies,
        books,
        isLoading: false,
      });
    }
  };

  displayPosts = (props) => {
    const { type, movies, books } = props;
    const { color } = this.props;
    let dpMovies = movies;
    let dpBooks = books;

    if (color) {
      const dpColor = color;
      dpMovies = movies.filter((movie) => movie.color === dpColor);
      dpBooks = books.filter((book) => book.color === dpColor);
      console.log(color);
    }
    if (movies || books) {
      return type
        ? dpBooks.map((book, index) => (
            <button
              key={index}
              onClick={() => Router.push(`/post/book_${book.docID}`)}
            >
              <div className="small-4 columns">
                <div
                  className={styles.cardcontainer}
                  onTouchStart="this.classList.toggle('hover');"
                >
                  <div className={styles.card}>
                    <div className={styles.front}>
                      <img
                        // 이거 테두리 색 씌우는건데 안한게 나은것 같아서 일단은 주석!
                        // style={{
                        //   border: "solid 0.7rem",
                        //   borderColor: book.imgcolor,
                        // }}
                        key={index}
                        width="200px"
                        height="150px"
                        src={book.imgurl}
                        alt={book.title}
                      />
                    </div>
                    <div className={styles.back}>
                      <div className={styles.detail_card}>
                        <img
                          key={index}
                          width="85px"
                          height="120px"
                          src={book.titleimg}
                          alt=""
                          className={styles.detail_image}
                        />
                        <div className={styles.aboutinfo}>
                          <div className={styles.detail_title}>
                            {book.title}
                          </div>
                          <div className={styles.infobox}>
                            <div
                              className={styles.colorbox}
                              style={{ backgroundColor: book.color }}
                            />
                            <div className={styles.username}>
                              by {book.displayName}
                            </div>
                          </div>
                          <div className={styles.famoustext}>
                            " {book.line} "
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))
        : dpMovies.map((movie, index) => (
            <button
              key={index}
              onClick={() => Router.push(`/post/movie_${movie.docID}`)}
            >
              <div className="small-4 columns">
                <div
                  className={styles.cardcontainer}
                  onTouchStart="this.classList.toggle('hover');"
                >
                  <div className={styles.card}>
                    <div className={styles.front}>
                      <img
                        // 이거 테두리 색 씌우는건데 안한게 나은것 같아서 일단은 주석!
                        // style={{
                        //   border: "solid 0.7rem",
                        //   borderColor: movie.imgcolor,
                        // }}
                        key={index}
                        width="200px"
                        height="150px"
                        src={movie.imgurl}
                        alt={movie.title}
                      />
                    </div>
                    <div className={styles.back}>
                      <div className={styles.detail_card}>
                        <img
                          key={index}
                          width="85px"
                          height="120px"
                          src={movie.titleimg}
                          alt=""
                          className={styles.detail_image}
                        />
                        <div className={styles.aboutinfo}>
                          <div className={styles.detail_title}>
                            {movie.title}
                          </div>
                          <div className={styles.infobox}>
                            <div
                              className={styles.colorbox}
                              style={{ backgroundColor: movie.color }}
                            />
                            <div className={styles.username}>
                              by {movie.displayName}
                            </div>
                          </div>
                          <div className={styles.famoustext}>
                            " {movie.line} "
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ));
    }
    return "Error";
  };

  checkChange = (type) => this.setState({ type });

  loadingSkeleton = () => {
    return [...Array(32).keys()].map((v, i) => {
      return (
        <div className={styles["skeleton-wrapper"]} key={String(i)}>
          <SkeletonTheme color="#f2f2f2" highlightColor="#ddd">
            <Skeleton
              variant="rect"
              height={150}
              width={200}
              animation="wave"
            />
          </SkeletonTheme>
        </div>
      );
    });
  };

  randomItem = (anum) => {
    const randomIndexArray = [];
    for (let i = 0; i < 32; i++) {
      // check if there is any duplicate index
      const randomNum = Math.floor(Math.random() * anum);
      if (randomIndexArray.indexOf(randomNum) === -1) {
        randomIndexArray.push(randomNum);
      } else {
        // if the randomNum is already in the array retry
        i--;
      }
    }

    return randomIndexArray.sort((a, b) => {
      return a - b;
    });
  };
  // return a[Math.floor(Math.random() * a.length)];

  render() {
    console.log("rendering");
    const { isLoading, type, movies, books } = this.state;

    return (
      <div>
        <div className={styles["main-container"]}>
          <label htmlFor="switch-id" className={styles.switch}>
            <input
              type="checkbox"
              onChange={() => this.checkChange(!type)}
              id="switch-id"
            />
            <span />
          </label>
        </div>

        <div className={styles.container_row}>
          {isLoading
            ? this.loadingSkeleton()
            : this.displayPosts({ type, movies, books })}
        </div>
      </div>
    );
  }
}

export default DisplayPosts;
