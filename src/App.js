import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import Blogs from './components/Blogs'
import Footer from './components/Footer'
import { useContext, useEffect } from 'react';
import { AppContext } from './context/AppContext';

import HomePage from './Pages/HomePage'
import TagPage from './Pages/TagPage'
import CategoryPage from './Pages/CategoryPage'
import BlogPage from './Pages/BlogPage'
import {  useLocation, useSearchParams } from 'react-router-dom';
import {Routes,Route} from 'react-router-dom'

function App() {
  // const {fetchPosts}= useContext(AppContext);
  // useEffect(()=>{
  //   fetchPosts();
  // },[])
  const {fetchPosts}= useContext(AppContext);
  const location = useLocation();
  const[searchParams, setsearchParams]= useSearchParams();

  useEffect( ()=>{

    // 
    const page = searchParams.get("page")?? 1;
    if( location.pathname.includes("tags")){
      const tag= location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchPosts( Number(page),tag);
    }

    else if( location.pathname.includes("categories")){
      const category= location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchPosts( Number(page),null,category);
    }

    else{
      fetchPosts(Number(page));
    }
  },[location.pathname, location.search])
  

// we are not fetching BlogPage data directly here bcs specific blog api don't return posts array just like other apis
// instead it returns one current blog and one array of related blogs so there display need to be handled separately

  return (
    <div className="App">
      {/* <Header/>
      <Blogs/>
      <Footer/> */}

      <Routes>
        <Route path='/' element={<HomePage/>} ></Route>
        <Route path='/blog/:blogId' element={<BlogPage/>} ></Route>
        <Route path='/tags/:tag' element={<TagPage/>} ></Route>
        <Route path='/categories/:category' element={<CategoryPage/>} ></Route>
      </Routes>

    </div>
  );
}

export default App;
