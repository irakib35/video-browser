import React, { Component } from 'react'
import SearchBar from './components/searchbar';
import VideoDetails from './components/video-details';
import VideoList from './components/video-list';
import VideoListItem from './components/video-list-item';

import axios from 'axios';

class App extends Component {    
    state = {
        searchTerm : '',
        data: {},
        videoId : '', 
        title : '',
        description:''
    }

    /* //auto call, ekhon dorkar nai
    constructor(){
        super();
        console.log("Ami hoilam Constructor");
    }*/

    handleChange = (event) => {
        if (event.key === 'Enter') {
            const value = event.target.value;
            const newstate = { searchTerm : value, data: this.state.data, videoId: this.state.videoId, title: this.state.title, description: this.state.description };
            this.setState(newstate);
        }
    }

    componentDidMount(){
        console.log("Ami hoilam componenet did mount");
        console.log(this.state.videoId);
        
    }

    componentDidUpdate(prevProps, prevState){
        console.log("Ami hoilam did update");

        const getYoutubeVideos = () => {
            const url = 'https://www.googleapis.com/youtube/v3/search';
            const key = 'AIzaSyCVH3nm_LQATKmLySYsV12CdwdC1sFj1PQ';
            const type = 'video'
            const part = 'snippet';
            const q = this.state.searchTerm;

            const target = `${url}?key=${key}&type=${type}&part=${part}&q=${q}`;

            const promise = axios.get(target)

            const success = (response) => {
                console.log(response);
                const newState = { searchTerm: this.state.searchTerm, data: response.data, videoId: this.state.videoId, title: this.state.title, description: this.state.description };
                this.setState(newState);
            }

            const error = (error) => {
                console.log(error);
            }

            promise
            .then(success)
            .catch(error);
        }

        if(prevState.searchTerm !== this.state.searchTerm) {
            getYoutubeVideos();             
        }
    }

     handleSelect = (videoId, title, description) => {        
        const newstate = {searchTerm : this.state.searchTerm, data: this.state.data, videoId: videoId, title: title, description: description}
        this.setState(newstate);
    }
    

    render() { 
        const items = this.state.data.items || [];        
        return (
            <div class="container">  
                <div class="row" style={{marginTop: "10px" }}>
                <input onKeyDown={this.handleChange} style={{ width: '75%', Border: "1px solid #eee" }} />
                </div>                
                <div class="row" style={{marginTop: "10px" }}>
                    <div class="col-md-8">
                    <div className='embed-responsive embed-responsive-16by9'>
                        <iframe width="100%" height="500" className='embed-responsive-item' src={`https://www.youtube.com/embed/${this.state.videoId}`}></iframe>
                    </div>

                    <div className='details' style={ {marginTop : '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px'}}>
                        <h4>{this.state.title}</h4>
                        <p>{this.state.description}</p>
                    </div>
                </div>    
                    <div class="col-md-4">
                        <ul class="list-group">
                            {
                                items.map(item => {
                                    const img = item.snippet.thumbnails.default.url;
                                    const height = item.snippet.thumbnails.default.height;
                                    const width = item.snippet.thumbnails.default.width;
                                    const title = item.snippet.title;
                                    const descrip = item.snippet.description;
                                    const videosId = item.id.videoId;

                                    return (
                                        <li onClick={ (event) =>{
                                            console.log(videosId, title, descrip);
                                            this.handleSelect(videosId, title, descrip);
                                        }} 
                                        className="list-group-item videolist">
                                            <img className='mr-3' src={img} height={height} width={width}></img>
                                            <div className='media-body'>
                                                {title}
                                            </div>
                                        </li>  
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default App;
