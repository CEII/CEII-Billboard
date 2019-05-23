import React, {Component} from 'react';
import './ImageShow.css';
import API from '../../config/apiConf';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

export default class ImageShow extends Component{

    constructor(props){
        super(props);
        this.state={
            images:[],
            albumId:process.env.REACT_APP_ALBUM_ID
        };
        this.fetchImages=this.fetchImages.bind(this);
    }

    componentDidMount() {
        this.fetchImages();
        window.setInterval(this.fetchImages, 3600000)
    }

    shouldComponentUpdate(nextProps, nextState):Boolean{
        if(nextState.images.length!==this.state.images.length){
            return true;
        }
        let shouldUpdate=this.state.images.length;
        nextState.images.forEach((newElement)=>{
           this.state.images.forEach((element)=>{
              if(newElement['original']===element['original']){
                  shouldUpdate--;
              }
           });
        });
        return shouldUpdate!==0;
    }

    componentWillUnmount(){
        window.clearInterval(this.fetchImages)
    }

    fetchImages(){
        API.get(`${this.state.albumId}`)
            .then((response) => {
                if (response.data.length > 0){
                    this.setState({
                        images: response.data.map((url) => ({
                            original: `${url}=w1024`,
                            thumbnail: `${url}=w100`,
                            originalClass:"OriginalImage"
                        }))
                    })
                }
            })
            .catch((error) => {
                console.error(error)
            });
    }

    render() {
        const { images } = this.state;
        return images.length>0
            ?
            <ImageGallery
                items={images}
                autoPlay={true}
                showPlayButton={false}
                showBullets={false}
                showNav={false}
                slideInterval={5000}
                slideDuration={1000}
                showThumbnails={false}
            />
            : null
    }
}