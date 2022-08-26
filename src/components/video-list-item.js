import React, { Component } from 'react';
import('../css/index.css');

class VideoListItem extends Component {    
    render() { 
        const { handleselect, src, title,height, width } = this.props;
        return (            
            <li onClick={handleselect} class="list-group-item videolist">
                <img className='mr-3' src={src} height={height} width={width}></img>
                <div className='media-body'>
                    {title}
                </div>
            </li>            
        );
    }
}
 
export default VideoListItem;