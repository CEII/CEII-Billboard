import React, {Component} from 'react';

export default class ImageShow extends Component{

    constructor(props){
        super(props)
        this.state={
            images:[],
            index:0,
        }
        this.changeHandler=this.changeHandler.bind(this)
    }

    componentDidMount() {
        window.setInterval(this.changeHandler, 1000)
    }

    componentWillUnmount() {
        window.clearInterval()
    }

    changeHandler(){
        let newIndex=this.state.index
        newIndex++;
        this.setState(
            {
                ...this.state,
                index:newIndex
            }
        )
    }

    render() {
        return <div>

        </div>
    }

}