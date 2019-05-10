import React, {Component} from 'react';
import API from './../apiConf';
import 'react-image-gallery/styles/css/image-gallery.css'
import ImageGallery from 'react-image-gallery'

export default class ImageShow extends Component{

    constructor(props){
        super(props)
        this.state={
            images:null,
            albumId:'R3zwmDbDibsxHcno6'
        }
    }

    componentDidMount() {
        API.get(`${this.state.albumId}`)
            .then((response) => {
                if (response.data.length > 0){
                    this.setState({
                        images: response.data.map((url) => ({
                            original: `${url}=w1024`,
                            thumbnail: `${url}=w100`
                        }))
                    })
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }

    render() {
        const { images } = this.state;
        return images ? <ImageGallery items={images}/> : null
    }

}
