import React, { Component } from 'react';

class VideoDetails extends Component {
    render() { 
        const { videoId } = this.props;
        return (            
            <div class="col-md-8">
                <div className='embed-responsive embed-responsive-16by9'>
                    <iframe width="100%" height="500" className='embed-responsive-item' src={`https://www.youtube.com/embed/${videoId}`}></iframe>
                </div>

                <div className='details' style={ {marginTop : '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px'}}>
                    <h4>Dokhina Hawa</h4>
                    <p>Songs by Abantika and Tahsan</p>
                </div>
            </div>        
        );
    }
}

export default VideoDetails;